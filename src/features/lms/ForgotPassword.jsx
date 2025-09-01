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

  // Function to handle password reset
  // This function sends a password reset link to the user's email
  async function onSubmit({ email }) {
    const toastId = toast.loading("Sending reset link");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://learn-one234tech.vercel.app/lms/update-password",
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
      className="flex min-h-screen items-center justify-center bg-gray-50 px-4"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-md"
      >
        <h2 className="mb-2 text-center text-lg font-semibold">
          Forgot Password
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your email to receive a reset link
        </p>

        <div className="mb-4">
          <label className="mb-1 block text-sm text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full rounded-md border px-4 py-2.5 focus:ring-1 focus:ring-emerald-500 focus:outline-none ${
              errors.email
                ? "border-red-500 ring-1 ring-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-emerald-600 py-2.5 text-white transition hover:bg-emerald-700"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
