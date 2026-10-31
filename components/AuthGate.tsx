"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { AuthScreen } from "@/components/AuthScreen";

export function AuthGate({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data, error }) => {
      setIsLoggedIn(!error && !!data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AuthScreen />;
  }

  return <>{children}</>;
}