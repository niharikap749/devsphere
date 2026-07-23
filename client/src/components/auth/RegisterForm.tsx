import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    alert("Register clicked");

    setLoading(true);
    setError("");

    try {
      await register(name, email, password);

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <Label>Full Name</Label>

        <Input
          placeholder="John Doe"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
      </div>

      <div>
        <Label>Email</Label>

        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />
      </div>

      <div>
        <Label>Password</Label>

        <Input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

<Button
  type="submit"
  className="w-full"
  disabled={loading}
>
  {loading
    ? "Creating Account..."
    : "Create Account"}
</Button>
      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          className="text-indigo-400"
          to="/login"
        >
          Login
        </Link>
      </p>
    </form>
  );
}