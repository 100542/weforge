"use client";
import { useState } from "react";
import Footer from "../components/footer";
import Nav from "../components/nav";

const BASE_API_URL = "http://localhost:8000";

export default function Account() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm_password } = form;

    if (isRegistering && password !== confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    const endpoint = `${BASE_API_URL}/api/auth/${isRegistering ? "register" : "login"}/`;
    const payload = isRegistering
      ? { name, email, password }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        if (!isRegistering) {
          localStorage.setItem("access_token", data.access_token);
          window.location.href = "/editor";
        } else {
          alert("Registration successful! You can now log in.");
          setIsRegistering(false);
        }
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error. Try again.");
    }
  };

  return (
    <>
      <Nav />
      <main className="bg-[#0e0e0e] min-h-screen flex flex-col items-center justify-center p-8">
        <section className="bg-[#1a1a1a] text-white p-10 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-4xl font-bold montserrat tracking-wider text-[#EDA200] mb-8 text-center">
            {isRegistering ? "Create an Account" : "Your Account Details"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6 montserrat tracking-wider">
            {isRegistering && (
              <div className="flex flex-col">
                <label htmlFor="name" className="text-2xl font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="p-4 bg-[#0e0e0e] border-2 border-[#EDA200] rounded-md text-white"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label htmlFor="email" className="text-2xl font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="p-4 bg-[#0e0e0e] border-2 border-[#EDA200] rounded-md text-white"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-2xl font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="p-4 bg-[#0e0e0e] border-2 border-[#EDA200] rounded-md text-white"
                placeholder="••••••••"
              />
            </div>

            {isRegistering && (
              <div className="flex flex-col">
                <label htmlFor="confirm_password" className="text-2xl font-semibold mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  required
                  className="p-4 bg-[#0e0e0e] border-2 border-[#EDA200] rounded-md text-white"
                  placeholder="Re-enter your password"
                />
              </div>
            )}

            <button type="submit"
              className="bg-transparent hover:bg-[#EDA200] hover:text-[#0e0e0e] text-white border-2 border-[#EDA200] font-bold text-2xl p-4 rounded-md mt-4 shadow-md transition duration-300">
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>

          <p className="text-white text-xl text-center mt-6">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsRegistering(!isRegistering)}
              className="text-[#EDA200] font-bold underline hover:text-white transition duration-200">
              {isRegistering ? "Login here" : "Register here"}
            </button>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
