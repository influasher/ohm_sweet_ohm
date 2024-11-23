/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// Helper function to safely return error messages
async function handleAuthError(error: any) {
  // Create a sanitized error response that's safe to send to the client
  return {
    error: {
      message: error?.message || "An unexpected error occurred",
    },
  };
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // Return error instead of throwing
    return handleAuthError(error);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Validate password confirmation
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return handleAuthError({ message: "Passwords do not match" });
  }

  const data = {
    email: formData.get("email") as string,
    password: password,
    options: {
      data: {
        first_name: formData.get("firstName") as string,
        last_name: formData.get("lastName") as string,
        address: formData.get("address") as string,
        postcode: formData.get("postcode") as string,
        unit: formData.get("unit") as string,
        marketing_consent: formData.get("marketing_consent") === "true",
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return handleAuthError(error);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
