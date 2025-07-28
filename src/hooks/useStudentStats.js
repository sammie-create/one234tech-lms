import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabaseClient";
import { useAuthContext } from "../contexts/AuthContext";
import { useCourses } from "./useCourses";

function useStudentStats() {
  const { user } = useAuthContext();

  // Get courses with progress and course title
  const { data: courses, isLoading: coursesLoading } = useCourses(user?.id);

  // Get overall progress from profile
  const { data: overallProgress, isLoading: overallLoading } = useQuery({
    queryKey: ["overallProgress", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("overall_progress")
        .eq("id", user.id)
        .single();

      if (error) throw new Error(error.message);
      return data?.overall_progress || 0;
    },
    enabled: !!user,
  });

  //
  // const { data: courses, isLoading: coursesLoading } = useQuery({
  //   queryKey: ["enrolledCoursesWithTitles", user?.id],
  //   queryFn: async () => {
  //     const { data, error } = await supabase
  //       .from("enrollments")
  //       .select("progress, course_id, courses(title, modules(lessons (id)))")
  //       .eq("student_id", user.id);

  // console.log("Fetched courses:", data);

  // if (error) throw new Error(error.message);

  // // Normalize course title
  // return data.map((item) => {
  //   const modules = item.courses?.modules || [];
  //   const allLessons = modules.flatMap((mod) => mod.lessons || []);
  //   return {
  //     course_id: item.course_id,
  //     progress: item.progress,
  //     title: item.courses?.title || "Untitled Course",
  //     totalLessons: allLessons.length,
  //   };
  // });
  // },
  // enabled: !!user,
  // });

  const coursesCompleted =
    courses?.filter((c) => c.progress === 100).length || 0;

  return {
    overallProgress,
    overallLoading,
    coursesCompleted,
    coursesLoading,
    courseProgresses: courses || [],
  };
}

export { useStudentStats };
