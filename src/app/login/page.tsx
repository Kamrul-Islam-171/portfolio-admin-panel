"use client";

import Link from "next/link";

import LoginForm from "@/components/forms/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            {/* Logo */}
            <Link href="/" className="flex justify-center items-center gap-1">
              <span className="text-lg font-semibold">
                <span className="text-green-600 font-quicksand">Admin Login</span>
              </span>
            </Link>
          </CardTitle>
          <CardDescription>Enter your credentials to sign in</CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>

        
      </Card>
    </div>
  );
}
