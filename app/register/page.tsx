import AuthShell from "@/components/auth-shell";
import RegisterForm from "./register-form";

export const metadata = { title: "Create account · Splitko" };

export default function RegisterPage() {
  return (
    <AuthShell mode="register">
      <RegisterForm />
    </AuthShell>
  );
}
