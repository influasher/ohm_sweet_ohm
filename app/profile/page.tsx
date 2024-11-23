"use client";
import Topbar from "@/components/Topbar";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const client = createClient();
  // const [userProfile, setUserProfile] = useState({
  //   first_name: "",
  //   last_name: "",
  //   address: "",
  //   email: "",
  // });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

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
        if (userData) {
          const first_name = userData.first_name;
          const last_name = userData.last_name;
          const email = userData.email;
          const address = userData.address;

          setFirstName(first_name);
          setLastName(last_name);
          setAddress(address);
          setEmail(email);

          // setUserProfile({
          //   first_name: first_name,
          //   last_name: userData.last_name,
          //   email: usuerData
          // });
          setFormData({
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            email: response.data.user?.email || "",
            address: userData.address || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [client]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setFirstName(formData.first_name);
      setLastName(formData.last_name);
      setAddress(formData.address);

      // setUserProfile({
      //   ...userProfile,
      //   first_name: formData.first_name,
      //   last_name: formData.last_name,
      //   address: formData.address, // Added address field
      // });
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
                    {/* {userProfile
                      ? `${userProfile.first_name} ${userProfile.last_name}`
                      : ""} */}
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-600 mt-2">{email}</p>
                  <p className="text-gray-600 mt-2">
                    {address || "No address provided"}
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className={styles.editButton}
                  >
                    Edit Profile
                  </button>
                  <button
                    className={styles.surveyButton}
                    onClick={() => {
                      router.push("https://forms.gle/q7LsGqKDJuU22un19");
                    }}
                  >
                    {" "}
                    Fill Up Survey
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
                      rows={3}
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
