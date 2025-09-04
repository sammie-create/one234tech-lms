import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCourseModules } from "@/hooks/useCourseModules";
import { useLessonProgress } from "@/hooks/useLessonProgress";

function CourseSidebar() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { data: modules } = useCourseModules(courseId);
  const [showSidebar, setShowSidebar] = useState(false);
  const [openModules, setOpenModules] = useState({});

  const {
    allLessons,
    // isCompleted,
    // completionLoading,
    // progress,
    // progressLoading,
    // currentLesson,
    // nextLesson,
    // prevLesson,
  } = useLessonProgress({ lessonId, courseId, modules });

  useEffect(() => {
    if (!modules) return;

    const currentLessonId = parseInt(lessonId);
    const moduleWithCurrentLesson = modules.find((mod) =>
      mod.lessons?.some((lesson) => lesson.id === currentLessonId),
    );

    if (moduleWithCurrentLesson) {
      setOpenModules((prev) => ({
        ...prev,
        [moduleWithCurrentLesson.id]: true,
      }));
    }
  }, [modules, lessonId]);

  const toggleModule = (moduleId) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const completedLessonIds = allLessons
    ?.filter((l) => l && l.id && l.completed)
    .map((l) => l.id);

  return (
    <div className="relative">
      {/* Mobile toggle button */}
      <button
        className="mb-2 text-xs text-emerald-600 underline lg:hidden"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? "Hide Course Menu" : "Show Course Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`transform transition-all duration-500 ease-in-out ${
          showSidebar
            ? "translate-x-0 opacity-100"
            : "absolute z-50 -translate-x-full bg-white opacity-0"
        } max-h-[85vh] overflow-y-auto bg-white lg:relative lg:translate-x-0 lg:border-r lg:pr-4 lg:opacity-100`}
      >
        <h2 className="mb-4 font-semibold">Course Content</h2>
        <div className="space-y-4">
          {modules?.map((mod) => {
            let canAccessNext = true;
            return (
              <div key={mod.id}>
                <button
                  className="flex w-full items-center justify-between text-left font-medium text-gray-700"
                  onClick={() => toggleModule(mod.id)}
                >
                  {mod.title}
                  <span>{openModules[mod.id] ? "−" : "+"}</span>
                </button>

                {openModules[mod.id] && (
                  <ul className="mt-2 ml-3 space-y-1 transition-all duration-300 ease-in-out">
                    {mod.lessons?.map((lesson) => {
                      const isCurrent = String(lesson.id) === lessonId;
                      const isDone = completedLessonIds?.includes(lesson.id);

                      if (!isDone && canAccessNext) canAccessNext = false;
                      const isLocked = !isDone && !canAccessNext;

                      return (
                        <li key={lesson.id}>
                          <button
                            onClick={() =>
                              !isLocked &&
                              navigate(
                                `/my-courses/${courseId}/lesson/${lesson.id}`,
                              )
                            }
                            disabled={isLocked}
                            className={`w-full rounded px-2 py-1 text-left text-sm transition ${
                              isCurrent
                                ? "bg-emerald-100 font-semibold"
                                : isLocked
                                  ? "cursor-not-allowed text-gray-400"
                                  : "hover:bg-gray-100"
                            }`}
                          >
                            {lesson.title}
                            {isDone ? (
                              <span className="ml-1 text-emerald-600">✔</span>
                            ) : isLocked ? (
                              <span className="ml-1 text-gray-400">🔒</span>
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CourseSidebar;
