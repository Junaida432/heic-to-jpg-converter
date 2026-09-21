import React from 'react';
import { Smartphone, Check } from 'lucide-react';
import { SupportedLang } from '../types';
import { getHowTo } from '../i18n';

interface HowToGuideProps {
  currentLang?: SupportedLang;
}

interface GuideContent {
  title: string;
  sub: string;
  steps: {
    title: string;
    desc: string;
    badge: string;
  }[];
  tipTitle: string;
  tipText: string;
}

export const HowToGuide: React.FC<HowToGuideProps> = ({ currentLang = 'en' }) => {
  const guide = getHowTo(currentLang);

  return (
    <section className="mt-14 sm:mt-20 max-w-4xl mx-auto" id="how-to-convert-guide">
      {/* 3 Step Process */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {guide.title}
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
          {guide.sub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {guide.steps.map((step, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs flex items-center justify-center mb-4 shadow-2xs">
              0{idx + 1}
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed flex-1">{step.desc}</p>
            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{step.badge}</span>
            </div>
          </div>
        ))}
      </div>

      {/* iPhone Camera Setting Tip - Clean Modern Callout */}
      <div className="mt-6 p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-4 shadow-2xs">
        <div className="w-10 h-10 rounded-xl bg-blue-100/80 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
          <Smartphone className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-900">{guide.tipTitle}</h4>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{guide.tipText}</p>
        </div>
      </div>
    </section>
  );
};
