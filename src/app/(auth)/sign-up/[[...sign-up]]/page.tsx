"use client";

import Image from "next/image";
import Link from "next/link";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Button from "@/components/global/button";
import ControlledAppInput from "@/components/global/controlled-app-input";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.email("Invalid email address").min(1, { message: "Email is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type SignUpFormValues = z.infer<typeof FormSchema>;

const SignUpPage = () => {
  const [formError, setFormError] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const router = useRouter();

  const { signUp, isLoaded, setActive } = useSignUp();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    if (!isLoaded) return;

    setFormError("");

    try {
      // Step 1: Create account
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      // Step 2: Trigger email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerificationStep(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setFormError(err.errors?.[0]?.message || "Registration failed");
    }
  };

  const onVerifyOtp = async () => {
    if (!isLoaded) return;

    setIsVerifyingOtp(true);

    try {
      const verificationResult = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });

      if (verificationResult.status === "complete") {
        await setActive({
          session: verificationResult.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/custom-flows/overview#session-tasks
              console.log(session?.currentTask);
              return;
            }

            router.push("/");
          },
        });

        const userId = verificationResult?.createdUserId;
        const email = signUp?.emailAddress;

        if (userId && email) {
          await fetch("/api/profiles", {
            method: "POST",
            body: JSON.stringify({ user_id: userId, email }),
          });
        }
      } else {
        setFormError("Invalid or expired code. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setFormError(err.errors?.[0]?.message || "Verification failed");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const onGoogleSignUp = async () => {
    await signUp?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/",
      redirectUrlComplete: "/",
    });
  };

  return (
    <Card className="w-full max-w-md border-none shadow-none rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-2 mb-4">
          <Image
            src="/logo-with-text.svg"
            alt="MovieHub Logo"
            width={40}
            height={40}
            className="w-auto"
          />
        </div>
        <CardTitle className="text-3xl font-medium">Welcome to MovieHub</CardTitle>
        <CardDescription className="text-base">
          MovieHub provides the latest and trending movies and shows.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {formError && (
          <p className="text-destructive text-sm mb-4" data-slot="form-message">
            {formError}
          </p>
        )}

        {!verificationStep && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <ControlledAppInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
                isRequired
              />

              <ControlledAppInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
                isRequired
              />

              <Button
                type="submit"
                loading={form.formState.isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-white"
              >
                {form.formState.isSubmitting ? "Registering..." : "Register"}
              </Button>

              <Separator className="my-4" />

              <Button
                variant="outline"
                className="w-full text-primary border-primary/50"
                onClick={onGoogleSignUp}
              >
                <div className="flex items-center gap-2">
                  <svg
                    viewBox="-3 0 262 262"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        fill="#EB4335"
                      ></path>
                    </g>
                  </svg>
                  <span>Continue with Google</span>
                </div>
              </Button>
            </form>
          </Form>
        )}

        {verificationStep && (
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              We&apos;ve sent a 6-digit verification code to your email. Please enter it below.
            </p>

            <InputOTP
              className="justify-center"
              maxLength={6}
              value={otpCode}
              onChange={(value) => setOtpCode(value)}
            >
              {[...Array(6)].map((_, idx) => (
                <InputOTPGroup key={idx}>
                  <InputOTPSlot index={idx} className="size-12 text-lg" />
                </InputOTPGroup>
              ))}
            </InputOTP>

            <Button
              onClick={onVerifyOtp}
              className="w-full bg-primary hover:bg-primary-dark text-white"
              loading={isVerifyingOtp}
            >
              Verify Code
            </Button>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <p className="text-sm text-gray-500 w-full flex gap-2 justify-center">
          Already have an account?{" "}
          <Link href="/sign-in">
            <span className="text-indigo-600 hover:underline cursor-pointer">Sign in</span>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
