import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updatePasswordHelper } from "../../helpers/updatePasswordHelper";

function UpdatePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const password = watch("password");

  async function onSubmit({ password }) {
    setIsLoading(true);

    await updatePasswordHelper({
      password,
      onSuccess: () => navigate("/lms/signin"),
    });

    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-center text-lg font-semibold">
          Set New Password
        </h2>

        {/* New Password */}
        <div className="mb-4">
          <label className="mb-1 block text-sm text-gray-700">
            New Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className={`w-full rounded-md border px-4 py-2.5 focus:ring-1 focus:ring-emerald-500 focus:outline-none ${
              errors.password
                ? "border-red-500 ring-1 ring-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="mb-1 block text-sm text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className={`w-full rounded-md border px-4 py-2.5 focus:ring-1 focus:ring-emerald-500 focus:outline-none ${
              errors.confirmPassword
                ? "border-red-500 ring-1 ring-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded-md py-2.5 text-white transition ${
            isLoading
              ? "cursor-not-allowed bg-emerald-400"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
