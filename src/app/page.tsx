"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Code2,
  Target,
  Layers,
  ArrowRight,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { generateProjectIdeas, ProjectIdea } from "./actions";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper for class merging
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ProjectIdea[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    difficulty: "Beginner",
    targetGroup: "",
    niche: "",
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.targetGroup || !formData.niche) return;

    setLoading(true);
    setError(null);
    setIdeas(null);

    const result = await generateProjectIdeas(
      formData.difficulty,
      formData.targetGroup,
      formData.niche
    );

    if (result.success && result.data) {
      setIdeas(result.data);
    } else {
      setError(result.error || "Something went wrong");
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <main className="min-h-screen p-6 md:p-24 max-w-7xl mx-auto flex flex-col items-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-slate-700 text-sm text-primary mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Gemini AI</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400">
          PRO-HELPER
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          Don't know what to build? Generate personalized project ideas tailored
          to your skill level and interests.
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleGenerate}
        className="w-full max-w-4xl bg-surface/50 backdrop-blur-lg border border-slate-700 p-8 rounded-2xl shadow-2xl grid md:grid-cols-3 gap-6 mb-16 relative overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Layers className="w-4 h-4 text-primary" /> Difficulty
          </label>
          <select
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
            value={formData.difficulty}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: e.target.value })
            }
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Target className="w-4 h-4 text-secondary" /> Target Group
          </label>
          <input
            type="text"
            placeholder="e.g. Students, Gamers..."
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-secondary outline-none transition-all"
            value={formData.targetGroup}
            onChange={(e) =>
              setFormData({ ...formData, targetGroup: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Code2 className="w-4 h-4 text-accent" /> Tech Niche
          </label>
          <input
            type="text"
            placeholder="e.g. FinTech, AI..."
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
            value={formData.niche}
            onChange={(e) =>
              setFormData({ ...formData, niche: e.target.value })
            }
          />
        </div>

        <div className="md:col-span-3 pt-4">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Generating Ideas...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate Project Ideas
              </>
            )}
          </button>
        </div>
      </motion.form>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 mb-8">
          {error}
        </div>
      )}

      {/* Results Grid */}
      {ideas && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {ideas.map((idea, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface border border-slate-700 rounded-2xl p-6 hover:border-slate-500 transition-all flex flex-col h-full group relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-900 rounded-lg">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(JSON.stringify(idea, null, 2), index)
                  }
                  className="text-slate-500 hover:text-white transition-colors"
                  title="Copy Idea"
                >
                  {copiedIndex === index ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {idea.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4 flex-grow">
                {idea.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Key Features
                  </h4>
                  <ul className="space-y-1">
                    {idea.key_features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-sm text-slate-300 flex items-start gap-2"
                      >
                        <ArrowRight className="w-3 h-3 mt-1 text-secondary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {idea.suggested_tech_stack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
