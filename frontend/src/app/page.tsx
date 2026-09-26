'use client';

import React, { useState } from 'react';
import { HeartDiseaseInput, PredictionResponse } from '../types/prediction';
import { Header } from '../components/Header';
import { PresetSelector } from '../components/PresetSelector';
import { PredictionForm } from '../components/PredictionForm';
import { ResultCard } from '../components/ResultCard';
import { MedicalGuideModal } from '../components/MedicalGuideModal';
import { AlertCircle, HeartPulse, Stethoscope, Sparkles } from 'lucide-react';

const DEFAULT_FORM_DATA: HeartDiseaseInput = {
  age: 55,
  sex: 'Male',
  chest_pain_type: 'Typical angina',
  resting_blood_pressure: 125,
  cholestoral: 212,
  fasting_blood_sugar: 'Lower than 120 mg/ml',
  rest_ecg: 'Normal',
  Max_heart_rate: 168,
  exercise_induced_angina: 'No',
  oldpeak: 1.0,
  slope: 'Flat',
  vessels_colored_by_flourosopy: 'Zero',
  thalassemia: 'Normal'
};

export default function Home() {
  const [formData, setFormData] = useState<HeartDiseaseInput>(DEFAULT_FORM_DATA);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  const handleFieldChange = (field: keyof HeartDiseaseInput, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectPreset = (presetData: HeartDiseaseInput) => {
    setFormData(presetData);
    setResult(null);
    setError(null);
  };

  const handleReset = () => {
    setFormData(DEFAULT_FORM_DATA);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
// Make sure your fetch uses `${API_URL}/predict`
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Prediction server returned HTTP ${response.status}`);
      }

      const data: PredictionResponse = await response.json();
      setResult(data);

      // Smooth scroll down to results
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    } catch (err: any) {
      console.error('Prediction request error:', err);
      setError(
        err.message || 'Unable to connect to FastAPI prediction backend. Make sure the backend server is running on http://127.0.0.1:8000.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Header */}
      <Header onOpenGuide={() => setIsGuideOpen(true)} />

      {/* Hero / Intro Header */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200/60 mb-3 shadow-2xs">
            <HeartPulse className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>Cleveland Heart Disease ML Pipeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cardiovascular Disease Risk Evaluation
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mt-2 leading-relaxed">
            Enter the patient’s clinical measurements and cardiac diagnostic metrics below. The Scikit-learn Random Forest model will evaluate the 13 clinical biomarkers in real-time to compute the disease risk probability.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start space-x-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Backend Communication Notice: </span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Presets Bar */}
        <PresetSelector
          onSelectPreset={handleSelectPreset}
          onReset={handleReset}
        />

        {/* Clinical Form */}
        <PredictionForm
          formData={formData}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {/* Diagnosis Results Card */}
        <ResultCard
          result={result}
          onClear={() => setResult(null)}
        />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <p>
            CardioScan Medical Intelligence Platform &bull; FastAPI + Scikit-Learn + Next.js
          </p>
        </div>
      </footer>

      {/* Guide Modal */}
      <MedicalGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
