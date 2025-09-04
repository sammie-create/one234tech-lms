import { Link } from "react-router-dom";

function LessonList({ modules, currentLessonId, courseId }) {
  if (!modules?.length) {
    return (
      <p className="text-sm text-gray-500 italic">No lessons available yet.</p>
    );
  }

  return (
    <div className="border-black-200 w-64 flex-shrink-0 border-r bg-gray-50 p-2">
      <h2 className="mb-4 text-lg font-bold text-gray-700">Course Lessons</h2>

      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id}>
            <h3 className="mb-2 text-sm font-semibold text-gray-600 uppercase">
              {module.title}
            </h3>
            <ul className="space-y-1">
              {module.lessons?.map((lesson) => {
                const isActive = lesson.id === currentLessonId;
                return (
                  <li key={lesson.id}>
                    <Link
                      to={`/lms/student/mycourses/${courseId}/lesson/${lesson.id}`}
                      className={`block rounded px-2 py-1 text-sm ${
                        isActive
                          ? "bg-emerald-100 font-medium text-emerald-700"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {lesson.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonList;
