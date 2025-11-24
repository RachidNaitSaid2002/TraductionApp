from DataBase.db import engine,SessionLocal,Base
from fastapi import FastAPI, HTTPException, status, Depends
from Models.Prediction import Prediction
from Models.User import User
from Schemas.Predictions import PredictionBase, PredictionIn
from Schemas.Users import UserCreate,UserOut,UserLogin
from passlib.context import CryptContext
from fastapi.security import HTTPBearer, HTTPBasicCredentials
from jose import jwt, JWTError
from dotenv import load_dotenv
import os
from Utils.EnFr import En_to_Fr
from Utils.FrEn import Fr_to_En

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
bearer_scheme = HTTPBearer()

Base.metadata.create_all(engine)
app = FastAPI()
db=SessionLocal()


origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000"   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],    
)

# Hashed Password ------------------------------------------------------------ :
pwd_context = CryptContext(schemes=["argon2"])

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# User auth ------------------------------------------------------------------ :
def get_uer(db, email : str):
    db_user = db.query(User).filter(User.email == email).first()
    if db_user:
        return db_user
    return None

# JWT ------------------------------------------------------------------------- :
def create_jwt(email : str):
    payload = {'sub': email}
    encoded_jwt = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_jwt(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email : str = payload.get("sub")
        if email is None:
            raise JWTError
        return email
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalide authentificate credentials"
        )
    
# SignUp --------------------------------------------------------------------- :
@app.post('/signup')
def Signup(user: UserCreate):
    db_user = get_uer(db, user.email)
    if db_user:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail='Email Already exist !!')
    pass_hached = get_password_hash(user.hashed_password)
    db_user = User(username=user.username, email=user.email, full_name=user.full_name, hashed_password=pass_hached)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {'message':'User Register Successfully'}


# Login ----------------------------------------------------------------------- :
@app.post('/login')
async def login(user: UserLogin):
    db_user = get_uer(db, user.email)
    if db_user:
        verify_pass = verify_password(user.hashed_password, db_user.hashed_password)
        if verify_pass:
            token = create_jwt(user.email)
            return { 'access_token':token, 'token_type': "bearer", "user_id": db_user.id }
        else:
            return  {'message':'Password incorrect !!'}
    return {'message':'Not Found You !!'}

# Prediction -------------------------------------------------------------------- :
@app.post('/Prediction/{mode_type}')
async def predict_text(mode_type:str, text: PredictionIn, MyToken: HTTPBasicCredentials = Depends(bearer_scheme)):
    email = verify_jwt(MyToken.credentials)
    db_user = get_uer(db, email)
    user_id = db_user.id

    text_p = text.user_text

    if mode_type:
        if mode_type == 'FnEn':
            pred = Fr_to_En(text_p)
        elif mode_type == 'EnFn':
            pred = En_to_Fr(text_p)
        db_pred = Prediction(user_text=text_p, result=pred, user_id=user_id)
        db.add(db_pred)
        db.commit()
        db.refresh(db_pred)
        return  {'message':'Prediction Added Successfully'}
    else:
        return {"message":"Pleas chose mode"}



# Get Prediction of an user ------------------------------------------------------ :
@app.get('/Prediction/{id}')
async def get_user_predictions(
    id: int,
    MyToken: HTTPBasicCredentials = Depends(bearer_scheme)
):
    email = verify_jwt(MyToken.credentials)
    db_user = get_uer(db, email)

    if db_user.id != id:
        return {'message':'You dont have access !!!'}

    user_predictions = (
        db.query(Prediction)
        .filter(Prediction.user_id == id)
        .order_by(Prediction.created_at.desc())
        .limit(5)
        .all()
    )

    if not user_predictions:
        return {"message": "No predictions found for this user."}

    return user_predictions






