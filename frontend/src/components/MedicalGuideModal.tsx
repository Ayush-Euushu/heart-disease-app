'use client';

import React from 'react';
import { X, BookOpen, Stethoscope, Heart, Activity, Droplets } from 'lucide-react';

interface MedicalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicalGuideModal: React.FC<MedicalGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    { name: 'Age', unit: 'Years', desc: 'Patient age in completed years.' },
    { name: 'Biological Sex', unit: 'Female / Male', desc: 'Biological sex assigned at birth.' },
    { name: 'Chest Pain Type', unit: 'Categorical', desc: 'Typical Angina (classic exertion pressure), Atypical Angina, Non-anginal pain, or Asymptomatic (silent ischemia).' },
    { name: 'Resting Blood Pressure', unit: 'mm Hg', desc: 'Systolic blood pressure measured upon admission to hospital.' },
    { name: 'Serum Cholesterol', unit: 'mg/dl', desc: 'Total fasting blood serum cholesterol level.' },
    { name: 'Fasting Blood Sugar', unit: '> 120 mg/dl', desc: 'Indicates diabetic or pre-diabetic metabolic glucose state.' },
    { name: 'Resting Electrocardiogram', unit: 'ECG', desc: 'Normal baseline, ST-T wave abnormalities (T wave inversion / ST elevation), or Left Ventricular Hypertrophy.' },
    { name: 'Maximum Heart Rate', unit: 'bpm', desc: 'Highest heart rate attained during standardized treadmill stress test.' },
    { name: 'Exercise Induced Angina', unit: 'Yes / No', desc: 'Precipitation of ischemic chest tightness provoked by treadmill exertion.' },
    { name: 'Oldpeak (ST Depression)', unit: 'mm', desc: 'ST depression measured on ECG relative to resting baseline, indicating reversible subendocardial ischemia.' },
    { name: 'Slope', unit: 'ST Segment', desc: 'Slope of peak exercise ST segment: Upsloping (normal), Flat, or Downsloping (severe ischemia).' },
    { name: 'Fluoroscopy Colored Vessels', unit: '0 to 4', desc: 'Number of major coronary vessels colored by fluoroscopic contrast dye.' },
    { name: 'Thalassemia', unit: 'Nuclear Perfusion', desc: 'Myocardial nuclear imaging: Normal perfusion, Fixed Defect (permanent infarcted scar), or Reversable Defect (ischemia at stress that normalizes at rest).' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">13 Clinical Features Guide</h3>
              <p className="text-xs text-slate-500">Definitions and clinical thresholds for cardiovascular assessment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-3 divide-y divide-slate-100">
          {features.map((item, idx) => (
            <div key={idx} className="pt-3 first:pt-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-900">{idx + 1}. {item.name}</span>
                <span className="text-[11px] font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                  {item.unit}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
