"use client";
import Topbar from "@/components/Topbar";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import styles from "./profile.module.css";

const ProfilePage = () => {
  const client = createClient();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "", // Added address field
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await client.auth.getUser();
        const userData = response.data.user?.user_metadata;
        setUserProfile(userData);
        setFormData({
          first_name: userData?.first_name || "",
          last_name: userData?.last_name || "",
          email: response.data.user?.email || "",
          address: userData?.address || "", // Added address field
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [client]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await client.auth.updateUser({
        email: formData.email,
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          address: formData.address, // Added address field
        },
      });

      if (error) throw error;

      setUserProfile({
        ...userProfile,
        first_name: formData.first_name,
        last_name: formData.last_name,
        address: formData.address, // Added address field
      });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

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
            <div className="px-6 py-4">
              {!isEditing ? (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {userProfile
                      ? `${userProfile.first_name} ${userProfile.last_name}`
                      : ""}
                  </h2>
                  <p className="text-gray-600 mt-2">{formData.email}</p>
                  <p className="text-gray-600 mt-2">
                    {formData.address || "No address provided"}
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className={styles.editButton}
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button type="submit" className={styles.editButton}>
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className={styles.editButton}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
