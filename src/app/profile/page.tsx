"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
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

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.data._id);
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
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="py-3">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>Go to profile page</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-2xl"
      >
        Get Details
      </button>
      <hr />
      <button
        onClick={logout}
        className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-2xl"
      >
        Logout
      </button>
    </div>
  );
}
