import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";
import toast from "react-hot-toast";

function useUnenrollStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ student_id, course_id }) => {
      const { error } = await supabase
        .from("enrollments")
        .delete()
        .match({ student_id, course_id });

      if (error) throw new Error("Failed to unenroll student.");
    },
    onSuccess: () => {
      toast.success("Student unenrolled successfully.");
      queryClient.invalidateQueries({ queryKey: ["admin-student-list"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}

export { useUnenrollStudent };
