"use server";

export interface ProjectIdea {
  title: string;
  description: string;
  key_features: string[];
  suggested_tech_stack: string[];
}

export async function generateProjectIdeas(
  difficulty: string,
  targetGroup: string,
  niche: string
) {
  // Simulate AI delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    data: [
      {
        title: "Example Project: AI Budget Tracker",
        description: `A smart budget tracker for ${targetGroup} interested in ${niche}.`,
        key_features: ["Real-time tracking", "AI Insights", "Visual Charts"],
        suggested_tech_stack: ["Next.js", "Tailwind", "Supabase"],
      },
    ] as ProjectIdea[],
  };
}
