import { getInterviewers } from "@/actions/explore";
import PageHeader from "@/components/reusable";
import ExploreGrid, { InterviewersResponse } from "./components/ExploreGrid";

export default async function ExplorePage() {
  const interviewers = await getInterviewers();

  console.log(interviewers);
  return (
    <main className="min-h-screen bg-black">
      {/* Page header */}
      <PageHeader
        label="Explore"
        gray="Find your"
        gold="expert interviewer"
        description="Browse senior engineers from top companies."
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 xl:px-0 py-10">
        <ExploreGrid interviewers={interviewers as InterviewersResponse} />
      </div>
    </main>
  );
}
