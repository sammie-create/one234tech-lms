import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCourses } from "../../hooks/useCourses";
import { useCourseModules } from "../../hooks/useCourseModules";
import Loader from "../../ui/Loader";

function StudentCourseDetail() {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { user, authLoading } = useAuthContext();
  const { data: courses, isLoading, error } = useCourses(user?.id);
  const { data: modules, isLoading: modulesLoading } =
    useCourseModules(courseId);
  const [openModuleId, setOpenModuleId] = useState(null);
  console.log(courses);

  const course = courses?.find((c) => String(c.course_id) === courseId);

  function toggleModule(moduleId) {
    setOpenModuleId((prev) => (prev === moduleId ? null : moduleId));
  }

  useEffect(() => {
    if (!authLoading && !isLoading && courses && !course) {
      navigate("/lms/student");
    }
  }, [authLoading, isLoading, courses, course, navigate]);

  if (authLoading || isLoading || modulesLoading) {
    return <Loader />;
  }
  if (!course) return null;
  if (error) {
    return <p className="p-4 text-red-500">Error loading course details.</p>;
  }

  return (
    <div className="mx-auto max-w-xl p-4">
      <h2 className="mb-4 font-bold">{course.title}</h2>
      <img
        src={course.cover_image}
        alt={course.title}
        className="mb-6 w-full rounded-lg shadow"
      />

      <div className="space-y-6">
        {modules?.map((module) => {
          const isOpen = openModuleId === module.id;

          return (
            <div
              key={module.id}
              className="rounded-sm bg-white p-4 shadow-xs transition duration-300 hover:shadow-sm"
              // data-aos="fade-up"
            >
              <button
                onClick={() => toggleModule(module.id)}
                className="flex w-full items-center justify-between text-left text-xs font-semibold md:text-lg"
              >
                {module.title}
                <span className="text-gray-500 md:text-sm">
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>

              <div
                className={`origin-top transform transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "mt-2 scale-y-100 opacity-100"
                    : "h-0 scale-y-0 opacity-0"
                }`}
                style={{ willChange: "transform, opacity" }}
              >
                <ul className="flex flex-col gap-1.5 pl-4">
                  {module.lessons?.length > 0 ? (
                    module.lessons.map((lesson) => (
                      <Link key={lesson.id} to={`lesson/${lesson.id}`}>
                        <li className="cursor-pointer list-disc transition hover:underline md:text-sm">
                          {lesson.title}
                        </li>
                      </Link>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400">No lessons yet.</li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentCourseDetail;
