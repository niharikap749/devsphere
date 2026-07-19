import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue to DevSphere"
    >
      <LoginForm />
    </AuthLayout>
  );
}