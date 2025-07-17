"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, ChevronDownIcon } from "lucide-react";
import Image from "next/image";

export function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== rePassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const csrfToken = getCsrfToken();

      const formData = new URLSearchParams();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("re_password", rePassword);
      formData.append("phone_number", phoneNumber);
      formData.append("date_of_birth", dateOfBirth);
      formData.append("company_name", companyName);
      formData.append("role", discipline);

      const response = await fetch(
        "https://whateveritisventually.com/api/users/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            ...(csrfToken && { "X-CSRFTOKEN": csrfToken }),
          },
          body: formData.toString(),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);

        router.push("/dashboard");
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Registration failed" }));
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get CSRF token
  const getCsrfToken = (): string | null => {
    // Option 1: Get from cookie
    const cookies = document.cookie.split(";");
    const csrfCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("csrftoken=")
    );
    if (csrfCookie) {
      return csrfCookie.split("=")[1];
    }

    // Option 2: Get from meta tag
    const metaTag = document.querySelector(
      'meta[name="csrf-token"]'
    ) as HTMLMetaElement;
    if (metaTag) {
      return metaTag.content;
    }

    return localStorage.getItem("csrftoken");

    return null;
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Image
            src="/Onsitelogo.svg"
            alt="onsitelogo"
            width={40}
            height={40}
            className=""
          />
          <h1 className="text-3xl font-bold mb-1">Sign Up</h1>
          <p className="text-gray-500 mb-6">Create an account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-50 w-full"
                required
              />
              <Input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-50 w-full"
                required
              />
            </div>

            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50"
              required
            />

            <div className="relative">
              <Input
                id="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                id="rePassword"
                placeholder="Confirm Password"
                type={showRePassword ? "text" : "password"}
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                className="bg-gray-50 pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5"
                onClick={() => setShowRePassword(!showRePassword)}
              >
                {showRePassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            <div className="flex">
              <div className="bg-gray-50 flex items-center justify-center px-4 rounded-l-md border border-r-0 border-input">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-4 relative">
                    <div className="absolute top-0 left-0 w-1/3 h-full bg-green-600"></div>
                    <div className="absolute top-0 left-1/3 w-1/3 h-full bg-white"></div>
                    <div className="absolute top-0 left-2/3 w-1/3 h-full bg-green-600"></div>
                  </div>
                  <span>+234</span>
                </div>
              </div>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-gray-50 rounded-l-none flex-1"
              />
            </div>

            <Input
              id="dateOfBirth"
              type="date"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="bg-gray-50"
            />

            <Input
              id="companyName"
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-gray-50"
            />

            <div className="relative">
              <Input
                id="discipline"
                type="text"
                placeholder="Discipline/Role"
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="bg-gray-50 pr-10"
              />
              <button type="button" className="absolute right-3 top-2.5">
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-500">Already have an account? </span>
            <Link
              href="/signin"
              className="text-green-700 hover:text-green-800 font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-lime-900 relative">
        <Image
          src="/dashimg.svg"
          alt="Dashboard illustration"
          width={0}
          height={0}
          className="h-[70vh] w-3/4 absolute top-24 right-0.5"
          priority
        />
      </div>
    </div>
  );
}
