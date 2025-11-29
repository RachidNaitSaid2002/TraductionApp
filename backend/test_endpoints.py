import pytest
from fastapi.testclient import TestClient
from main import app, get_uer, verify_password, create_jwt

client = TestClient(app)


def test_login():

    response = client.post('/login', json={
        "email":'testuser@gmail.com',
        "hashed_password":'tesruserhashedpassword123'
    })

    assert response.status_code == 200
    assert response.json() == {'message':'Username ou Password incorrect !!'}


def test_prediction():
    response = client.post("/Prediction/FnEn", json={"user_text": "Bonjour"})

    assert response.status_code == 403
