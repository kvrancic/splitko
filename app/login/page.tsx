import AuthShell from "@/components/auth-shell";
import LoginForm from "./login-form";

export const metadata = { title: "Sign in · Splitko" };

export default function LoginPage() {
  return (
    <AuthShell mode="login">
      <LoginForm />
    </AuthShell>
  );
}
