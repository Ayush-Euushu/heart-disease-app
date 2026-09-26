'use client';

import React, { useEffect, useState } from 'react';
import { Activity, Heart, ShieldCheck, Wifi, WifiOff } from 'lucide-react';

interface HeaderProps {
  onOpenGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGuide }) => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
        const res = await fetch(`${API_URL}/health`, { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'healthy') {
            setBackendStatus('online');
            return;
          }
        }
        setBackendStatus('offline');
      } catch {
        setBackendStatus('offline');
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-rose-200">
            <Heart className="w-5 h-5 fill-white/30 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">Cardio<span className="text-rose-600">Scan</span></span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-slate-200">AI Clinical</span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Cardiovascular Risk Intelligence & Predictive Analytics</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Backend Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs">
            {backendStatus === 'online' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-medium text-emerald-700 flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5" /> API Connected
                </span>
              </>
            ) : backendStatus === 'checking' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="font-medium text-amber-700">Connecting...</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="font-medium text-rose-700 flex items-center gap-1">
                  <WifiOff className="w-3.5 h-3.5" /> Backend Offline
                </span>
              </>
            )}
          </div>

          {onOpenGuide && (
            <button
              onClick={onOpenGuide}
              className="text-xs font-semibold text-slate-700 hover:text-rose-600 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 transition shadow-sm"
            >
              Clinical Metrics Guide
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
