import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { MODULES } from '@/lib/flatwiseData';
import TheoryPill from '@/components/ui/TheoryPill';

export default function ModuleIntro() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return <p className="text-center py-20 text-gray-500">Module not found</p>;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="rounded-2xl bg-[#1B4332] p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">{mod.icon}</span>
          <div>
            <h1 className="text-xl font-bold text-white">{mod.title}</h1>
            <p className="text-xs text-white/80 mt-0.5">{mod.subtitle}</p>
          </div>
        </div>
        {/* Theory pills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {mod.theories.map((t, i) => (
            <TheoryPill key={i} label={t.label} color={t.color} text={t.text} />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-sm text-gray-700 leading-relaxed">{mod.description}</p>
      </div>

      {/* What you'll do */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">What you'll do</p>
        <ul className="space-y-2">
          {mod.outcomes.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
              <span className="w-5 h-5 rounded-full bg-[#D1FAE5] text-[#1B4332] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
              {o}
            </li>
          ))}
        </ul>
      </div>

      {/* Scaffolding / ZPD note */}
      {mod.zpdNote && (
        <div className="border-l-4 border-[#1B4332] bg-[#EEF5F0] rounded-r-2xl p-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#1B4332] mb-1">Vygotsky's ZPD in action</p>
              <p className="text-xs text-gray-600 italic">{mod.zpdNote}</p>
            </div>
          </div>
        </div>
      )}

      {/* Scaffolding status */}
      <div className="bg-white rounded-2xl p-3 shadow-sm flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
          mod.scaffolding === 'full' ? 'bg-green-400' :
          mod.scaffolding === 'request' ? 'bg-yellow-400' : 'bg-gray-300'
        }`} />
        <span className="text-xs text-gray-600">
          {mod.scaffolding === 'full' ? 'Scaffolding: ON — hints visible throughout' :
           mod.scaffolding === 'request' ? 'Scaffolding: Hint available on request' :
           'Scaffolding: OFF — no hints (Tier 3)'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Link to="/curriculum" className="flex-1">
          <button className="w-full h-12 rounded-2xl border-2 border-[#1B4332] text-[#1B4332] font-semibold text-sm flex items-center justify-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </Link>
        <button
          onClick={() => navigate(`/module/${moduleId}/kolb`)}
          className="flex-2 flex-1 h-12 rounded-2xl bg-[#1B4332] text-white font-semibold text-sm"
        >
          Start activity →
        </button>
      </div>
    </div>
  );
}