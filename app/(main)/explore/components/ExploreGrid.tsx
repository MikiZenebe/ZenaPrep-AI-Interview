"use client";

import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/data";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import InterviewerCard from "./InterviewerCard";

type Availability = {
  endTime: Date;
  startTime: Date;
};

type Interviewer = {
  availabilities: Availability[];
  bio: string;
  categories: string[];
  company: string;
  creditRate: number;
  id: string;
  imageUrl: string;
  name: string;
  title: string;
  yearsExp: number;
};

export type InterviewersResponse = Interviewer[];

export default function ExploreGrid({
  interviewers,
}: {
  interviewers: InterviewersResponse;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return interviewers.filter((i) => {
      const matchesCategory =
        activeCategory === null || i.categories?.includes(activeCategory);

      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        i.name?.toLowerCase().includes(q) ||
        i.title?.toLowerCase().includes(q) ||
        i.company?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [interviewers, activeCategory, search]);

  return (
    <div className="flex flex-col gap-8">
      {/* Filters bar */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-600 pointer-events-none"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, title or company…"
            className="pl-9 bg-[#0f0f11] border-white/10 text-stone-100 placeholder:text-stone-600 text-sm"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.value;

            return (
              <button
                key={String(cat.value)}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`cursor-pointer text-xs px-4 py-2 rounded-lg border transition-all duration-200 ${
                  active
                    ? "border-[#3AE4B2]/40 bg-[#3AE4B2]/10 text-[#3AE4B2]"
                    : "border-white/10 text-stone-500 hover:border-white/20 hover:text-stone-400"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-stone-600">
        {filtered.length === 0
          ? "No interviewers found"
          : `${filtered.length} interviewer${
              filtered.length === 1 ? "" : "s"
            } found`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-stone-600 text-sm">
            No interviewers match your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory(null);
              setSearch("");
            }}
            className="text-xs text-[#3AE4B2] mt-2 hover:text-[#3AE4B2]/80 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((interviewer) => (
            <InterviewerCard key={interviewer.id} interviewer={interviewer} />
          ))}
        </div>
      )}
    </div>
  );
}
