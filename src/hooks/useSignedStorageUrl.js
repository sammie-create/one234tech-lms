import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabaseClient";
import toast from "react-hot-toast";

/**
 * Reusable hook to generate a signed URL for any Supabase Storage object.
 * @param {string} bucketName - The name of the storage bucket
 * @param {string} filePath - The path to the file inside the bucket
 * @param {number} expiresIn - Expiry time in seconds (default: 1 hour)
 */
function useSignedStorageUrl(bucketName, filePath, expiresIn = 3600) {
  return useQuery({
    queryKey: ["signedUrl", bucketName, filePath],
    enabled: !!bucketName && !!filePath,
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(filePath, expiresIn);

      if (error) {
        toast.error("Failed to fetch signed URL");
        throw new Error(error.message);
      }

      return data?.signedUrl;
    },
  });
}

export { useSignedStorageUrl };
