"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import CenteredContent from "@/components/CenteredContent";
import { Spinner } from "@radix-ui/themes";

interface WithLoadingProps {
  user: User;
}

const withLoading = <P extends WithLoadingProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function WithLoadingWrapper(props: Omit<P, "user">) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    console.log("i am running");

    useEffect(() => {
      const fetchSession = async () => {
        // Simulate delay for testing purposes
        await new Promise((resolve) => setTimeout(resolve, 4000));

        const { data } = await supabase.auth.getSession();

        if (!data?.session) {
          router.push("/auth/signin"); // Redirect unauthenticated users
        } else {
          setUser(data.session.user);
        }

        setLoading(false);
      };

      fetchSession();
    }, [router]);

    if (loading) {
      return (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
          }}
        >
          <CenteredContent>
            <Spinner size="3" />
          </CenteredContent>
        </div>
      );
    }

    if (!user) {
      return null; // Prevent rendering if no user is available
    }

    return <WrappedComponent {...(props as P)} user={user} />;
  };
};

export default withLoading;
