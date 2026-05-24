import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { checkUser } from "@/lib/check-user";
import { CalendarDays, Users } from "lucide-react";
import CreditButton from "./CreditButton";

export default async function Header() {
  const user = await checkUser();

  return (
    <nav className="fixed top-0 inset-x-0 flex items-center justify-between px-10 py-3 border-b border-white/7 backdrop-blur-xl z-30">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Prept Logo"
          width={200}
          height={200}
          className="h-20 w-auto mr-[-50px] "
        />
        <span className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#69E7A7]  to-[#16F8F9] mb-3">
          ዘና-Prep
        </span>
      </Link>

      {/* Sign in */}
      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button variant="ghost">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="green">Get Started &rarr;</Button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          {/* Links */}
          {user?.role === "INTERVIEWER" && (
            <Button variant="green" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}

          {user?.role === "INTERVIEWEE" && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/explore">
                  <Users size={16} />
                  <span className="hidden md:inline">Explore</span>
                </Link>
              </Button>
              <Button variant="green" asChild>
                <Link href="/appointments">
                  <CalendarDays size={16} />
                  <span className="hidden md:inline">My Appointments</span>
                </Link>
              </Button>
            </>
          )}

          {/* Credits */}
          <CreditButton
            role={user?.role === "INTERVIEWER" ? "INTERVIEWER" : "INTERVIEWEE"}
            credits={
              (user?.role === "INTERVIEWER"
                ? user?.creditBalance
                : user?.credits) ?? 0
            }
          />
          <UserButton />
        </Show>
      </div>
    </nav>
  );
}
