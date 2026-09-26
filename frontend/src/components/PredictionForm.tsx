'use client';

import React from 'react';
import { HeartDiseaseInput } from '../types/prediction';
import { Activity, Heart, Droplets, Thermometer, Gauge, Zap, Info, Loader2 } from 'lucide-react';

interface PredictionFormProps {
  formData: HeartDiseaseInput;
  onChange: (field: keyof HeartDiseaseInput, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  formData,
  onChange,
  onSubmit,
  loading
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* 4 Cards in 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Card 1: Patient Demographics */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100 mb-5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Patient Demographics</h4>
              <p className="text-xs text-slate-500">Biological attributes & age</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Age */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Age (Years)</span>
                <span className="text-[11px] font-normal text-slate-400">18 - 100</span>
              </label>
              <input
                type="number"
                min="18"
                max="120"
                required
                value={formData.age}
                onChange={(e) => onChange('age', parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-sm text-slate-800 transition"
                placeholder="e.g. 55"
              />
            </div>

            {/* Sex */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Biological Sex
              </label>
              <select
                value={formData.sex}
                onChange={(e) => onChange('sex', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-sm text-slate-800 bg-white transition"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 2: Vitals & Blood Chemistry */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100 mb-5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Vitals & Blood Chemistry</h4>
              <p className="text-xs text-slate-500">Blood pressure, lipid panel & fasting glucose</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Resting Blood Pressure */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Resting BP</span>
                <span className="text-[10px] text-slate-400">mmHg</span>
              </label>
              <input
                type="number"
                min="60"
                max="240"
                required
                value={formData.resting_blood_pressure}
                onChange={(e) => onChange('resting_blood_pressure', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-sm text-slate-800 transition"
                placeholder="120"
              />
            </div>

            {/* Cholesterol */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Serum Chol.</span>
                <span className="text-[10px] text-slate-400">mg/dl</span>
              </label>
              <input
                type="number"
                min="80"
                max="600"
                required
                value={formData.cholestoral}
                onChange={(e) => onChange('cholestoral', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-sm text-slate-800 transition"
                placeholder="200"
              />
            </div>

            {/* Fasting Blood Sugar */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Fasting Sugar
              </label>
              <select
                value={formData.fasting_blood_sugar}
                onChange={(e) => onChange('fasting_blood_sugar', e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-xs text-slate-800 bg-white transition"
              >
                <option value="Lower than 120 mg/ml">&le; 120 mg/dl (Normal)</option>
                <option value="Greater than 120 mg/ml">&gt; 120 mg/dl (Elevated)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 3: Electrocardiogram & Heart Rate */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100 mb-5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Cardiac Symptoms & ECG</h4>
              <p className="text-xs text-slate-500">Angina categorization & baseline tracing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Chest Pain Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Chest Pain Type
              </label>
              <select
                value={formData.chest_pain_type}
                onChange={(e) => onChange('chest_pain_type', e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-xs text-slate-800 bg-white transition"
              >
                <option value="Typical angina">Typical Angina</option>
                <option value="Atypical angina">Atypical Angina</option>
                <option value="Non-anginal pain">Non-anginal Pain</option>
                <option value="Asymptomatic">Asymptomatic</option>
              </select>
            </div>

            {/* Resting ECG */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Resting ECG
              </label>
              <select
                value={formData.rest_ecg}
                onChange={(e) => onChange('rest_ecg', e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-xs text-slate-800 bg-white transition"
              >
                <option value="Normal">Normal</option>
                <option value="ST-T wave abnormality">ST-T Wave Abnormality</option>
                <option value="Left ventricular hypertrophy">LV Hypertrophy</option>
              </select>
            </div>

            {/* Max Heart Rate */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Max Heart Rate</span>
                <span className="text-[10px] text-slate-400">bpm</span>
              </label>
              <input
                type="number"
                min="60"
                max="240"
                required
                value={formData.Max_heart_rate}
                onChange={(e) => onChange('Max_heart_rate', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-sm text-slate-800 transition"
                placeholder="150"
              />
            </div>
          </div>
        </div>

        {/* Card 4: Stress Testing & Advanced Imaging */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100 mb-5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Stress Testing & Fluoroscopy</h4>
              <p className="text-xs text-slate-500">Ischemic markers, ST slope & vessels</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {/* Exercise Induced Angina */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Ex. Angina
              </label>
              <select
                value={formData.exercise_induced_angina}
                onChange={(e) => onChange('exercise_induced_angina', e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-xs text-slate-800 bg-white transition"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {/* ST Depression (oldpeak) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>ST Dep. (Oldpeak)</span>
                <span className="text-[10px] text-slate-400">mm</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0.0"
                max="8.0"
                required
                value={formData.oldpeak}
                onChange={(e) => onChange('oldpeak', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-sm text-slate-800 transition"
                placeholder="1.0"
              />
            </div>

            {/* ST Slope */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                ST Slope
              </label>
              <select
                value={formData.slope}
                onChange={(e) => onChange('slope', e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-xs text-slate-800 bg-white transition"
              >
                <option value="Upsloping">Upsloping</option>
                <option value="Flat">Flat</option>
                <option value="Downsloping">Downsloping</option>
              </select>
            </div>

            {/* Fluoroscopy Major Vessels */}
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Vessels (Fluoroscopy)
              </label>
              <select
                value={formData.vessels_colored_by_flourosopy}
                onChange={(e) => onChange('vessels_colored_by_flourosopy', e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-xs text-slate-800 bg-white transition"
              >
                <option value="Zero">Zero (0)</option>
                <option value="One">One (1)</option>
                <option value="Two">Two (2)</option>
                <option value="Three">Three (3)</option>
                <option value="Four">Four (4)</option>
              </select>
            </div>

            {/* Thalassemia */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Thalassemia Evaluation
              </label>
              <select
                value={formData.thalassemia}
                onChange={(e) => onChange('thalassemia', e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-xs text-slate-800 bg-white transition"
              >
                <option value="Normal">Normal Blood Flow</option>
                <option value="Fixed Defect">Fixed Defect (No blood flow in part of heart)</option>
                <option value="Reversable Defect">Reversable Defect (Blood flow observed during rest)</option>
                <option value="No">No Defect</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      {/* Submit Action Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-sm shadow-md shadow-rose-200 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Clinical Data...</span>
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 fill-white/40" />
              <span>Run Diagnostic Risk Assessment</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
