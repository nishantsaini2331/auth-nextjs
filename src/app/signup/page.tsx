"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      if (res.status === 201) {
        alert(res.data.message);
        router.push("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.log("Generic error:", error.message);
      } else {
        console.log("Unknown error while fetching user details.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder:text-black "
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />

      <hr />
      <label htmlFor="email">email</label>
      <input
        className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder:text-black "
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <hr />
      <label htmlFor="password">password</label>
      <input
        className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder:text-black "
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button className="p-2 border rounded-2xl" onClick={onSignup}>
        {buttonDisabled ? "Disabled" : "Signup here"}
      </button>

      <Link href={"/login"}>Visit login here</Link>
    </div>
  );
}
