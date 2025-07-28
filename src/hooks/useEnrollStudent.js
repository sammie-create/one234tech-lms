import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";
import toast from "react-hot-toast";

//This hook is used to enroll a student to a course
function useEnrollStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ student_id, course_id }) => {
      const { error } = await supabase
        .from("enrollments")
        .insert({ student_id, course_id });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      // toast.success("Student enrolled!");
      queryClient.invalidateQueries(["admin-student-list"]);
    },
    onError: (err) => {
      toast.error(err.message || "Enrollment failed.");
    },
  });
}

export { useEnrollStudent };
