"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@/utils/error"; // Adjust the import path based on where you created the file

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    throw new AuthError(error.message);
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
    throw new AuthError("Passwords do not match");
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
    console.log(error);
    throw new AuthError(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
