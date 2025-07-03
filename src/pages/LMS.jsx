import { Navigate, Route, Routes } from "react-router-dom";
import StudentSignIn from "../features/lms/StudentSignIn";
import StudentSignUp from "../features/lms/StudentSignUp";
import AdminSignIn from "../features/lms/AdminSignIn";
import StudentLMSLayout from "../features/lms/StudentLMSLayout";
import StudentDashboard from "../features/lms/StudentDashboard";
import StudentCourses from "../features/lms/StudentCourses";
import StudentAssignments from "../features/lms/StudentAssignments";
import StudentCertificates from "../features/lms/StudentCertificates";
import StudentSettings from "../features/lms/StudentSettings";
import ProtectedRoutes from "../features/lms/ProtectedRoutes";
import ForgotPassword from "../features/lms/ForgotPassword";
import UpdatePassword from "../features/lms/UpdatePassword";
import EmailSent from "../features/lms/EmailSent";
import { LMSProvider } from "../contexts/LMSContext";
import SessionExpired from "../features/lms/SessionExpired";
import EmailConfirmed from "../features/lms/EmailConfirmed";

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

        <Route element={<ProtectedRoutes />}>
          <Route path="student" element={<StudentLMSLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="mycourses" element={<StudentCourses />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="certificates" element={<StudentCertificates />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>
          <Route path="session-expired" element={<SessionExpired />} />
        </Route>
      </Routes>
    </main>
  );
}

export default LMS;
