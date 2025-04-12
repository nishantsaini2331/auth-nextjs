"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      if (res.status === 200) {
        alert(res.data.message);
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading..." : "Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder:text-black "
        type="text"
        id="email"
        defaultValue={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <hr />
      <label htmlFor="password">password</label>
      <input
        className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder:text-black "
        type="password"
        id="password"
        defaultValue={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        className="p-2 border rounded-2xl"
        onClick={onLogin}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "Disabled" : "Login"}
      </button>

      <Link href={"/signup"}>Visit Signup here</Link>
    </div>
  );
}
