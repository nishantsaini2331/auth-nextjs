"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const router = useRouter();
  const resetPassword = async () => {
    try {
      await axios.post("/api/users/reset-password", { token, newPassword });
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: unknown) {
      setError(true);
      if (axios.isAxiosError(error)) {
        console.log("Axios error:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.log("Generic error:", error.message);
      } else {
        console.log("Unknown error while fetching user details.");
      }
    }
  };

  const checkForValidResetToken = async () => {
    try {
      const res = await axios.post("/api/users/check-reset-password-token", {
        token,
      });
    } catch (error: unknown) {
      setError(true);
      if (axios.isAxiosError(error)) {
        console.log("Axios error:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.log("Generic error:", error.message);
      } else {
        console.log("Unknown error while fetching user details.");
      }
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (!urlToken) {
      return router.push("/");
    }
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token && token.length > 0) {
      checkForValidResetToken();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Reset Password</h1>
      {error ? (
        <div>
          <h2 className="text-2xl">Error</h2>
        </div>
      ) : (
        <>
          <label htmlFor="new-password">New Password</label>
          <input
            className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder:text-black "
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="new password"
          />

          <button className="p-2 border rounded-2xl" onClick={resetPassword}>
            {!newPassword.length ? "Disabled" : "Reset Password"}
          </button>
        </>
      )}

      {success && (
        <div>
          <h2 className="text-2xl">Password Reset Successfully</h2>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
    </div>
  );
}
