"""
Training script for Cardiovascular Disease Prediction Model
This script trains the model and saves both the model and scaler for the API
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import pickle
import os

def load_and_preprocess_data(filepath):
    """Load and preprocess the cardiovascular disease dataset"""
    print("Loading data from:", filepath)
    df = pd.read_csv(filepath, sep=';')
    print(f"Original shape: {df.shape}")
    
    # Drop id column
    df.drop(columns=['id'], inplace=True)
    
    # Convert age from days to years
    df['age_years'] = (df['age'] / 365).astype(int)
    df.drop(columns=['age'], inplace=True)
    
    # Filter blood pressure outliers
    df = df[(df['ap_hi'] > 0) & (df['ap_lo'] > 0)]
    df = df[(df['ap_hi'] < 250) & (df['ap_lo'] < 200)]
    df = df[df['ap_hi'] >= df['ap_lo']]
    
    # Filter height outliers
    df = df[(df['height'] >= 120) & (df['height'] <= 220)]
    
    # Convert gender (1,2) to (0,1)
    df['gender'] = df['gender'] - 1
    
    # Calculate BMI
    df['bmi'] = df['weight'] / ((df['height'] / 100) ** 2)
    
    # Filter BMI outliers
    df = df[(df['bmi'] >= 15) & (df['bmi'] <= 60)]
    
    print(f"Processed shape: {df.shape}")
    return df

def train_model(df):
    """Train the logistic regression model"""
    # Separate features and target
    X = df.drop(columns=['cardio'])
    y = df['cardio']
    
    print(f"\nFeatures: {list(X.columns)}")
    print(f"Target: cardio")
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model
    print("\nTraining Logistic Regression model...")
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train_scaled, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"\nAccuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    return model, scaler, list(X.columns)

def save_artifacts(model, scaler, feature_names, output_dir='.'):
    """Save model, scaler, and feature names"""
    
    # Save model
    model_path = os.path.join(output_dir, 'cardio_model.pkl')
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"\n✅ Model saved to: {model_path}")
    
    # Save scaler
    scaler_path = os.path.join(output_dir, 'cardio_scaler.pkl')
    with open(scaler_path, 'wb') as f:
        pickle.dump(scaler, f)
    print(f"✅ Scaler saved to: {scaler_path}")
    
    # Save feature names
    features_path = os.path.join(output_dir, 'feature_names.pkl')
    with open(features_path, 'wb') as f:
        pickle.dump(feature_names, f)
    print(f"✅ Feature names saved to: {features_path}")
    
    return model_path, scaler_path, features_path

if __name__ == "__main__":
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(script_dir, 'cardio_train.csv')
    
    # Load and preprocess data
    df = load_and_preprocess_data(data_path)
    
    # Train model
    model, scaler, feature_names = train_model(df)
    
    # Save artifacts
    save_artifacts(model, scaler, feature_names, script_dir)
    
    print("\n🎉 Training complete! All artifacts saved.")
