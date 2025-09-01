import { useState } from "react";
import EnrollStudentForm from "@/features/lms/ui/admin/EnrollStudentForm";
import StudentTable from "@/features/lms/ui/admin/StudentTable";
import StudentDetailsDrawer from "@/features/lms/ui/admin/StudentDetailsDrawer";
import { useEscapeKey } from "@/hooks/useEscapeKey";

function StudentManagementPage() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  function handleViewStudent(student) {
    setSelectedStudent(student);
    setDrawerOpen(true);
  }

  function handleDrawerClose() {
    setDrawerOpen(false);
  }

  useEscapeKey(isDrawerOpen, handleDrawerClose);

  return (
    <div className="space-y-8">
      <header className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-3xl text-gray-800">Student Management</h1>
        <p className="text-sm text-gray-500">
          Enroll students into courses, view progress, and manage student
          actions.
        </p>
      </header>

      <section className="rounded-xl border-gray-200 bg-white shadow-sm">
        <div className="rounded-t-xl bg-gradient-to-r from-emerald-50 to-green-100 px-4 py-5 md:px-6">
          <h3 className="">Enroll New Student</h3>
          <p className="text-xs">
            Select a student and course to create a new enrollment
          </p>
        </div>
        <div className="px-4 py-6 md:px-6 lg:pt-8">
          <EnrollStudentForm />
        </div>
      </section>

      <section className="rounded-xl border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-semibold text-gray-700">
          Enrolled Students
        </h3>
        <StudentTable onViewStudent={handleViewStudent} />
      </section>

      <StudentDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        student={selectedStudent}
      />

      {isDrawerOpen && (
        <div
          className="absolute inset-0 z-40 bg-black opacity-40"
          onClick={handleDrawerClose}
        ></div>
      )}
    </div>
  );
}

export default StudentManagementPage;
