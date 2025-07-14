import { useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../integrations/supabaseClient";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

function useLessonProgress({ lessonId, courseId, modules }) {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  // Flatten all lessons from all modules
  const allLessons = useMemo(
    () => modules?.flatMap((mod) => mod.lessons || []),
    [modules],
  );

  const currentLesson = useMemo(
    () => allLessons?.find((lesson) => lesson.id === lessonId),
    [allLessons, lessonId],
  );

  const currentIndex = allLessons?.findIndex(
    (lesson) => lesson.id === lessonId,
  );

  const nextLesson = currentIndex >= 0 ? allLessons[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  // Get all completed lessons for this course
  const { data: completedLessonIds = [], isLoading: completedLoading } =
    useQuery({
      queryKey: ["completedLessons", user?.id, courseId],
      queryFn: async () => {
        if (!user || !allLessons.length) return [];
        const { data } = await supabase
          .from("completed_lessons")
          .select("lesson_id")
          .eq("student_id", user.id)
          .in(
            "lesson_id",
            allLessons.map((l) => l.id),
          );
        return data?.map((row) => row.lesson_id) || [];
      },
      enabled: !!user && allLessons && !!allLessons.length,
    });

  // Determine if the current lesson is completed
  const isCompleted = useMemo(() => {
    return completedLessonIds.includes(lessonId);
  }, [completedLessonIds, lessonId]);

  // Get current course progress
  const { data: progress = 0, isLoading: progressLoading } = useQuery({
    queryKey: ["courseProgress", user?.id, courseId],
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("progress")
        .eq("student_id", user.id)
        .eq("course_id", courseId)
        .maybeSingle();
      return data?.progress || 0;
    },
    enabled: !!user?.id && !!courseId,
  });

  // Mutation: Mark lesson as complete and recalculate progress
  const { mutateAsync: handleMarkComplete, isPending: marking } = useMutation({
    mutationFn: async () => {
      if (isCompleted || !user || !currentLesson) return;

      // 1. Insert completed lesson
      const { error: insertError } = await supabase
        .from("completed_lessons")
        .insert({
          student_id: user.id,
          lesson_id: lessonId,
        });

      if (insertError) throw new Error("Failed to mark lesson complete");

      // Re-fetch completed lessons to get accurate count
      const { data: refreshedCompleted } = await supabase
        .from("completed_lessons")
        .select("lesson_id")
        .eq("student_id", user.id)
        .in(
          "lesson_id",
          allLessons.map((l) => l.id),
        );

      const completedIds =
        refreshedCompleted?.map((row) => row.lesson_id) || [];

      console.log(completedIds);

      console.log(
        "All lessons:",
        allLessons.map((l) => l.id),
      );
      console.log("Checking completed for:", user.id, courseId);
      console.log("Refetching completed lessons...");

      console.log("Refreshed Completed:", refreshedCompleted);

      // Recalculate progress
      const totalLessons = allLessons.length;
      const newProgress = Math.floor(
        (completedIds.length / totalLessons) * 100,
      );

      const { data: updatedEnrollment, error: updateError } = await supabase
        .from("enrollments")
        .update({ progress: newProgress })
        .eq("student_id", user.id)
        .eq("course_id", courseId)
        .select();

      await updateOverallProgress(user.id);

      console.log("🧪 Updated enrollment:", updatedEnrollment);

      if (updateError) throw new Error("Failed to update progress");

      return { newProgress, completedIds };
    },
    onSuccess: ({ newProgress, completedIds }) => {
      toast.success("Lesson marked as completed!");

      queryClient.setQueryData(
        ["completedLessons", user?.id, courseId],
        completedIds,
      );

      queryClient.setQueryData(
        ["courseProgress", user?.id, courseId],
        newProgress,
      );

      // Force refetch just in case
      queryClient.invalidateQueries(["completedLessons", user?.id, courseId]);

      queryClient.invalidateQueries(["courseProgress", user?.id, courseId]);
    },

    onError: (error) => {
      console.error("Error marking lesson complete:", error.message);
      toast.error("Failed to mark lesson as completed.");
    },
  });

  // Update overall progress after marking a lesson complete
  async function updateOverallProgress(studentId) {
    const { data: enrollments, error } = await supabase
      .from("enrollments")
      .select("progress")
      .eq("student_id", studentId);

    if (error) {
      console.error("Failed to fetch enrollments:", error.message);
      return;
    }

    if (!enrollments || enrollments.length === 0) return;

    const total = enrollments.reduce((sum, e) => sum + (e.progress || 0), 0);
    const average = Math.floor(total / enrollments.length);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ overall_progress: average })
      .eq("id", studentId);

    if (updateError) {
      console.error("Failed to update overall progress:", updateError.message);
    } else {
      console.log("✅ Overall progress updated to", average);
    }
  }

  useEffect(() => {
    console.log("LessonId:", lessonId);
    console.log("AllLessons:", allLessons);
    console.log("CompletedLessonIds:", completedLessonIds);
    console.log("IsCompleted:", isCompleted);
    console.log("Progress:", progress);
  }, [lessonId, allLessons, completedLessonIds, isCompleted, progress]);

  return {
    currentLesson,
    allLessons,
    isCompleted,
    completedLoading,
    progress,
    progressLoading,
    handleMarkComplete,
    marking,
    nextLesson,
    prevLesson,
  };
}

export { useLessonProgress };
