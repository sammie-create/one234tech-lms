import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { PiSignOutBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";

import CustomSelect from "@/ui/CustomSelect";
import { useStudentCourses } from "@/hooks/useStudentCourses";
import { useUnenrollStudent } from "@/hooks/useUnenrollStudent";
import { useEnrollStudent } from "@/hooks/useEnrollStudent";
import { useAllCourses } from "@/hooks/useAllCourses";
import ConfirmationModal from "@/ui/ConfirmationModal";

function StudentDetailsDrawer({ isOpen, onClose, student }) {
  const { data: courses = [], isLoading: loadingCourses } = useStudentCourses(
    student?.id,
  );
  const { mutateAsync: unenrollStudent } = useUnenrollStudent();
  const { mutateAsync: enrollStudent } = useEnrollStudent();
  const {
    data: allCourses = [],
    isLoading: loadingAllCourses,
    isError: errorLoadingCourses,
  } = useAllCourses();

  const [confirmUnenrollId, setConfirmUnenrollId] = useState(null);
  const [confirmReassign, setConfirmReassign] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (loadingAllCourses)
      toast.loading("Loading available courses...", { id: "all-courses-load" });
    else toast.dismiss("all-courses-load");

    if (errorLoadingCourses) toast.error("Failed to fetch courses.");
  }, [loadingAllCourses, errorLoadingCourses]);

  if (!isOpen || !student) return null;

  const handleUnenroll = async (courseId) => {
    const toastId = toast.loading("Unenrolling student...");
    try {
      await unenrollStudent({ student_id: student.id, course_id: courseId });
      toast.success("Student unenrolled successfully", { id: toastId });
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to unenroll student", { id: toastId });
    }
  };

  const handleReassign = async () => {
    if (!selectedCourse?.value) {
      toast.error("Please select a course to reassign.");
      return;
    }
    const toastId = toast.loading("Reassigning course...");
    try {
      await enrollStudent({
        student_id: student.id,
        course_id: selectedCourse.value,
      });
      toast.success("Student reassigned successfully", { id: toastId });
      setSelectedCourse(null);
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to reassign student", { id: toastId });
    }
  };

  const courseOptions = allCourses.map((c) => ({
    label: c.title,
    value: c.id,
  }));

  return (
    <div className="scrollbar-thin absolute top-1/2 left-1/2 z-50 w-[280px] -translate-x-1/2 -translate-y-1/2 space-y-4 overflow-y-auto rounded-xl bg-white p-6 shadow-lg md:w-[350px] lg:w-[450px]">
      <button
        onClick={onClose}
        className="mb-4 cursor-pointer text-sm text-gray-500 hover:text-red-500"
      >
        <IoClose className="h-5 w-5" />
      </button>

      <div className="space-y-1">
        <h3 className="!font-bold !text-emerald-700">Student Info</h3>

        <p className="space-x-2 md:text-xs">
          <span className="font-semibold">Name:</span>
          <span>{student.name}</span>
        </p>
        <p className="space-x-2 md:text-xs">
          <span className="font-semibold">Email:</span>
          <span>{student.email}</span>
        </p>
        <p className="space-x-2 md:text-xs">
          <span className="font-semibold">Progress:</span>
          <span>Overall Progress: {student.overall_progress || 0}%</span>
        </p>
      </div>

      <div>
        <h4 className="mb-1 font-medium">Enrolled Courses</h4>
        {loadingCourses ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {courses.map((course) => (
              <li
                key={course.course_id}
                className="flex items-center justify-between rounded border border-gray-300 bg-slate-100 p-2"
              >
                <div className="space-y-1">
                  <p className="font-medium">
                    {course.title} &bull; {`${course.progress}%`}
                  </p>
                  <div className="h-1 w-full rounded-full bg-gray-200">
                    <div
                      className="h-1 rounded-full bg-emerald-600 transition-all duration-300"
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="group relative">
                  <button
                    onClick={() => setConfirmUnenrollId(course.course_id)}
                    className="cursor-pointer text-sm text-red-500 hover:underline"
                  >
                    <PiSignOutBold />
                  </button>
                  <div className="absolute -right-3 bottom-full z-50 mb-2 w-max rounded bg-white px-2 py-1 text-red-400 opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
                    Unenroll Student
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="">
        <h4 className="mb-0.5 font-medium text-emerald-600">
          Reassign to a New Course
        </h4>
        <CustomSelect
          label="Select Course"
          options={courseOptions}
          selected={selectedCourse}
          onChange={setSelectedCourse}
        />
        <button
          onClick={() => setConfirmReassign(true)}
          disabled={!selectedCourse?.value}
          className="mt-2 w-full rounded bg-green-800 px-4 py-2 text-white hover:bg-green-700"
        >
          Assign New Course
        </button>
      </div>

      {/* Confirm Unenroll Modal */}
      {confirmUnenrollId && (
        <ConfirmationModal
          isOpen={confirmUnenrollId}
          title="Confirm Unenroll"
          message=" Are you sure you want to unenroll this student from the course?"
          onCancel={() => setConfirmUnenrollId(null)}
          onConfirm={async () => {
            await handleUnenroll(confirmUnenrollId);
            setConfirmUnenrollId(null);
          }}
          confirmText="Unenroll"
          confirmClass="bg-red-400"
        />
      )}

      {/* Confirm Reassign Modal */}
      {confirmReassign && (
        <ConfirmationModal
          isOpen={confirmReassign}
          title="Confirm Reassign"
          message="Reassign this student to a new course?"
          onCancel={() => setConfirmReassign(false)}
          onConfirm={async () => {
            await handleReassign();
            setConfirmReassign(false);
          }}
          confirmClass="bg-gradient-to-r from-green-400 to-emerald-500"
        />
      )}
    </div>
  );
}

export default StudentDetailsDrawer;
