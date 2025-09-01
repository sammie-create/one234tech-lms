import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabaseClient";
import toast from "react-hot-toast";

// Custom hook to fetch user profile data based on userID
// This hook uses React Query to manage the fetching and caching of user profile data
function useUserProfile(userID) {
  const {
    data: profile,
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

      // const signedProfilePictureUrl = await createSignedProfilePictureUrl(
      //   data.profile_picture_url,
      // );

      // return { ...data, signedProfilePictureUrl };
      return data;
    },
  });

  console.log("User Profile Data:", profile);

  return { profile, profileLoading, refetchProfile };
}

export { useUserProfile };
