import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";

function useStudentCourses(studentId) {
  return useQuery({
    queryKey: ["student-courses", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("course_id, progress, courses(title)")
        .eq("student_id", studentId);

      if (error) throw error;

      return data.map((e) => ({
        course_id: e.course_id,
        title: e.courses?.title || "Untitled",
        progress: e.progress,
      }));
    },
    enabled: !!studentId,
  });
}

export { useStudentCourses };
