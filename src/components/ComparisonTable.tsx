import React from 'react';
import { RouteSeoConfig, SupportedLang } from '../types';
import { getUi } from '../i18n';

interface ComparisonTableProps {
  config: RouteSeoConfig;
  currentLang?: SupportedLang;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ config, currentLang = 'en' }) => {
  const ui = getUi(currentLang);
  const tableRows = config.tableData || [];

  return (
    <section className="mt-14 sm:mt-20 max-w-4xl mx-auto" id="format-comparison-section">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {ui.comparisonTitle}
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
          {ui.comparisonSub}
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm text-slate-700">
          <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">{ui.tableHeaders.format}</th>
              <th className="py-3.5 px-4">{ui.tableHeaders.compression}</th>
              <th className="py-3.5 px-4">{ui.tableHeaders.transparency}</th>
              <th className="py-3.5 px-4">{ui.tableHeaders.compatibility}</th>
              <th className="py-3.5 px-4">{ui.tableHeaders.bestFor}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tableRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  {row.formatName}
                </td>
                <td className="py-3.5 px-4 text-slate-600">{row.compression}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      row.transparency.includes('Yes') ||
                      row.transparency.includes('Supported') ||
                      row.transparency.includes('完美支持') ||
                      row.transparency.includes('Oui') ||
                      row.transparency.includes('Sí') ||
                      row.transparency.includes('Ja') ||
                      row.transparency.includes('Да') ||
                      row.transparency.includes('نعم')
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'text-slate-400 font-normal'
                    }`}
                  >
                    {row.transparency}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600">{row.compatibility}</td>
                <td className="py-3.5 px-4 text-blue-600 font-semibold">{row.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
