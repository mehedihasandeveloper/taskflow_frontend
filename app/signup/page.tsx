import AuthLayout from "@/components/auth/AuthLayout";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthLayout prompt="Already have an account?" linkText="Sign in" linkHref="/signin">
      <SignUpForm />
    </AuthLayout>
  );
}