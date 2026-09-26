import os
from pathlib import Path
from typing import Dict, Any, List, Tuple
import joblib
import pandas as pd
import numpy as np

# Locate model file
CURRENT_DIR = Path(__file__).resolve().parent
ROOT_DIR = CURRENT_DIR.parent
MODEL_PATHS = [
    ROOT_DIR / "heart_disease_model.pkl",
    CURRENT_DIR / "heart_disease_model.pkl"
]

_model = None

def get_model():
    """Load model singleton lazily."""
    global _model
    if _model is not None:
        return _model

    for p in MODEL_PATHS:
        if p.exists():
            _model = joblib.load(p)
            return _model

    raise FileNotFoundError(
        f"heart_disease_model.pkl not found in {[str(p) for p in MODEL_PATHS]}"
    )

def normalize_input(data: Dict[str, Any]) -> pd.DataFrame:
    """
    Validate, normalize, and construct the single-row DataFrame
    with exact 13 features expected by the ColumnTransformer:
    - Numerical: age, resting_blood_pressure, cholestoral, Max_heart_rate, oldpeak
    - Categorical: sex, chest_pain_type, fasting_blood_sugar, rest_ecg,
                   exercise_induced_angina, slope, vessels_colored_by_flourosopy, thalassemia
    """
    # 1. Age
    age = float(data.get("age", 50))

    # 2. Sex -> ['Female', 'Male']
    sex_raw = str(data.get("sex", "")).strip().lower()
    if sex_raw in ["1", "male", "m", "true"]:
        sex = "Male"
    elif sex_raw in ["0", "female", "f", "false"]:
        sex = "Female"
    else:
        sex = "Male" if "mal" in sex_raw and "fe" not in sex_raw else "Female"

    # 3. Chest Pain Type -> ['Asymptomatic', 'Atypical angina', 'Non-anginal pain', 'Typical angina']
    cp_raw = str(data.get("chest_pain_type", "")).strip().lower()
    if "asymptomatic" in cp_raw or cp_raw == "3":
        cp = "Asymptomatic"
    elif "atypical" in cp_raw or cp_raw == "1":
        cp = "Atypical angina"
    elif "non-anginal" in cp_raw or "non anginal" in cp_raw or cp_raw == "2":
        cp = "Non-anginal pain"
    elif "typical" in cp_raw or cp_raw == "0":
        cp = "Typical angina"
    else:
        cp = "Typical angina"

    # 4. Resting Blood Pressure
    trestbps = float(data.get("resting_blood_pressure", 120))

    # 5. Cholestoral
    chol = float(data.get("cholestoral", 200))

    # 6. Fasting Blood Sugar -> ['Greater than 120 mg/ml', 'Lower than 120 mg/ml']
    fbs_raw = str(data.get("fasting_blood_sugar", "")).strip().lower()
    if (
        "greater" in fbs_raw
        or ">" in fbs_raw
        or fbs_raw in ["1", "true", "yes"]
    ):
        fbs = "Greater than 120 mg/ml"
    else:
        fbs = "Lower than 120 mg/ml"

    # 7. Rest ECG -> ['Left ventricular hypertrophy', 'Normal', 'ST-T wave abnormality']
    ecg_raw = str(data.get("rest_ecg", "")).strip().lower()
    if "hypertrophy" in ecg_raw or "lvh" in ecg_raw or ecg_raw == "2":
        ecg = "Left ventricular hypertrophy"
    elif "st-t" in ecg_raw or "abnormality" in ecg_raw or ecg_raw == "1":
        ecg = "ST-T wave abnormality"
    else:
        ecg = "Normal"

    # 8. Max_heart_rate
    thalach = float(data.get("Max_heart_rate", 150))

    # 9. Exercise Induced Angina -> ['No', 'Yes']
    exang_raw = str(data.get("exercise_induced_angina", "")).strip().lower()
    if exang_raw in ["1", "yes", "y", "true"]:
        exang = "Yes"
    else:
        exang = "No"

    # 10. Oldpeak
    oldpeak = float(data.get("oldpeak", 0.0))

    # 11. Slope -> ['Downsloping', 'Flat', 'Upsloping']
    slope_raw = str(data.get("slope", "")).strip().lower()
    if "down" in slope_raw or slope_raw == "2":
        slope = "Downsloping"
    elif "flat" in slope_raw or slope_raw == "1":
        slope = "Flat"
    elif "up" in slope_raw or slope_raw == "0":
        slope = "Upsloping"
    else:
        slope = "Flat"

    # 12. Vessels Colored by Flourosopy -> ['Four', 'One', 'Three', 'Two', 'Zero']
    ca_raw = str(data.get("vessels_colored_by_flourosopy", "")).strip().lower()
    ca_map = {
        "0": "Zero", "zero": "Zero",
        "1": "One", "one": "One",
        "2": "Two", "two": "Two",
        "3": "Three", "three": "Three",
        "4": "Four", "four": "Four"
    }
    ca = ca_map.get(ca_raw, "Zero")

    # 13. Thalassemia -> ['Fixed Defect', 'No', 'Normal', 'Reversable Defect']
    thal_raw = str(data.get("thalassemia", "")).strip().lower()
    if "fixed" in thal_raw or thal_raw == "2":
        thal = "Fixed Defect"
    elif "revers" in thal_raw or thal_raw == "3":
        thal = "Reversable Defect"
    elif "no" in thal_raw or thal_raw == "0":
        thal = "No"
    else:
        thal = "Normal"

    # Construct DataFrame with precise column names required by ColumnTransformer
    row = {
        "age": age,
        "sex": sex,
        "chest_pain_type": cp,
        "resting_blood_pressure": trestbps,
        "cholestoral": chol,
        "fasting_blood_sugar": fbs,
        "rest_ecg": ecg,
        "Max_heart_rate": thalach,
        "exercise_induced_angina": exang,
        "oldpeak": oldpeak,
        "slope": slope,
        "vessels_colored_by_flourosopy": ca,
        "thalassemia": thal
    }

    df = pd.DataFrame([row])
    return df

