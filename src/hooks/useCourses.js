import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabaseClient";

// This hook fetches the courses a user is enrolled in

function useCourses(userId) {
  return useQuery({
    queryKey: ["myCourses", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select(
          "course_id, courses ( id, title, cover_image, description, modules (lessons (id))), progress",
        )
        .eq("student_id", userId);

      if (error) throw error;

      // Flatten the nested courses
      return data?.map((enrollment) => {
        const course = enrollment.courses || {};
        const modules = course.modules || [];
        const allLessons = modules.flatMap((mod) => mod.lessons || {});

        return {
          course_id: enrollment.course_id,
          title: course.title || "Untitled Course",
          description: course.description,
          cover_image: course.cover_image,
          progress: enrollment.progress,
          totalLessons: allLessons.length,
        };
      });
    },
    enabled: !!userId,
  });
}

export { useCourses };
