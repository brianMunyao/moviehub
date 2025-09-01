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
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
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
                Continue with Google
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
        <p className="text-sm text-gray-500">
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
