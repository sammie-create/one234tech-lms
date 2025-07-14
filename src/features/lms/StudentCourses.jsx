import { useAuthContext } from "../../contexts/AuthContext";
import { useCourses } from "../../hooks/useCourses";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";

function StudentCourses() {
  const { user, authLoading } = useAuthContext();
  const { data: courses, isLoading, isError } = useCourses(user?.id);

  if (authLoading || isLoading) return <Loader />;
  if (isError)
    return (
      <p className="p-4 text-red-500 md:text-base">Error loading courses.</p>
    );
  if (courses?.length === 0)
    return (
      <p className="p-4 md:text-base">
        You are not enrolled in any courses yet.
      </p>
    );

  console.log(user);
  console.log(courses);

  return (
    <div className="p-3 md:p-0">
      <h2 className="mb-6">My Courses</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {courses.map((course) => (
          <Link to={`${course.id}`} key={course.id}>
            <div className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg">
              <img
                src={course.cover_image}
                alt={course.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-1">{course.title}</h3>
                <p className="md:text-xs xl:text-base">{course.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StudentCourses;
