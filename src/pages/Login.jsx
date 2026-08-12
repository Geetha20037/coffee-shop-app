import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Coffee, Mail, Lock, Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("coffeeUser")
    );

    if (!savedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (
      email.trim().toLowerCase() !==
        savedUser.email.toLowerCase() ||
      password !== savedUser.password
    ) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    alert("Login successful!");

    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f5f0] px-5">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#8b5e3c] text-white shadow-lg">
            <Coffee size={38} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-stone-800">
            Brew & Bean
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Welcome back! Please login to continue.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 rounded-3xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-stone-800">
            Sign In
          </h2>

          {/* EMAIL */}
          <div className="mt-5">
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
                placeholder="Enter your password"
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

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-[#8b5e3c] py-4 font-bold text-white transition hover:bg-[#70482f]"
          >
            Sign In
          </button>

          <p className="mt-5 text-center text-sm text-stone-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-[#8b5e3c]"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;