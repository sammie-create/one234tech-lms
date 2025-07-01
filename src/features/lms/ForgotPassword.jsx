import { useForm } from "react-hook-form";
import { supabase } from "../../integrations/supabaseClient";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  console.log(window.location.origin);

  async function onSubmit({ email }) {
    const toastId = toast.loading("Sending reset link");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/lms/update-password`,
    });

    if (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "Something went wrong.");
    } else {
      toast.dismiss(toastId);
      toast.success("Password reset link sent to your email.");
      navigate("/lms/email-sent");
    }
  }

  return (
    <div
      data-aos="fade-in"
      className="min-h-screen flex items-center justify-center px-4 bg-gray-50"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
      >
        <h2 className="text-lg font-semibold text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email to receive a reset link
        </p>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
              errors.email
                ? "border-red-500 ring-1 ring-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-md transition"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
