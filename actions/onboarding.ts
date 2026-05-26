"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

interface OnboardingData {
  role: "INTERVIEWEE" | "INTERVIEWER";
  title: string;
  company: string;
  yearsExp: number;
  bio: string;
  categories: string[];
}

export const completeOnboarding = async (data: OnboardingData) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { role, title, company, yearsExp, bio, categories } = data;

  if (!role || !["INTERVIEWEE", "INTERVIEWER"].includes(role)) {
    throw new Error("Invalid role");
  }

  if (role === "INTERVIEWER") {
    if (!title || !company || !yearsExp || !bio || !categories?.length) {
      throw new Error("Please fill in all required fields");
    }
  }

  try {
    await db.user.update({
      where: { clerkUserId: user.id },
      data: {
        role,
        ...(role === "INTERVIEWER" && {
          title,
          company,
          yearsExp,
          bio,
          categories,
        }),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Onboarding error:", error);
    throw new Error("Something went wrong. Please try again.");
  }
};
