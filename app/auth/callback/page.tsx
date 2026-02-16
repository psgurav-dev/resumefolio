"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux";
import { setCurrentUser } from "@/redux/slices/usersSlice";
import { account } from "@/config/appwrite";
import { setAuthCookies } from "@/lib/cookies";

export default function AuthCallbackPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    async function handleAuth() {
      try {
        // ✅ create JWT from Appwrite session
        const jwtResponse = await account.createJWT();
        const jwtToken = jwtResponse.jwt;

        const res = await fetch("/api/auth/appwrite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ jwt: jwtToken })
        });

        if (!res.ok) throw new Error("User sync failed");

        const { user } = await res.json();

        const userData = {
          _id: user._id,
          appwriteUserId: user.appwriteUserId,
          email: user.email,
          name: user.name,
          provider: user.provider as 'google' | 'github' | 'email',
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          jwt: jwtToken,
        };

        // ✅ Store user and JWT in Redux
        dispatch(setCurrentUser(userData));

        // ✅ Store JWT and user info in cookies
        setAuthCookies(jwtToken, userData);

        router.replace("/dashboard");
      } catch (err) {
        console.error(err);
        router.replace("/sign-in?error=auth_failed");
      }
    }

    handleAuth();
  }, [router, dispatch]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-600">Signing you in...</p>
    </div>
  );
}
