'use client';

import React from 'react';
import { HeartDiseaseInput } from '../types/prediction';
import { Sparkles, UserCheck, AlertOctagon, RotateCcw } from 'lucide-react';

interface PresetSelectorProps {
  onSelectPreset: (preset: HeartDiseaseInput) => void;
  onReset: () => void;
}

export const PRESETS: Record<string, { title: string; subtitle: string; icon: any; color: string; data: HeartDiseaseInput }> = {
  healthy: {
    title: 'Low Risk Profile',
    subtitle: '60yo male, typical angina, no defect, low probability',
    icon: UserCheck,
    color: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-800',
    data: {
      age: 60,
      sex: 'Male',
      chest_pain_type: 'Typical angina',
      resting_blood_pressure: 130,
      cholestoral: 250,
      fasting_blood_sugar: 'Lower than 120 mg/ml',
      rest_ecg: 'Normal',
      Max_heart_rate: 135,
      exercise_induced_angina: 'Yes',
      oldpeak: 2.5,
      slope: 'Flat',
      vessels_colored_by_flourosopy: 'Two',
      thalassemia: 'Reversable Defect'
    }
  },
  moderate: {
    title: 'Moderate Risk Profile',
    subtitle: '54yo male, non-anginal pain, ST-T abnormality, 1 vessel',
    icon: Sparkles,
    color: 'border-amber-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-50 text-amber-800',
    data: {
      age: 54,
      sex: 'Male',
      chest_pain_type: 'Non-anginal pain',
      resting_blood_pressure: 138,
      cholestoral: 248,
      fasting_blood_sugar: 'Lower than 120 mg/ml',
      rest_ecg: 'ST-T wave abnormality',
      Max_heart_rate: 142,
      exercise_induced_angina: 'No',
      oldpeak: 1.4,
      slope: 'Flat',
      vessels_colored_by_flourosopy: 'One',
      thalassemia: 'Normal'
    }
  },
  highRisk: {
    title: 'High Risk Profile',
    subtitle: '58yo female, asymptomatic angina, fixed defect, high probability',
    icon: AlertOctagon,
    color: 'border-rose-200 hover:border-rose-400 bg-rose-50/50 hover:bg-rose-50 text-rose-800',
    data: {
      age: 58,
      sex: 'Female',
      chest_pain_type: 'Asymptomatic',
      resting_blood_pressure: 140,
      cholestoral: 240,
      fasting_blood_sugar: 'Lower than 120 mg/ml',
      rest_ecg: 'Normal',
      Max_heart_rate: 165,
      exercise_induced_angina: 'No',
      oldpeak: 0.5,
      slope: 'Upsloping',
      vessels_colored_by_flourosopy: 'Zero',
      thalassemia: 'Fixed Defect'
    }
  }
};

export const PresetSelector: React.FC<PresetSelectorProps> = ({ onSelectPreset, onReset }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-rose-500" />
            Quick Patient Evaluation Presets
          </h3>
          <p className="text-xs text-slate-500">Populate the 13 clinical indicators with pre-calibrated test cases</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
        {Object.entries(PRESETS).map(([key, item]) => {
          const Icon = item.icon;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectPreset(item.data)}
              className={`flex items-start text-left p-3 rounded-xl border transition-all duration-200 shadow-xs hover:shadow-sm ${item.color}`}
            >
              <div className="p-2 rounded-lg bg-white/80 shadow-xs mr-3 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold">{item.title}</span>
                <span className="block text-[11px] opacity-80 mt-0.5 leading-snug">{item.subtitle}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
