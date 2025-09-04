import { useParams, Link } from "react-router-dom";
import { useCourseModules } from "@/hooks/useCourseModules";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import Loader from "@/ui/Loader";
import { useAuthContext } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import LessonList from "./LessonList";

function LessonViewer() {
  const { courseId, lessonId } = useParams();
  const { user, authLoading } = useAuthContext();

  // Get modules and lessons in course
  const { data: modules, isLoading: modulesLoading } =
    useCourseModules(courseId);

  const {
    currentLesson,
    isCompleted,
    progress,
    handleMarkComplete,
    marking,
    nextLesson,
    prevLesson,
    completedLoading,
  } = useLessonProgress({ lessonId, courseId, modules });

  const loading =
    modulesLoading ||
    authLoading ||
    !user ||
    !currentLesson ||
    completedLoading;

  if (loading) return <Loader />;

  console.log(currentLesson);

  return (
    <div className="flex">
      <LessonList
        modules={modules}
        currentLessonId={lessonId}
        courseId={courseId}
      />

      <div className="flex-1 p-3">
        {/* Lesson Title & Content */}
        <h1 className="mb-2 text-2xl font-bold">{currentLesson.title}</h1>
        {currentLesson.description && (
          <p className="mb-4 whitespace-pre-line text-gray-600">
            {currentLesson.description}
          </p>
        )}

        {/* Video Viewer */}
        {currentLesson.video_url && (
          <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg shadow">
            <ReactPlayer
              src={currentLesson.video_url}
              playing={true}
              muted={true}
              controls
              width="100%"
              height="100%"
              onError={() =>
                toast.error("Error loading video. Please check the link.")
              }
            />
          </div>
        )}

        {/* Resource Link */}
        {currentLesson.resource_url && (
          <div className="mb-4">
            <a
              href={currentLesson.resource_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              View Resource
            </a>
          </div>
        )}

        {/* Mark Complete */}
        <button
          onClick={handleMarkComplete}
          disabled={isCompleted || marking}
          className={`rounded-md px-4 py-2 font-semibold text-white ${
            isCompleted
              ? "cursor-not-allowed bg-gray-400"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {marking ? "Marking..." : isCompleted ? "Completed" : "Mark Complete"}
        </button>

        {/* Course Progress Bar */}
        <div className="mt-6">
          <h3 className="mb-1 text-sm text-gray-500">Course Progress</h3>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-emerald-500 transition-[width] duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-sm text-gray-600">{progress}% complete</p>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {prevLesson && (
            <Link
              to={`/lms/student/mycourses/${courseId}/lesson/${prevLesson.id}`}
            >
              <button className="rounded bg-gray-100 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-200">
                ← {prevLesson.title}
              </button>
            </Link>
          )}
          {nextLesson && (
            <Link
              to={`/lms/student/mycourses/${courseId}/lesson/${nextLesson.id}`}
            >
              <button className="rounded bg-emerald-100 px-4 py-2 font-medium text-emerald-700 transition hover:bg-emerald-200">
                Next Lesson → {nextLesson.title}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonViewer;
