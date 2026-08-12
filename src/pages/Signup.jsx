import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Coffee,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const existingUser = JSON.parse(
      localStorage.getItem("coffeeUser")
    );

    if (
      existingUser &&
      existingUser.email.toLowerCase() ===
        email.trim().toLowerCase()
    ) {
      alert(
        "An account with this email already exists."
      );
      return;
    }

    const user = {
      name: name.trim(),
      email: email.trim(),
      password,
    };

    localStorage.setItem(
      "coffeeUser",
      JSON.stringify(user)
    );

    alert(
      "Account created successfully! Please sign in."
    );

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f5f0] px-5 py-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#8b5e3c] text-white shadow-lg">
            <Coffee size={38} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-stone-800">
            Brew & Bean
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Create your account and start ordering.
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="mt-8 rounded-3xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-stone-800">
            Create Account
          </h2>

          {/* NAME */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-stone-600">
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3">
              <User
                size={19}
                className="text-stone-400"
              />

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-stone-600">
              Email
            </label>

            <div className="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3">
              <Mail
                size={19}
                className="text-stone-400"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-stone-600">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3">
              <Lock
                size={19}
                className="text-stone-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="w-full bg-transparent text-sm outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="text-stone-400"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-stone-600">
              Confirm Password
            </label>

            <div className="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3">
              <Lock
                size={19}
                className="text-stone-400"
              />

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-[#8b5e3c] py-4 font-bold text-white transition hover:bg-[#70482f]"
          >
            Create Account
          </button>

          <p className="mt-5 text-center text-sm text-stone-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[#8b5e3c]"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;