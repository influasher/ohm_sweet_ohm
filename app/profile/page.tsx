"use client";
import Topbar from "@/components/Topbar";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const client = createClient();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await client.auth.getUser();
        setUser(user);
        await fetchUserProfile(user.id);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async (userId) => {
      try {
        const { data, error } = await client
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
        } else {
          setUserProfile(data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, [client]);

  return (
    <div className="bg-white min-h-screen font-Montserrat">
      <Topbar />

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto py-10 px-6 sm:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 text-center">
              {/* Display Full Name */}
              <h2 className="text-2xl font-bold text-gray-800">
                {userProfile
                  ? `${userProfile.first_name} ${userProfile.last_name}`
                  : ""}
              </h2>

              {/* Display Email */}
              <p className="text-gray-600">
                {userProfile?.email || user?.email || "No email available"}
              </p>

              {/* Display User ID */}
              <p className="text-gray-600">
                {userProfile?.id || "No ID available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
