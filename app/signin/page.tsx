import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <AuthLayout prompt="New here?" linkText="Create an account" linkHref="/signup">
      <SignInForm />
    </AuthLayout>
  );
}