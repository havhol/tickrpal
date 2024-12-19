import { createClient } from "@/lib/supabase/server";

// Read this
// Maybe we can add this user to our types folder, so we can import elsewhere?
export type CustomUser = {
  email: string; // Always a string
  user_metadata?: {
    avatar_url?: string;
  };
} | null;

// src/lib/supabase/fetchUser.ts

export async function fetchUser() {
  const supabase = await createClient(); // Use server-side client
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    return {
      email: data.user.email || "", // Always return string
      user_metadata: data.user.user_metadata, // Include metadata
    };
  }

  return null;
}
