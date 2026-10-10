'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartDiseaseInput, PredictionResponse } from '../types/prediction';
import { Header } from '../components/Header';
import { PresetSelector } from '../components/PresetSelector';
import { PredictionForm } from '../components/PredictionForm';
import { ResultCard } from '../components/ResultCard';
import { MedicalGuideModal } from '../components/MedicalGuideModal';
import {
  HeartPulse,
  AlertCircle,
  Activity,
  CheckCircle2,
  Shield,
  FileCheck2,
  Sparkles,
  RefreshCw
} from 'lucide-react';

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
  const resultsRef = useRef<HTMLDivElement>(null);

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

      // Smooth scroll to the result section
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Prediction request error:', err);
      setError(
        err.message || 'Unable to connect to FastAPI prediction backend. Verify the backend server is running on http://127.0.0.1:8000.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 antialiased">
      {/* Header with live API heartbeat badge and guide trigger */}
      <Header onOpenGuide={() => setIsGuideOpen(true)} />

      {/* Main Clinical Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Hero Section with staggered entrance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mb-8 sm:mb-10"
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/80 text-blue-700 text-xs font-medium tracking-tight mb-3.5 shadow-2xs">
            <HeartPulse className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Cleveland Clinic Clinical Validation Protocol</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-slate-950 leading-tight">
            Cardiovascular Disease <span className="font-semibold text-slate-900">Risk Intelligence</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-light max-w-3xl mt-2.5 leading-relaxed">
            Standardized clinical decision support engine. Input the patient’s diagnostic biomarkers, hemodynamic parameters, and electrocardiographic findings below to evaluate ischemic heart disease probability via ensemble machine learning.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 pt-4 border-t border-slate-200/60 text-xs text-slate-500 font-light">
            <div className="flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Random Forest Classifier</span>
            </div>
            <span className="text-slate-300">&bull;</span>
            <div className="flex items-center space-x-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
              <span>13 Standard Biomarkers</span>
            </div>
            <span className="text-slate-300">&bull;</span>
            <div className="flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Sub-second Real-time Inference</span>
            </div>
          </div>
        </motion.div>

        {/* Error Notification Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="mb-6 p-4 rounded-2xl bg-rose-50/90 border border-rose-200/90 text-rose-900 text-xs sm:text-sm flex items-start space-x-3.5 shadow-xs"
            >
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold">Backend Communication Notice: </span>
                <span className="font-light">{error}</span>
              </div>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-rose-500 hover:text-rose-700 text-xs font-medium px-2 py-1 rounded-md hover:bg-rose-100/60 transition"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Patient Presets Selector */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mb-6"
        >
          <PresetSelector
            onSelectPreset={handleSelectPreset}
            onReset={handleReset}
          />
        </motion.div>

        {/* Clinical Prediction Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <PredictionForm
            formData={formData}
            onChange={handleFieldChange}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </motion.div>

        {/* Diagnostic Results Card Section */}
        <div ref={resultsRef}>
          <ResultCard
            result={result}
            onClear={() => setResult(null)}
          />
        </div>
      </main>

      {/* Clinical Footer */}
      <footer className="w-full border-t border-slate-200/80 bg-white py-6 mt-16 text-center text-xs text-slate-500 font-light">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-slate-700">CardioScan</span>
            <span>&bull;</span>
            <span>Clinical Cardiovascular Decision Support System</span>
          </div>

          <div className="text-slate-400 text-[11px]">
            Trained on Cleveland Clinic Foundation Dataset &bull; FastAPI + Scikit-Learn + Next.js
          </div>
        </div>
      </footer>

      {/* Biomarker Reference Modal */}
      <MedicalGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
