"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder:text-black "
        type="text"
        id="email"
        defaultValue={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.name })}
        placeholder="email"
      />

      <hr />
      <label htmlFor="password">password</label>
      <input
        className="text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white placeholder:text-black "
        type="password"
        id="password"
        defaultValue={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.name })}
        placeholder="password"
      />

      <button className="p-2 border rounded-2xl" onClick={onLogin}>
        Login here
      </button>

      <Link href={"/signup"}>Visit Signup here</Link>
    </div>
  );
}
