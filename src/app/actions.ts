"use server";

// We comment out the AI import so it doesn't even try to connect
// import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ProjectIdea {
  title: string;
  description: string;
  key_features: string[];
  suggested_tech_stack: string[];
}

// PERMANENT BACKUP DATA (Offline Mode)
const MOCK_IDEAS: ProjectIdea[] = [
  {
    title: "EcoTrack: Personal Carbon Footprint Monitor",
    description:
      "A visually engaging dashboard that helps users track their daily carbon footprint based on transportation, diet, and energy usage. It uses gamification to encourage eco-friendly habits.",
    key_features: [
      "Real-time carbon calculator",
      "Daily/Weekly progress charts",
      "Social sharing achievements",
      "Eco-friendly tips engine",
    ],
    suggested_tech_stack: ["Next.js", "Recharts", "Tailwind CSS", "Supabase"],
  },
  {
    title: "SmartSpend: Budget Tracker for Students",
    description:
      "A simplified finance tracker designed specifically for students to manage loans, part-time income, and daily expenses. Focuses on mobile-first design and quick entry.",
    key_features: [
      "SMS expense parsing (simulated)",
      "Savings goal visualizer",
      "Monthly budget alerts",
      "Category-wise breakdown",
    ],
    suggested_tech_stack: ["React", "Firebase", "Framer Motion", "PWA"],
  },
  {
    title: "DevPortfolio: AI Resume Builder",
    description:
      "An automated portfolio generator that takes a developer's GitHub username and builds a stunning personal website highlighting their top repositories and languages.",
    key_features: [
      "GitHub API integration",
      "One-click deploy to Vercel",
      "Customizable themes",
      "PDF Resume export",
    ],
    suggested_tech_stack: ["Next.js", "GitHub API", "Puppeteer", "Vercel SDK"],
  },
];

export async function generateProjectIdeas(
  difficulty: string,
  targetGroup: string,
  niche: string
) {
  // Simulate a short delay so it feels like it's "thinking"
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log(
    `Generating offline ideas for: ${difficulty}, ${targetGroup}, ${niche}`
  );

  // Return success immediately with mock data
  return { success: true, data: MOCK_IDEAS };
}
