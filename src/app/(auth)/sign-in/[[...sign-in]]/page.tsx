"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
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
import { ILoginCredentials } from "@/types/IUser";
import ControlledAppInput from "@/components/global/controlled-app-input";
import { Form } from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
  email: z.email().min(1, {
    message: "Email is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const SignInPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const { signIn, isLoaded, setActive } = useSignIn();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),

    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: ILoginCredentials) => {
    if (!isLoaded) return;

    const redirectUrl = searchParams.get("redirect_url") || "/";

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/custom-flows/overview#session-tasks
              console.log(session?.currentTask);
              return;
            }

            router.push(redirectUrl);
          },
        });
      } else {
        setFormError("Additional steps required");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.errors?.[0]?.code === "session_exists") {
        router.push(redirectUrl);
      } else {
        setFormError(err.errors?.[0]?.message || "Sign-in failed");
      }
    }
  };

  const handleGoogleSignIn = () => {
    if (!isLoaded) return;
    signIn.authenticateWithRedirect({
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
          <p data-slot="form-message" className={"text-destructive text-sm mb-4"}>
            {formError}
          </p>
        )}

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
              disabled={form.formState.isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark text-white"
            >
              {form.formState.isSubmitting ? "Signing in..." : "Login"}
            </Button>

            <Separator className="my-4" />

            <Button
              variant="outline"
              className="w-full text-primary border-indigo-200"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <div className="flex items-center gap-2">
                <svg
                  viewBox="-3 0 262 262"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
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
      </CardContent>

      <CardFooter>
        <p className="text-sm text-gray-500 flex gap-2 justify-center w-full">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <span className="text-primary hover:underline cursor-pointer">Sign Up</span>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInPage;
