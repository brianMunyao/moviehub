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
              Continue with Google
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-gray-500">
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
