import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "version" in data

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["model_loaded"] is True

def test_predict_healthy_sample():
    # Patient profile that evaluates to Healthy (prediction = 0)
    payload = {
        "age": 60,
        "sex": "Male",
        "chest_pain_type": "Typical angina",
        "resting_blood_pressure": 130,
        "cholestoral": 250,
        "fasting_blood_sugar": "Lower than 120 mg/ml",
        "rest_ecg": "Normal",
        "Max_heart_rate": 135,
        "exercise_induced_angina": "Yes",
        "oldpeak": 2.5,
        "slope": "Flat",
        "vessels_colored_by_flourosopy": "Two",
        "thalassemia": "Reversable Defect"
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["prediction"] == 0
    assert data["status"] == "Healthy"
    assert data["probability"] < 0.5
    assert "contributing_factors" in data

def test_predict_high_risk_sample():
    # Patient profile that evaluates to Heart Disease Risk (prediction = 1)
    payload = {
        "age": 58,
        "sex": "Female",
        "chest_pain_type": "Asymptomatic",
        "resting_blood_pressure": 140,
        "cholestoral": 240,
        "fasting_blood_sugar": "Lower than 120 mg/ml",
        "rest_ecg": "Normal",
        "Max_heart_rate": 165,
        "exercise_induced_angina": "No",
        "oldpeak": 0.5,
        "slope": "Upsloping",
        "vessels_colored_by_flourosopy": "Zero",
        "thalassemia": "Fixed Defect"
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["prediction"] == 1
    assert data["status"] == "Heart Disease Risk"
    assert data["probability"] >= 0.5
    assert "contributing_factors" in data

def test_presets():
    response = client.get("/presets")
    assert response.status_code == 200
    data = response.json()
    assert "healthy_profile" in data
    assert "high_risk_profile" in data
