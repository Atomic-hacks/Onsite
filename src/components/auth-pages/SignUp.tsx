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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="mb-6 lg:mb-8">
            <Image
              src="/Onsitelogo.svg"
              alt="onsitelogo"
              width={40}
              height={40}
              className=""
            />
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Sign Up</h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Create an account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields - stack on mobile, side by side on larger screens */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
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
                className="absolute right-3 top-2.5 touch-manipulation"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Phone number with country code */}
            <div className="flex">
              <div className="bg-gray-50 flex items-center justify-center px-3 sm:px-4 rounded-l-md border border-r-0 border-input min-w-fit">
                <div className="flex items-center gap-1">
                  <div className="w-5 sm:w-6 h-3 sm:h-4 relative">
                    <div className="absolute top-0 left-0 w-1/3 h-full bg-green-600"></div>
                    <div className="absolute top-0 left-1/3 w-1/3 h-full bg-white"></div>
                    <div className="absolute top-0 left-2/3 w-1/3 h-full bg-green-600"></div>
                  </div>
                  <span className="text-sm sm:text-base">+234</span>
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
              type="text"
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
                readOnly
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 touch-manipulation"
              >
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 h-11 sm:h-10 text-base sm:text-sm"
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-500 text-sm sm:text-base">
              Already have an account?{" "}
            </span>
            <Link
              href="/signin"
              className="text-green-700 hover:text-green-800 font-medium text-sm sm:text-base"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image (hidden on mobile, visible on lg and up) */}
      <div className="hidden lg:block lg:w-1/2 bg-lime-900 relative">
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
