import { RiInformationFill, RiAlertFill } from "react-icons/ri";
import { GrTarget } from "react-icons/gr";
import { useAuthContext } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useStudentStats } from "@/hooks/useStudentStats";
import StudentDashboardProgressCard from "./StudentDashboardProgressCard";
import Button from "@/ui/Button";
import Loader from "@/ui/Loader";
import { Link } from "react-router-dom";

function StudentDashboard() {
  const { user } = useAuthContext();
  const { profile, profileLoading } = useUserProfile(user?.id);
  const { overallProgress, courseProgresses, overallLoading, coursesLoading } =
    useStudentStats();
  console.log(courseProgresses);

  const loading = overallLoading || coursesLoading || profileLoading;

  const studentName = profile?.name.split(" ")[0] || "Student";

  // console.log(studentName);
  // console.log("Overall Progress:", overallProgress);
  // console.log("Course Progresses:", courseProgresses);

  if (loading) return <Loader />;

  return (
    <div data-aos="fade-in" className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-semibold">Welcome, {studentName}</h1>
        <p className="mt-1 text-sm text-emerald-100">
          Continue your learning journey and achieve your goals!
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-3">
        <h2 className="col-span-1 !text-base md:col-span-3 md:!text-lg xl:!text-xl">
          Learning Progress
        </h2>
        {loading ? (
          <div className="relative col-span-1 md:col-span-3">
            <Loader />
          </div>
        ) : (
          <>
            <StudentDashboardProgressCard
              value={overallProgress}
              color={"#2563EB"}
              label={"Overall Progress"}
            />
            <StudentDashboardProgressCard
              value={20}
              color={"#fe9a00"}
              label={"Assignments"}
            />
            <StudentDashboardProgressCard
              value={50}
              color={"#59a57a"}
              label={"Certificates"}
            />
          </>
        )}
      </div>

      {/* My Courses */}
      <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="!text-base md:!text-lg xl:!text-xl">My Courses</h2>
        <div className="grid grid-cols-1 gap-4">
          {courseProgresses?.length > 0 ? (
            courseProgresses?.map((course) => (
              <div
                key={course.course_id}
                className="grid grid-cols-[2.5rem_auto] grid-rows-1 gap-3 rounded-lg bg-gray-100 px-4 py-3 md:grid-cols-[2.5rem_1fr_auto] md:gap-4 md:py-4 lg:grid-cols-[3rem_1fr_auto]"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center self-center rounded-sm ${course.title === "Product Marketing" ? "bg-blue-600" : course.title === "Product Management" ? "bg-emerald-600" : "bg-amber-500"} text-white lg:h-12 lg:w-12`}
                >
                  <GrTarget className="h-6 w-6 lg:h-8 lg:w-8" />
                </div>

                <div>
                  <h3 className="mb-1 font-medium text-gray-800">
                    {course.title}
                  </h3>
                  <p className="mb-1 text-xs">
                    &bull; {course.totalLessons} lessons
                  </p>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${course.title === "Product Marketing" ? "bg-blue-600" : course.title === "Product Management" ? "bg-emerald-600" : "bg-amber-500"} transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <Link to={`/lms/student/mycourses/${course.course_id}`}>
                  <Button
                    size={"medium"}
                    variation={"primary"}
                    style={
                      "text-xs lg:flex items-center justify-center col-span-2 md:text-sm md:h-11 md:w-28 xl:w-34 md:self-center md:col-span-1"
                    }
                  >
                    Continue
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-[12px]">No course selected yet</p>
          )}
        </div>
      </section>

      {/* Notifications */}
      <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="!text-base md:!text-lg xl:!text-xl">Notifications</h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-2 rounded-lg bg-emerald-50 p-4">
            <RiAlertFill className="text-base text-yellow-500" />
            <div>
              <p className="text-[12px] font-semibold text-gray-700">
                Assignment due soon
              </p>
              <span>Product Research assignment due in 2 days </span>
            </div>
          </li>
          <li className="flex items-center gap-2 rounded-lg bg-lime-50 p-4">
            <RiInformationFill className="text-base text-blue-700" />
            <div>
              <p className="text-[12px] font-semibold text-gray-700">
                New session available
              </p>
              <span>User Research II now live</span>
            </div>
          </li>
          {/* <li className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
                Certificate issued for MVP Design.
                </li> */}
        </ul>
      </section>
    </div>
  );
}

export default StudentDashboard;
