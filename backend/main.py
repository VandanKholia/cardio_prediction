"""
CardioPredict API - FastAPI Backend
Cardiovascular Disease Risk Prediction using Machine Learning
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pickle
import numpy as np
import os
from typing import List

# Initialize FastAPI app
app = FastAPI(
    title="CardioPredict API",
    description="AI-powered cardiovascular disease risk prediction API",
    version="1.0.0"
)

# CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the directory of this script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(SCRIPT_DIR, "cardio_model.pkl")
SCALER_PATH = os.path.join(SCRIPT_DIR, "cardio_scaler.pkl")
FEATURES_PATH = os.path.join(SCRIPT_DIR, "feature_names.pkl")

model = None
scaler = None
feature_names = None

def load_artifacts():
    """Load model, scaler and feature names"""
    global model, scaler, feature_names
    
    try:
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        print("✅ Model loaded successfully!")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        model = None
    
    try:
        with open(SCALER_PATH, "rb") as f:
            scaler = pickle.load(f)
        print("✅ Scaler loaded successfully!")
    except Exception as e:
        print(f"⚠️ Scaler not found, predictions may be less accurate: {e}")
        scaler = None
    
    try:
        with open(FEATURES_PATH, "rb") as f:
            feature_names = pickle.load(f)
        print(f"✅ Feature names loaded: {feature_names}")
    except Exception as e:
        print(f"⚠️ Feature names not found: {e}")
        feature_names = None

# Load artifacts on startup
load_artifacts()


# Request/Response Models
class HealthData(BaseModel):
    """Input data for cardiovascular disease prediction"""
    age: int = Field(..., ge=18, le=100, description="Age in years")
    gender: int = Field(..., ge=1, le=2, description="Gender: 1=Female, 2=Male")
    height: int = Field(..., ge=100, le=250, description="Height in cm")
    weight: float = Field(..., ge=30, le=300, description="Weight in kg")
    ap_hi: int = Field(..., ge=50, le=250, description="Systolic blood pressure (mmHg)")
    ap_lo: int = Field(..., ge=30, le=200, description="Diastolic blood pressure (mmHg)")
    cholesterol: int = Field(..., ge=1, le=3, description="Cholesterol: 1=Normal, 2=Above Normal, 3=Well Above Normal")
    gluc: int = Field(..., ge=1, le=3, description="Glucose: 1=Normal, 2=Above Normal, 3=Well Above Normal")
    smoke: int = Field(..., ge=0, le=1, description="Smoking: 0=No, 1=Yes")
    alco: int = Field(..., ge=0, le=1, description="Alcohol: 0=No, 1=Yes")
    active: int = Field(..., ge=0, le=1, description="Physical activity: 0=No, 1=Yes")

    class Config:
        json_schema_extra = {
            "example": {
                "age": 45,
                "gender": 2,
                "height": 170,
                "weight": 75,
                "ap_hi": 120,
                "ap_lo": 80,
                "cholesterol": 1,
                "gluc": 1,
                "smoke": 0,
                "alco": 0,
                "active": 1
            }
        }


class PredictionResponse(BaseModel):
    """Response from prediction endpoint"""
    success: bool
    risk_score: float
    risk_level: str  # low, moderate, high
    prediction: int  # 0 = No CVD, 1 = CVD
    risk_factors: List[str]
    recommendations: List[str]
    bmi: float
    message: str


class HealthStatus(BaseModel):
    """API health status"""
    status: str
    model_loaded: bool
    scaler_loaded: bool
    version: str


# Helper functions
def calculate_bmi(weight: float, height: int) -> float:
    """Calculate BMI from weight (kg) and height (cm)"""
    height_m = height / 100
    return round(weight / (height_m ** 2), 1)


def get_risk_factors(data: HealthData, bmi: float) -> List[str]:
    """Identify risk factors based on input data"""
    factors = []
    
    if data.age > 55:
        factors.append("Age above 55 years")
    elif data.age > 45:
        factors.append("Age above 45 years")
    
    if data.ap_hi > 140:
        factors.append("High systolic blood pressure (>140 mmHg)")
    elif data.ap_hi > 130:
        factors.append("Elevated systolic blood pressure (>130 mmHg)")
    
    if data.ap_lo > 90:
        factors.append("High diastolic blood pressure (>90 mmHg)")
    elif data.ap_lo > 85:
        factors.append("Elevated diastolic blood pressure (>85 mmHg)")
    
    if data.cholesterol == 3:
        factors.append("High cholesterol level")
    elif data.cholesterol == 2:
        factors.append("Above normal cholesterol level")
    
    if data.gluc == 3:
        factors.append("High glucose level")
    elif data.gluc == 2:
        factors.append("Above normal glucose level")
    
    if bmi > 30:
        factors.append(f"Obesity (BMI: {bmi})")
    elif bmi > 25:
        factors.append(f"Overweight (BMI: {bmi})")
    
    if data.smoke == 1:
        factors.append("Smoking")
    
    if data.alco == 1:
        factors.append("Regular alcohol consumption")
    
    if data.active == 0:
        factors.append("Physical inactivity")
    
    return factors


def get_recommendations(risk_factors: List[str], risk_level: str) -> List[str]:
    """Generate personalized recommendations based on risk factors"""
    recommendations = []
    
    # General recommendations
    recommendations.append("Schedule regular health check-ups with your doctor")
    recommendations.append("Monitor your blood pressure regularly")
    
    # Factor-specific recommendations
    for factor in risk_factors:
        if "blood pressure" in factor.lower():
            recommendations.append("Reduce sodium intake and follow a heart-healthy diet (DASH diet)")
        if "cholesterol" in factor.lower():
            recommendations.append("Limit saturated fats and increase fiber intake")
        if "glucose" in factor.lower():
            recommendations.append("Monitor blood sugar levels and limit sugar intake")
        if "bmi" in factor.lower() or "obesity" in factor.lower() or "overweight" in factor.lower():
            recommendations.append("Work towards a healthy weight through diet and exercise")
        if "smoking" in factor.lower():
            recommendations.append("Consider smoking cessation programs")
        if "alcohol" in factor.lower():
            recommendations.append("Limit alcohol consumption")
        if "inactivity" in factor.lower():
            recommendations.append("Aim for at least 150 minutes of moderate exercise per week")
    
    # Remove duplicates while preserving order
    seen = set()
    unique_recommendations = []
    for rec in recommendations:
        if rec not in seen:
            seen.add(rec)
            unique_recommendations.append(rec)
    
    return unique_recommendations[:6]  # Return top 6 recommendations


# API Endpoints
@app.get("/", response_model=HealthStatus)
async def root():
    """Health check endpoint"""
    return HealthStatus(
        status="healthy",
        model_loaded=model is not None,
        scaler_loaded=scaler is not None,
        version="1.0.0"
    )


@app.get("/health", response_model=HealthStatus)
async def health_check():
    """API health status"""
    return HealthStatus(
        status="healthy",
        model_loaded=model is not None,
        scaler_loaded=scaler is not None,
        version="1.0.0"
    )


@app.post("/predict", response_model=PredictionResponse)
async def predict_cardiovascular_risk(data: HealthData):
    """
    Predict cardiovascular disease risk based on health metrics.
    
    Returns risk score, risk level, and personalized recommendations.
    """
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please try again later."
        )
    
    try:
        # Calculate BMI
        bmi = calculate_bmi(data.weight, data.height)
        
        # Convert gender from (1,2) to (0,1) as used in training
        gender = data.gender - 1
        
        # Prepare features in the same order as training
        # Features: gender, height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active, age_years, bmi
        features = np.array([[
            gender,
            data.height,
            data.weight,
            data.ap_hi,
            data.ap_lo,
            data.cholesterol,
            data.gluc,
            data.smoke,
            data.alco,
            data.active,
            data.age,
            bmi
        ]])
        
        # Scale features if scaler is available
        if scaler is not None:
            features_scaled = scaler.transform(features)
        else:
            features_scaled = features
        
        # Get prediction
        prediction = model.predict(features_scaled)[0]
        
        # Get probability if available
        try:
            probability = model.predict_proba(features_scaled)[0]
            risk_score = round(probability[1] * 100, 1)  # Probability of CVD
        except AttributeError:
            # If model doesn't support predict_proba, estimate based on prediction
            risk_score = 75.0 if prediction == 1 else 25.0
        
        # Determine risk level
        if risk_score >= 60:
            risk_level = "high"
            message = "Your results indicate a higher risk of cardiovascular disease. We strongly recommend consulting with a healthcare professional for a comprehensive evaluation."
        elif risk_score >= 35:
            risk_level = "moderate"
            message = "Your results show a moderate cardiovascular risk. Consider lifestyle improvements and regular health check-ups."
        else:
            risk_level = "low"
            message = "Great news! Your results indicate a lower risk of cardiovascular disease. Keep maintaining your healthy lifestyle!"
        
        # Get risk factors and recommendations
        risk_factors = get_risk_factors(data, bmi)
        recommendations = get_recommendations(risk_factors, risk_level)
        
        return PredictionResponse(
            success=True,
            risk_score=risk_score,
            risk_level=risk_level,
            prediction=int(prediction),
            risk_factors=risk_factors,
            recommendations=recommendations,
            bmi=bmi,
            message=message
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


@app.get("/model-info")
async def model_info():
    """Get information about the loaded model"""
    if model is None:
        return {"loaded": False, "error": "Model not loaded"}
    
    return {
        "loaded": True,
        "type": type(model).__name__,
        "scaler_loaded": scaler is not None,
        "features": feature_names if feature_names else [
            "gender", "height", "weight", "ap_hi", "ap_lo",
            "cholesterol", "gluc", "smoke", "alco", "active", "age_years", "bmi"
        ],
        "target": "cardio (0=No CVD, 1=CVD)"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
