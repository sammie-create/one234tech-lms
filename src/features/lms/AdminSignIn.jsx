import AuthForm from "../authentication/AuthForm";

function AdminSignIn() {
  return (
    <AuthForm
      title="Admin Access"
      subtitle="Manage your dashboard"
      role="Admin"
      variant="signin"
      onSubmit={data => console.log("Admin Login", data)}
    />
  );
}

export default AdminSignIn;
