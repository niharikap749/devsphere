import AuthLayout from "@/components/layout/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account 🚀"
      subtitle="Join DevSphere and supercharge your development workflow"
    >
      <RegisterForm />
    </AuthLayout>
  );
}