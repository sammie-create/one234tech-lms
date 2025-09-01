import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const { error } = await supabase
        .from("courses")
        .update(updates)
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-courses"]);
    },
  });
}
