import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function EmailConfirmed() {
  const navigate = useNavigate();

  // Show success message and redirect after email confirmation
  // This effect runs when the component mounts, indicating the email has been confirmed
  useEffect(() => {
    toast.success("Email confirmed! You're now signed in.");
    const timer = setTimeout(() => navigate("/lms/student"), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h2 className="text-lg font-semibold text-emerald-600">
        Email Confirmed
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Redirecting to your dashboard...
      </p>
    </div>
  );
}

export default EmailConfirmed;
