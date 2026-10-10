'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PredictionResponse } from '../types/prediction';
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  Printer,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  TrendingUp,
  Info
} from 'lucide-react';

interface ResultCardProps {
  result: PredictionResponse | null;
  onClear: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onClear }) => {
  if (!result) return null;

  const isRisk = result.prediction === 1;

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-8 rounded-3xl p-6 sm:p-8 border transition-all duration-300 shadow-sm hover:shadow-md ${
          isRisk
            ? 'bg-rose-50/40 border-rose-200/90 text-slate-900'
            : 'bg-emerald-50/40 border-emerald-200/90 text-slate-900'
        }`}
      >
        {/* Top Clinical Header & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
          <div className="flex items-center space-x-4">
            <div
              className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ring-4 ${
                isRisk
                  ? 'bg-rose-600 text-white ring-rose-100'
                  : 'bg-emerald-600 text-white ring-emerald-100'
              }`}
            >
              {isRisk ? (
                <AlertTriangle className="w-7 h-7" />
              ) : (
                <ShieldCheck className="w-7 h-7" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                    isRisk
                      ? 'bg-rose-100/80 text-rose-800 border-rose-200'
                      : 'bg-emerald-100/80 text-emerald-800 border-emerald-200'
                  }`}
                >
                  Diagnostic Classification
                </span>
                <span className="text-xs text-slate-500 font-light">
                  Cleveland Ensemble RF Protocol
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 mt-1">
                {isRisk ? 'Elevated Cardiovascular Risk Detected' : 'Healthy Cardiac Perfusion Profile'}
              </h2>
            </div>
          </div>

          {/* Micro-interaction Action buttons */}
          <div className="flex items-center space-x-2 self-end sm:self-auto print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-700 hover:text-slate-950 border border-slate-200 text-xs font-medium shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all duration-150"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Report</span>
            </button>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-600 hover:text-slate-900 border border-slate-200 text-xs font-medium shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all duration-150"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Clinical Probability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 py-6 border-b border-slate-200/80">
          {/* Card 1: Primary Disease Probability */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/70 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Disease Risk Probability
                </span>
                <span
                  className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                    isRisk
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {result.risk_level} Risk
                </span>
              </div>

              <div className="flex items-baseline space-x-2 mt-1">
                <span
                  className={`text-4xl sm:text-5xl font-light tracking-tight ${
                    isRisk ? 'text-rose-600' : 'text-slate-900'
                  }`}
                >
                  {result.probability_percentage}
                  <span className="text-2xl font-light">%</span>
                </span>
              </div>
            </div>

            {/* Calibrated Risk Bar with fluid framer-motion width */}
            <div className="mt-5">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/40">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(result.probability_percentage, 4)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  className={`h-full rounded-full transition-all ${
                    isRisk
                      ? 'bg-gradient-to-r from-amber-500 to-rose-600'
                      : 'bg-emerald-500'
                  }`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-light">
                <span>0% Low</span>
                <span className="font-normal text-slate-500">50% Cutoff</span>
                <span>100% Critical</span>
              </div>
            </div>
          </div>

          {/* Card 2: Healthy Confidence Score */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/70 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Healthy Perfusion Confidence
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-4xl sm:text-5xl font-light tracking-tight text-emerald-600">
                  {result.healthy_probability_percentage}
                  <span className="text-2xl font-light">%</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-light mt-4 leading-relaxed">
              Statistical likelihood that the patient exhibits preserved coronary perfusion without hemodynamically significant epicardial stenosis.
            </p>
          </div>

          {/* Card 3: Clinical Summary Synthesis */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/70 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Diagnostic Interpretation</span>
              </div>

              <p className="text-xs sm:text-sm font-normal text-slate-800 leading-relaxed mt-1">
                {result.summary}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-light mt-4 pt-3 border-t border-slate-100">
              <Activity className="w-3 h-3 text-slate-400" />
              <span>Calibrated against Cleveland Clinical Cohort</span>
            </div>
          </div>
        </div>

        {/* Contributing Factors & Clinical Pathways */}
        <div className="pt-6">
          <div className="flex items-center space-x-2 mb-4">
            {isRisk ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <h3 className="text-sm font-semibold tracking-tight text-slate-900">
              {isRisk
                ? 'Key Pathophysiological Indicators Contributing to Risk'
                : 'Favorable Hemodynamic & Diagnostic Indicators Observed'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.contributing_factors.map((factor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                className="flex items-start space-x-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs text-slate-700"
              >
                <span
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    isRisk ? 'bg-rose-500 ring-2 ring-rose-100' : 'bg-emerald-500 ring-2 ring-emerald-100'
                  }`}
                />
                <span className="font-normal leading-relaxed">{factor}</span>
              </motion.div>
            ))}
          </div>

          {/* Standard Clinical Advisory & Disclaimer */}
          <div className="mt-6 p-3.5 rounded-xl bg-white/70 border border-slate-200/60 flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 font-light leading-relaxed">
              <strong className="font-medium text-slate-700">Clinical Decision Support Advisory: </strong>
              This automated risk scoring is an algorithmic diagnostic adjunct based on multivariate Random Forest analysis of retrospective clinical cohorts. It does not constitute definitive medical diagnosis and must be evaluated alongside comprehensive physician examination, 12-lead ECG review, and clinical cardiology judgment.
            </p>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};
