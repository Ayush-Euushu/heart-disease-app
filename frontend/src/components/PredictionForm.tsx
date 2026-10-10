'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { HeartDiseaseInput } from '../types/prediction';
import {
  User,
  Heart,
  Droplets,
  Activity,
  Gauge,
  Loader2,
  ChevronDown,
  Stethoscope
} from 'lucide-react';

interface PredictionFormProps {
  formData: HeartDiseaseInput;
  onChange: (field: keyof HeartDiseaseInput, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' }
  }
};

export const PredictionForm: React.FC<PredictionFormProps> = ({
  formData,
  onChange,
  onSubmit,
  loading
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Loading Skeleton / Processing Overlay Notice */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-900 text-xs sm:text-sm flex items-center justify-between shadow-2xs"
        >
          <div className="flex items-center space-x-2.5">
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
            <span className="font-medium tracking-tight">
              Executing Cleveland Random Forest Pipeline &bull; Computing Bayes Posterior & Risk Factors...
            </span>
          </div>
          <span className="text-[11px] text-blue-600/80 font-mono hidden md:inline">
            Inference latency: &lt; 50ms
          </span>
        </motion.div>
      )}

      {/* Logical visual grouping in modern responsive grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 transition-opacity duration-200 ${
          loading ? 'opacity-70 pointer-events-none select-none' : 'opacity-100'
        }`}
      >
        {/* Section 1: Demographics & Baseline */}
        <motion.div
          variants={sectionVariants}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
                <User className="w-4.5 h-4.5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  1. Patient Demographics
                </h3>
                <p className="text-xs text-slate-500 font-light">
                  Baseline physiological age and biological sex
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Age */}
              <div className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="age" className="text-xs font-medium text-slate-700 tracking-tight">
                    Age
                  </label>
                  <span className="text-[10px] text-slate-400 font-normal">Range: 18 - 100</span>
                </div>
                <div className="relative">
                  <input
                    id="age"
                    type="number"
                    min="18"
                    max="100"
                    required
                    value={formData.age}
                    onChange={(e) => onChange('age', parseFloat(e.target.value) || 0)}
                    disabled={loading}
                    className="w-full pl-3.5 pr-14 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none"
                    placeholder="55"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none font-medium">
                    years
                  </span>
                </div>
              </div>

              {/* Sex */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="sex" className="text-xs font-medium text-slate-700 tracking-tight">
                    Biological Sex
                  </label>
                  <span className="text-[10px] text-slate-400 font-normal">Karyotypic</span>
                </div>
                <div className="relative">
                  <select
                    id="sex"
                    value={formData.sex}
                    onChange={(e) => onChange('sex', e.target.value)}
                    disabled={loading}
                    className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Hemodynamics & Vitals */}
        <motion.div
          variants={sectionVariants}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
                <Heart className="w-4.5 h-4.5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  2. Cardiovascular Vitals
                </h3>
                <p className="text-xs text-slate-500 font-light">
                  Resting systemic blood pressure and peak chronotropic rate
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Resting BP */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="rbp" className="text-xs font-medium text-slate-700 tracking-tight">
                    Resting Blood Pressure
                  </label>
                  <span className="text-[10px] text-slate-400 font-normal">Normal: &lt;120</span>
                </div>
                <div className="relative">
                  <input
                    id="rbp"
                    type="number"
                    min="60"
                    max="250"
                    required
                    value={formData.resting_blood_pressure}
                    onChange={(e) => onChange('resting_blood_pressure', parseFloat(e.target.value) || 0)}
                    disabled={loading}
                    className="w-full pl-3.5 pr-16 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none"
                    placeholder="120"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none font-medium">
                    mmHg
                  </span>
                </div>
              </div>

              {/* Max Heart Rate */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="mhr" className="text-xs font-medium text-slate-700 tracking-tight">
                    Maximum Heart Rate
                  </label>
                  <span className="text-[10px] text-slate-400 font-normal">Treadmill peak</span>
                </div>
                <div className="relative">
                  <input
                    id="mhr"
                    type="number"
                    min="60"
                    max="240"
                    required
                    value={formData.Max_heart_rate}
                    onChange={(e) => onChange('Max_heart_rate', parseFloat(e.target.value) || 0)}
                    disabled={loading}
                    className="w-full pl-3.5 pr-14 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none"
                    placeholder="150"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none font-medium">
                    bpm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Metabolic & Lipid Chemistry */}
        <motion.div
          variants={sectionVariants}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
                <Droplets className="w-4.5 h-4.5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  3. Metabolic & Lipid Biomarkers
                </h3>
                <p className="text-xs text-slate-500 font-light">
                  Serum cholesterol fractionation and fasting blood glucose
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Serum Cholesterol */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="chol" className="text-xs font-medium text-slate-700 tracking-tight">
                    Serum Cholesterol
                  </label>
                  <span className="text-[10px] text-slate-400 font-normal">Optimal: &lt;200</span>
                </div>
                <div className="relative">
                  <input
                    id="chol"
                    type="number"
                    min="80"
                    max="600"
                    required
                    value={formData.cholestoral}
                    onChange={(e) => onChange('cholestoral', parseFloat(e.target.value) || 0)}
                    disabled={loading}
                    className="w-full pl-3.5 pr-16 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none"
                    placeholder="200"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none font-medium">
                    mg/dL
                  </span>
                </div>
              </div>

              {/* Fasting Blood Sugar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="fbs" className="text-xs font-medium text-slate-700 tracking-tight">
                    Fasting Blood Sugar
                  </label>
                  <span className="text-[10px] text-slate-400 font-normal">Threshold 120</span>
                </div>
                <div className="relative">
                  <select
                    id="fbs"
                    value={formData.fasting_blood_sugar}
                    onChange={(e) => onChange('fasting_blood_sugar', e.target.value)}
                    disabled={loading}
                    className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none cursor-pointer"
                  >
                    <option value="Lower than 120 mg/ml">&le; 120 mg/dL (Normal Fasting)</option>
                    <option value="Greater than 120 mg/ml">&gt; 120 mg/dL (Impaired / Diabetic)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 4: ECG Tracings & Symptomatology */}
        <motion.div
          variants={sectionVariants}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
                <Activity className="w-4.5 h-4.5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  4. Electrocardiogram & Symptoms
                </h3>
                <p className="text-xs text-slate-500 font-light">
                  Anginal pain classification and baseline 12-lead ECG findings
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Chest Pain Type */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="cpt" className="text-xs font-medium text-slate-700 tracking-tight">
                    Chest Pain Subtype
                  </label>
                  <span className="text-[10px] text-slate-400 font-normal">Clinical presentation</span>
                </div>
                <div className="relative">
                  <select
                    id="cpt"
                    value={formData.chest_pain_type}
                    onChange={(e) => onChange('chest_pain_type', e.target.value)}
                    disabled={loading}
                    className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none cursor-pointer"
                  >
                    <option value="Typical angina">Typical Angina (Substernal Pressure)</option>
                    <option value="Atypical angina">Atypical Angina</option>
                    <option value="Non-anginal pain">Non-Anginal Musculoskeletal Pain</option>
                    <option value="Asymptomatic">Asymptomatic (Silent Ischemia)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Resting ECG */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="ecg" className="text-xs font-medium text-slate-700 tracking-tight">
                    Resting ECG Waveform
                  </label>
                  <span className="text-[10px] text-slate-400 font-normal">Baseline Lead II</span>
                </div>
                <div className="relative">
                  <select
                    id="ecg"
                    value={formData.rest_ecg}
                    onChange={(e) => onChange('rest_ecg', e.target.value)}
                    disabled={loading}
                    className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none cursor-pointer"
                  >
                    <option value="Normal">Normal Tracing</option>
                    <option value="ST-T wave abnormality">ST-T Wave Abnormality (T-inversion)</option>
                    <option value="Left ventricular hypertrophy">Left Ventricular Hypertrophy (LVH)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 5: Stress Testing & Advanced Diagnostics (Spans across or nicely aligned) */}
        <motion.div
          variants={sectionVariants}
          className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60">
              <Gauge className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                5. Stress Hemodynamics, Ischemia & Fluoroscopy
              </h3>
              <p className="text-xs text-slate-500 font-light">
                Stress-induced ST displacement, coronary vessel calcification, and myocardial perfusion
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5">
            {/* Exercise Induced Angina */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="exang" className="text-xs font-medium text-slate-700 tracking-tight">
                  Exercise-Induced Angina
                </label>
                <span className="text-[10px] text-slate-400 font-normal">Exertion trigger</span>
              </div>
              <div className="relative">
                <select
                  id="exang"
                  value={formData.exercise_induced_angina}
                  onChange={(e) => onChange('exercise_induced_angina', e.target.value)}
                  disabled={loading}
                  className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none cursor-pointer"
                >
                  <option value="No">No Exertional Angina</option>
                  <option value="Yes">Yes (Present on Stress Test)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* ST Depression (Oldpeak) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="oldpeak" className="text-xs font-medium text-slate-700 tracking-tight">
                  ST Depression (Oldpeak)
                </label>
                <span className="text-[10px] text-slate-400 font-normal">Relative to rest</span>
              </div>
              <div className="relative">
                <input
                  id="oldpeak"
                  type="number"
                  step="0.1"
                  min="0.0"
                  max="8.0"
                  required
                  value={formData.oldpeak}
                  onChange={(e) => onChange('oldpeak', parseFloat(e.target.value) || 0)}
                  disabled={loading}
                  className="w-full pl-3.5 pr-14 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none"
                  placeholder="1.0"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none font-medium">
                  mm
                </span>
              </div>
            </div>

            {/* ST Slope */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="slope" className="text-xs font-medium text-slate-700 tracking-tight">
                  Peak Exercise ST Slope
                </label>
                <span className="text-[10px] text-slate-400 font-normal">Trajectory</span>
              </div>
              <div className="relative">
                <select
                  id="slope"
                  value={formData.slope}
                  onChange={(e) => onChange('slope', e.target.value)}
                  disabled={loading}
                  className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none cursor-pointer"
                >
                  <option value="Upsloping">Upsloping (Physiological)</option>
                  <option value="Flat">Flat (Borderline Ischemia)</option>
                  <option value="Downsloping">Downsloping (Pathologic Ischemia)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Major Fluoroscopy Vessels */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="vessels" className="text-xs font-medium text-slate-700 tracking-tight">
                  Vessels Colored by Fluoroscopy
                </label>
                <span className="text-[10px] text-slate-400 font-normal">Major Coronary Arteries</span>
              </div>
              <div className="relative">
                <select
                  id="vessels"
                  value={formData.vessels_colored_by_flourosopy}
                  onChange={(e) => onChange('vessels_colored_by_flourosopy', e.target.value)}
                  disabled={loading}
                  className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none cursor-pointer"
                >
                  <option value="Zero">0 Vessels (Clean Angiography)</option>
                  <option value="One">1 Major Vessel Colored</option>
                  <option value="Two">2 Major Vessels Colored</option>
                  <option value="Three">3 Major Vessels Colored</option>
                  <option value="Four">4 Major Vessels Colored</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Thalassemia / Myocardial Perfusion */}
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="thal" className="text-xs font-medium text-slate-700 tracking-tight">
                  Thallium Scintigraphy Perfusion
                </label>
                <span className="text-[10px] text-slate-400 font-normal">Nuclear Cardiology</span>
              </div>
              <div className="relative">
                <select
                  id="thal"
                  value={formData.thalassemia}
                  onChange={(e) => onChange('thalassemia', e.target.value)}
                  disabled={loading}
                  className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 hover:border-slate-300 transition-all duration-150 outline-none cursor-pointer"
                >
                  <option value="Normal">Normal Blood Flow (Uniform Perfusion)</option>
                  <option value="Fixed Defect">Fixed Defect (Infarction / Scar tissue)</option>
                  <option value="Reversable Defect">Reversible Defect (Transient Stress Ischemia)</option>
                  <option value="No">No Defect Documented</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Clinical Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-3 gap-3">
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-light">
          <Stethoscope className="w-4 h-4 text-blue-600 shrink-0" />
          <span>All 13 standard Cleveland Clinic cardiac predictors included in model schema.</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm tracking-tight shadow-sm hover:shadow-md transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing Clinical Data...</span>
            </>
          ) : (
            <>
              <Activity className="w-4 h-4 text-white/90" />
              <span>Compute Diagnostic Evaluation</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
