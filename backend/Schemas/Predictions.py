from pydantic import BaseModel
from datetime import datetime

class PredictionBase(BaseModel):
    user_text: str
    result: str

class PredictionOut(PredictionBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class PredictionIn(BaseModel):
    user_text: str




