"use client";

import { supabase } from "@/lib/supabaseClient";
import { Flex, Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  email: string;
};

const withLoading = (WrappedComponent: React.ComponentType<{ user: User }>) => {
  return function WithLoadingWrapper() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
      const fetchSession = async () => {
        const { data } = await supabase.auth.getSession();

        if (!data?.session) {
          router.replace("/signin"); // Replace avoids pushing a new history entry
        } else {
          setUser(data.session.user as User);
        }
        setLoading(false);
      };

      fetchSession();
    }, [router]);

    if (loading) {
      // Show loader while checking session
      return (
        <Flex
          align="center"
          justify="center"
          style={{ height: "100vh", width: "100vw" }}
        >
          <Spinner size="3" />
        </Flex>
      );
    }

    if (!user) {
      // Prevent showing content while redirecting
      return null;
    }

    // Render the component only when user is authenticated
    return <WrappedComponent user={user} />;
  };
};

export default withLoading;
