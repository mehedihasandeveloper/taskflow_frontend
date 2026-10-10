"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { generateProjectSummary, ProjectSummary as SummaryType } from "@/lib/aiApi";
import { ApiRequestError } from "@/lib/api";

export default function ProjectSummary({ projectId }: { projectId: string }) {
  const [summary, setSummary] = useState<SummaryType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");
    try {
      const data = await generateProjectSummary(projectId);
      setSummary(data);
    } catch (e) {
      setError(e instanceof ApiRequestError ? e.message : "Failed to generate summary");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">AI Project Summary</h3>
          <p className="text-xs text-slate-500">Get an intelligent overview of this project</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Generating…
            </>
          ) : (
            <>
              <Sparkles size={14} /> Generate Summary
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}

      {summary && (
        <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm leading-relaxed text-slate-700">{summary.summary}</p>
            <span className="ml-4 shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              {summary.progress_percentage}% done
            </span>
          </div>

          <div>
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Key Insights
            </h4>
            <ul className="space-y-1 text-sm text-slate-600">
              {summary.key_insights.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-500">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recommendations
            </h4>
            <ul className="space-y-1 text-sm text-slate-600">
              {summary.recommendations.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-500">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}