"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const forgotPass = async () => {
    try {
      const res = await axios.post("/api/users/forgot-password", { email });
      alert(res.data.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.log("Generic error:", error.message);
      } else {
        console.log("Unknown error while fetching user details.");
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Forgot password ?</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder:text-black "
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />

      <button className="p-2 border rounded-2xl" onClick={forgotPass}>
        {!email.length ? "Disabled" : "Send Email"}
      </button>
    </div>
  );
}
