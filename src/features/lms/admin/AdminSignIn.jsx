import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/features/authentication/AuthForm";
import Loader from "@/ui/Loader";

function AdminSignIn() {
  const { handleSignIn, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <AuthForm
          title="Admin Access"
          subtitle="Manage your dashboard"
          role="admin"
          variant="signin"
          onSubmit={handleSignIn}
        />
      )}
    </>
  );
}

export default AdminSignIn;