def generate_insights(df: pd.DataFrame, probability: float) -> Tuple[str, List[str]]:
    """Generate medical insights and clinical contributing factors based on patient data."""
    factors = []
    row = df.iloc[0]

    if row["thalassemia"] == "Reversable Defect":
        factors.append("Reversible myocardial perfusion defect identified during thalassemia evaluation.")
    if row["oldpeak"] >= 2.0:
        factors.append(f"Significant exercise-induced ST depression ({row['oldpeak']} mm).")
    elif row["oldpeak"] >= 1.0:
        factors.append(f"Moderate ST depression ({row['oldpeak']} mm) observed on stress testing.")
    if row["exercise_induced_angina"] == "Yes":
        factors.append("Presence of exercise-induced angina symptoms.")
    if row["vessels_colored_by_flourosopy"] in ["One", "Two", "Three", "Four"]:
        factors.append(f"Fluoroscopy indicates {row['vessels_colored_by_flourosopy'].lower()} major vessel(s) colored.")
    if row["cholestoral"] >= 240:
        factors.append(f"Elevated total serum cholesterol ({int(row['cholestoral'])} mg/dl).")
    if row["resting_blood_pressure"] >= 140:
        factors.append(f"Stage 2 hypertension / elevated resting BP ({int(row['resting_blood_pressure'])} mmHg).")
    if row["Max_heart_rate"] < 120 and row["age"] < 65:
        factors.append(f"Lower than expected maximum heart rate ({int(row['Max_heart_rate'])} bpm).")

    if not factors:
        if probability >= 0.5:
            factors.append("Aggregate cardiovascular marker profile indicates elevated statistical risk.")
        else:
            factors.append("Resting blood pressure and serum cholesterol within favorable ranges.")
            factors.append("Normal cardiac perfusion and baseline electrocardiogram metrics.")

    if probability >= 0.7:
        summary = "High clinical probability of coronary artery disease detected. Immediate comprehensive cardiology follow-up is recommended."
    elif probability >= 0.5:
        summary = "Elevated risk profile detected. Further non-invasive diagnostic testing and lifestyle modification recommended."
    elif probability >= 0.3:
        summary = "Borderline / moderate risk detected. Routine clinical monitoring and preventive heart health practices advised."
    else:
        summary = "Healthy cardiovascular profile. The machine learning pipeline indicates low likelihood of coronary heart disease."

    return summary, factors

def predict_heart_disease(data: Dict[str, Any]) -> Dict[str, Any]:
    """Execute prediction using pre-trained pipeline and return rich payload."""
    model = get_model()
    df = normalize_input(data)

    # Scikit-learn pipeline predict and predict_proba
    pred = int(model.predict(df)[0])
    probabilities = model.predict_proba(df)[0]
    
    # Class 1 is disease risk, Class 0 is healthy
    prob_disease = float(probabilities[1])
    prob_pct = round(prob_disease * 100, 1)

    if prob_disease >= 0.65:
        risk_level = "High"
    elif prob_disease >= 0.40:
        risk_level = "Moderate"
    else:
        risk_level = "Low"

    status = "Heart Disease Risk" if pred == 1 else "Healthy"
    summary, contributing_factors = generate_insights(df, prob_disease)

    return {
        "prediction": pred,
        "status": status,
        "probability": round(prob_disease, 4),
        "probability_percentage": prob_pct,
        "healthy_probability_percentage": round((1.0 - prob_disease) * 100, 1),
        "risk_level": risk_level,
        "summary": summary,
        "contributing_factors": contributing_factors,
        "normalized_features": df.to_dict(orient="records")[0]
    }
