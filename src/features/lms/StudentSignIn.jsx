import { useAuth } from "../../hooks/useAuth";
import AuthForm from "../authentication/AuthForm";
import Loader from "../../ui/Loader";

function StudentSignIn() {
  const { handleSignIn, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <AuthForm
          title="Welcome Back"
          subtitle="Continue your learning journey"
          role="Student"
          variant="signin"
          onSubmit={handleSignIn}
        />
      )}
    </>
  );
}

export default StudentSignIn;
