import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabaseClient";
import toast from "react-hot-toast";

// Helper function to create a signed URL for the profile image
// This function generates a signed URL for the profile image stored in Supabase
// async function createSignedAvatarUrl(imagePath) {
//   if (!imagePath) return null;

//   const { data, error } = await supabase.storage
//     .from("profile-images")
//     .createSignedUrl(imagePath, 60 * 60);

//   if (error) {
//     toast.error("Failed to load profile image");
//     throw new Error(error.message);
//   }

//   return data?.signedUrl;
// }

// function getPublicAvatarUrl(imagePath) {
//   if (!imagePath) return null;
//   return `${supabase.storageUrl}/object/public/profile-avatars/${imagePath}`;
// }

// Custom hook to fetch user profile data based on userID
// This hook uses React Query to manage the fetching and caching of user profile data
function useUserProfile(userID) {
  const {
    data: studentProfile,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["user-profile", userID],
    enabled: !!userID,
    queryFn: async function () {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userID)
        .single();

      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }

      // const signedAvatarUrl = createSignedAvatarUrl(data.profile_picture_url);

      // return { ...data, signedAvatarUrl };
      return data;
    },
  });

  console.log("User Profile Data:", studentProfile);

  return { studentProfile, profileLoading, refetchProfile };
}

export { useUserProfile };
