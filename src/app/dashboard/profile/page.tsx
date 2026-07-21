"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, refetch } = useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch full profile info (including bio, address, phone) on load
  useEffect(() => {
    async function fetchProfile() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/user/update");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setName(data.user.name || "");
            setPhone(data.user.phone || "");
            setBio(data.user.bio || "");
            setAddress(data.user.address || "");
          }
        } else {
          // Fallback to session user details
          if (user) {
            setName(user.name || "");
          }
        }
      } catch (err) {
        console.error("Failed to load profile details:", err);
        if (user) {
          setName(user.name || "");
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Full Name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          bio: bio.trim(),
          address: address.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Profile updated successfully!");
        // Trigger session refetch to update any client-side cached header/avatar/name details
        await refetch();
      } else {
        toast.error(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex max-w-3xl flex-col items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-[#002045]"></div>
        <p className="mt-4 font-medium text-gray-600">
          Loading profile details...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h2 className="mb-2 text-3xl font-bold text-gray-900">
        Profile Settings
      </h2>
      <p className="mb-8 text-gray-600">
        Manage your personal information and preferences.
      </p>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h3 className="mb-6 border-b border-gray-100 pb-4 text-xl font-bold text-gray-900">
          Personal Details
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Email cannot be changed.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1XXX-XXXXXX"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Account Role
              </label>
              <input
                type="text"
                value={
                  user?.role
                    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    : "Client"
                }
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Short Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a little about yourself or your business..."
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your physical address or location..."
              rows={2}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              isDisabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#002045] px-6 py-2 font-medium text-white transition-colors hover:bg-[#003066]"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
