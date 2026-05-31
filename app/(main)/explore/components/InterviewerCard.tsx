import React from "react";
import { InterviewersResponse } from "./ExploreGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABEL } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { formatTime } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InterviewerCard({
  interviewer,
}: {
  interviewer: InterviewersResponse[0];
}) {
  const {
    id,
    name,
    imageUrl,
    title,
    company,
    yearsExp,
    bio,
    categories,
    creditRate,
    availabilities,
  } = interviewer;

  const availability = availabilities?.[0];

  return (
    <Card className="relative border border-white/10 hover:border-[#3AE4B2]/20 bg-accent-foreground">
      <div className="absolute inset-0 bg-linear-to-br from-[#3AE4B2]/5 via-transparent to-transparent pointer-events-none" />

      <CardContent className="flex flex-col gap-5">
        {/* Top row — avatar + name + years */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-11 h-11 border border-white/10 shrink-0">
              <AvatarImage src={imageUrl ?? undefined} alt={name ?? undefined} />
              <AvatarFallback className="bg-[#3AE4B2]/10 border border-[#3AE4B2]/20 text-[#3AE4B2] text-sm font-medium">
                {name?.[0] ?? "?"}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium text-stone-200 leading-tight">
                {name}
              </p>
              {title && company && (
                <p className="text-xs text-stone-500 mt-0.5">
                  {title} · {company}
                </p>
              )}
            </div>
          </div>

          {yearsExp && (
            <Badge
              variant="outline"
              className="shrink-0 border-white/10 text-stone-500 text-xs"
            >
              {yearsExp}+ yrs
            </Badge>
          )}
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-xs text-stone-400 font-light leading-relaxed line-clamp-2">
            {bio}
          </p>
        )}

        {/* Categories */}
        {categories?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {categories.slice(0, 4).map((cat) => (
              <span
                key={cat}
                className="text-xs px-2.5 py-1 rounded-lg border border-[#3AE4B2]/20 bg-[#3AE4B2]/5 text-[#3AE4B2]"
              >
                {CATEGORY_LABEL[cat as keyof typeof CATEGORY_LABEL] ?? cat}
              </span>
            ))}
            {categories.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded-lg border border-[#3AE4B2]/20 bg-[#3AE4B2]/5 text-[#3AE4B2]">
                +{categories.length - 4} more
              </span>
            )}

            <Separator />

            {/* Bottom row — credit rate + availability + CTA */}
            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-serif leading-none bg-linear-to-br from-[#3AE4B2] to-[#45f6c1] bg-clip-text text-transparent">
                  {creditRate ?? 10}
                  <span className="text-xs text-stone-500 font-sans ml-1">
                    credits / session
                  </span>
                </p>
                {availability ? (
                  <p className="text-xs text-stone-600">
                    🟢 {formatTime({ date: availability.startTime as Date })} –{" "}
                    {formatTime({ date: availability.endTime as Date })}
                  </p>
                ) : (
                  <p className="text-xs text-stone-700">No availability set</p>
                )}
              </div>

              <Button
                size="sm"
                className="bg-green-500/50 border-green-400 text-green-100 hover:bg-green-500/70"
                asChild
              >
                <Link href={`/interviewers/${id}`}>View profile →</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
