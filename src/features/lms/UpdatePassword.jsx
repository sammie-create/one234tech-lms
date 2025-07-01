// src/pages/UpdatePassword.jsx
import { useForm } from "react-hook-form";
import { supabase } from "../../integrations/supabaseClient";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit({ password }) {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated! You can now sign in.");
      navigate("/lms/signin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
      >
        <h2 className="text-lg font-semibold text-center mb-4">
          Set New Password
        </h2>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">
            New Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
              errors.password
                ? "border-red-500 ring-1 ring-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-md transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
