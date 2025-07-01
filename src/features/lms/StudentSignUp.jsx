import AuthForm from "../authentication/AuthForm";
import Loader from "../../ui/Loader";
import { useAuth } from "../../hooks/useAuth";

function StudentSignUp() {
  const { handleSignUp, isLoading } = useAuth();
  // const { session, signUpNewUser, error, setError, isLoading, setIsLoading } =
  //   useAuthContext();
  // const navigate = useNavigate();
  // console.log(session);

  // async function handleSignUp(data, resetForm) {
  //   setIsLoading(true);

  //   try {
  //     const result = await signUpNewUser(data.email, data.password, data.name);

  //     if (result.success) {
  //       toast.success("Account created! Please sign in.");
  //       resetForm();

  //       setTimeout(() => navigate("/lms"), 1000);
  //       console.log(result);
  //     } else {
  //       const errorMsg = result?.error?.message || "Sign-up failed";
  //       if (errorMsg.includes("User already registered")) {
  //         setError("This email is already in use");
  //         toast.error(error);
  //       } else {
  //         toast.error(errorMsg);
  //       }
  //     }
  //   } catch (err) {
  //     setError("An error occured" + err.message);
  //     toast.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  //   // console.log(data.email);
  // }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <AuthForm
          title="Create Account"
          subtitle="Start your journey with us"
          role="Student"
          variant="signup"
          onSubmit={handleSignUp}
        />
      )}
    </>
  );
}

export default StudentSignUp;
