import { Navigate, Route, Routes } from "react-router-dom";
import StudentSignIn from "@/features/lms/StudentSignIn";
import StudentSignUp from "@/features/lms/StudentSignUp";
import AdminSignIn from "@/features/lms/admin/AdminSignIn";
import StudentIndex from "@/features/lms/StudentIndex";
import StudentDashboard from "@/features/lms/StudentDashboard";
import StudentCourses from "@/features/lms/StudentCourses";
import StudentAssignments from "@/features/lms/StudentAssignments";
import StudentCertificates from "@/features/lms/StudentCertificates";
import SettingsPage from "@/features/lms/SettingsPage";
import ProtectedRoutes from "@/features/lms/ProtectedRoutes";
import ForgotPassword from "@/features/lms/ForgotPassword";
import UpdatePassword from "@/features/lms/UpdatePassword";
import EmailSent from "@/features/lms/EmailSent";
import SessionExpired from "@/features/lms/SessionExpired";
import EmailConfirmed from "@/features/lms/EmailConfirmed";
import ExploreCourses from "@/features/lms/ExploreCourses";
import StudentCourseDetail from "@/features/lms/StudentCourseDetail";
import LessonViewer from "@/features/lms/LessonViewer";
import AdminDashboard from "@/features/lms/admin/AdminDashboard";
import AdminIndex from "@/features/lms/admin/AdminIndex";
import StudentManagementPage from "@/features/lms/admin/StudentManagement";
<<<<<<< HEAD
=======
import CoursesManagement from "@/features/lms/admin/CoursesManagement";
import ModulesManagement from "@/features/lms/admin/ModulesManagement";
>>>>>>> one234tech-lms-second/main

function LMS() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Routes>
        <Route index element={<Navigate replace to="signin" />} />
        <Route path="signin" element={<StudentSignIn />} />
        <Route path="signup" element={<StudentSignUp />} />
        <Route path="admin/signin" element={<AdminSignIn />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="email-sent" element={<EmailSent />} />
        <Route path="email-confirmed" element={<EmailConfirmed />} />
        <Route path="session-expired" element={<SessionExpired />} />
        <Route path="courses" element={<ExploreCourses />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="student" element={<StudentIndex />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="mycourses" element={<StudentCourses />} />
            <Route path="mycourses/:id" element={<StudentCourseDetail />} />
            <Route
              path="mycourses/:courseId/lesson/:lessonId"
              element={<LessonViewer />}
            />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="certificates" element={<StudentCertificates />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="admin" element={<AdminIndex />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-students" element={<StudentManagementPage />} />
<<<<<<< HEAD
=======
            <Route path="manage-courses" element={<CoursesManagement />} />
            <Route path="manage-modules" element={<ModulesManagement />} />
>>>>>>> one234tech-lms-second/main
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default LMS;
