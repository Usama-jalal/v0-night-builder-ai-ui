export const dynamic = "force-dynamic";
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import { DashboardNavbar } from "@/components/dashboard-navbar";
import { DashboardContent } from "@/components/dashboard-content";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/login");
      }
    };

    checkUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardNavbar />
      <DashboardContent />
    </div>
  );
}
