import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabaseClient";

function useSignedVideoUrl(videoPath) {
  return useQuery({
    queryKey: ["signedVideoUrl", videoPath],
    enabled: !!videoPath, // only run if path is available
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from("product-marketing-videos")
        .createSignedUrl(videoPath, 3600); // 1-hour expiry

      console.log(typeof videoPath);

      if (error) {
        console.log(error.message);
        throw error;
      }
      return data?.signedUrl;
    },
  });
}

export { useSignedVideoUrl };
