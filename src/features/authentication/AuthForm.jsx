import { useForm } from "react-hook-form";
import { HiAcademicCap, HiMiniUser, HiUserCircle } from "react-icons/hi2";
import { HiMail, HiUser, HiLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";

function AuthForm({ title, subtitle, role, variant, onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  return (
    <div
      data-aos="fade-in"
      className="flex flex-col items-center justify-center px-4 py-10 md:text-[14px]"
    >
      <div className="mb-8 flex flex-col items-center gap-2">
        <Link to="/">
          <div className="flex h-15 w-15 items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-emerald-600 md:h-20 md:w-20">
            <HiAcademicCap className="h-10 w-10 text-white md:h-15 md:w-15" />
          </div>
        </Link>
        <h2 className="tracking-wide">One234 Tech</h2>
        <h3 className="leading-3">{role} Portal</h3>
      </div>

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h3 className="mb-1 text-center">{title}</h3>
        <p className="mb-6 text-center text-[12px] text-gray-500 md:text-[14px]">
          {subtitle}
        </p>

        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data, reset);
          })}
          noValidate
        >
          {/* Sign up, Sign in (Student & Admin) form */}
          {variant === "signup" && (
            <div className="mb-4">
              <div className="relative">
                <label className="mb-1 block text-[12px] font-medium text-gray-700">
                  Full Name
                </label>
                <HiUser className="absolute top-1/2 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2.5 pl-10 focus:ring-1 focus:ring-emerald-500 focus:outline-none ${
                    errors.name
                      ? "border-red-500 ring-1 ring-red-500 focus:ring-red-500"
                      : "border border-gray-300"
                  } `}
                  placeholder="Your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
          <div className="mb-4">
            <div className="relative">
              <label className="mb-1 block text-[12px] font-medium text-gray-700">
                Email Address
              </label>
              <HiMail className="absolute top-1/2 left-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className={`w-full rounded-md border border-gray-300 px-4 py-2.5 pl-10 focus:ring-1 focus:ring-emerald-500 focus:outline-none ${
                  errors.email
                    ? "border-red-500 ring-1 ring-red-500 focus:ring-red-500"
                    : "border border-gray-300"
                } `}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="relative">
              <label className="mb-1 block text-[12px] font-medium text-gray-700">
                Password
              </label>
              <HiLockClosed className="absolute top-1/2 left-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password should be least 6 characters",
                  },
                })}
                className={`w-full rounded-md border border-gray-300 px-4 py-2.5 pl-10 focus:ring-1 focus:ring-emerald-500 focus:outline-none ${
                  errors.password
                    ? "border-red-500 ring-1 ring-red-500 focus:ring-red-500"
                    : "border border-gray-300"
                } `}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {variant === "signup" && (
            <div className="mb-4">
              <div className="relative">
                <label className="mb-1 block text-[12px] font-medium text-gray-700">
                  Confirm Password
                </label>
                <HiLockClosed className="absolute top-1/2 left-3 h-5 w-5 text-gray-400" />

                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`w-full rounded-md border border-gray-300 px-4 py-2.5 pl-10 focus:ring-1 focus:ring-emerald-500 focus:outline-none ${
                    errors.confirmPassword
                      ? "border-red-500 ring-1 ring-red-500 focus:ring-red-500"
                      : "border border-gray-300"
                  } `}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          <input type="hidden" value="student" {...register("role")} />

          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-emerald-600 py-2.5 text-white transition-all duration-400 hover:bg-emerald-700"
          >
            {variant === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {variant === "signin" && role === "Student" && (
          <>
            <div className="mt-4 text-center text-gray-600">
              <Link
                to="/lms/forgot-password"
                className="font-medium text-blue-600 hover:!text-emerald-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <p className="mt-3 text-center text-green-600">
              New {role}?{" "}
              <Link
                to="/lms/signup"
                className="font-medium text-blue-600 hover:!text-emerald-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>

            {role === "Student" && (
              <div className="mt-3 text-center text-gray-600">
                <Link
                  to="/lms/admin/signin"
                  className="font-medium text-blue-600 hover:!text-emerald-600 hover:underline"
                >
                  Sign In as Admin
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
