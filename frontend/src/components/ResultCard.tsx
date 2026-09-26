'use client';

import React from 'react';
import { PredictionResponse } from '../types/prediction';
import { ShieldCheck, AlertTriangle, Activity, Printer, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

interface ResultCardProps {
  result: PredictionResponse | null;
  onClear: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onClear }) => {
  if (!result) return null;

  const isRisk = result.prediction === 1;

  return (
    <div
      className={`mt-8 rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 shadow-md ${
        isRisk
          ? 'bg-rose-50/70 border-rose-400 text-rose-950 shadow-rose-100'
          : 'bg-emerald-50/70 border-emerald-400 text-emerald-950 shadow-emerald-100'
      }`}
    >
      {/* Top Banner: Status & Action buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-black/10 gap-4">
        <div className="flex items-center space-x-3.5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm shrink-0 ${
              isRisk ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
            }`}
          >
            {isRisk ? (
              <AlertTriangle className="w-7 h-7" />
            ) : (
              <ShieldCheck className="w-7 h-7" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                  isRisk ? 'bg-rose-200 text-rose-800' : 'bg-emerald-200 text-emerald-800'
                }`}
              >
                Diagnostic Classification
              </span>
              <span className="text-xs text-slate-500 font-medium">Random Forest Pipeline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              {isRisk ? 'Heart Disease Risk Detected' : 'Healthy Cardiac Evaluation'}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold shadow-xs hover:shadow-sm transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print Summary
          </button>
          <button
            onClick={onClear}
            className="px-3.5 py-2 rounded-xl bg-white text-slate-600 hover:text-slate-900 border border-slate-200 text-xs font-semibold shadow-xs hover:shadow-sm transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Probability Gauge & Key Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-black/10">

        {/* Primary Probability */}
        <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Disease Risk Probability
            </span>
            <div className="flex items-baseline space-x-2">
              <span className={`text-4xl sm:text-5xl font-black ${isRisk ? 'text-rose-600' : 'text-slate-800'}`}>
                {result.probability_percentage}%
              </span>
              <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded-md ${
                isRisk ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {result.risk_level} Risk
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 rounded-full ${
                  isRisk ? 'bg-gradient-to-r from-amber-500 to-rose-600' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.max(result.probability_percentage, 5)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
              <span>0% (Low)</span>
              <span>50% (Threshold)</span>
              <span>100% (High)</span>
            </div>
          </div>
        </div>

        {/* Healthy Confidence */}
        <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Healthy Confidence Score
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl sm:text-5xl font-black text-emerald-600">
                {result.healthy_probability_percentage}%
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            Statistical confidence that the patient exhibits healthy cardiac perfusion with no critical stenosis.
          </p>
        </div>

        {/* Clinical Summary */}
        <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Assessment Summary
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed mt-1">
              {result.summary}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-100">
            <Activity className="w-3.5 h-3.5" />
            <span>Cleveland Heart Disease Trained Model</span>
          </div>
        </div>

      </div>

      {/* Contributing Clinical Factors */}
      <div className="pt-6">
        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
          {isRisk ? (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          )}
          {isRisk ? 'Key Cardiac Risk Factors Identified' : 'Favorable Clinical Indicators'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {result.contributing_factors.map((factor, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-2.5 p-3 rounded-xl bg-white/90 border border-black/5 shadow-2xs text-xs text-slate-700"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                  isRisk ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
              ></span>
              <span className="font-medium leading-relaxed">{factor}</span>
            </div>
          ))}
        </div>

        {/* Medical Advisory Note */}
        <p className="text-[11px] text-slate-400 italic mt-5 leading-normal">
          Disclaimer: This machine learning assessment is intended strictly for educational and preliminary screening demonstration purposes. It does not substitute professional medical judgment, comprehensive coronary angiography, or individualized cardiologist diagnosis.
        </p>
      </div>
    </div>
  );
};
