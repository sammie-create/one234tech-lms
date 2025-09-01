import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";

export function useAddCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { error } = await supabase.from("courses").insert(payload);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      // refresh course list
      queryClient.invalidateQueries(["all-courses"]);
    },
  });
}
