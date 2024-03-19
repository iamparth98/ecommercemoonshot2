// import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

export function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // start the sign In process.
  const handleSubmit = async (e) => {
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the sign-in hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      setError(err.errors[0].longMessage);
    }
  };

  return (
    <main className=" mt-[36px] flex items-center justify-center">
      <Card className="h-[691px] w-[576px] rounded-[20px]">
        <CardHeader>
          <CardTitle className="size text-center text-3xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" mb-[31px] mt-[36px] flex flex-col items-center justify-center gap-[13px] ">
            <span className="text-[24px] font-medium">
              Welcome to ECOMMERCE
            </span>
            <span className="text-[16px] font-normal">
              The next gen buisiness marketplace
            </span>
          </div>
          <form>
            <div className="flex flex-col items-center  gap-10 rounded-[6px] text-base font-normal">
              <div className="flex flex-col space-y-1.5 text-base">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="h-[48px] w-[456px]"
                  id="name"
                  placeholder="Enter"
                />
              </div>
              <div className=" flex w-[456px] flex-col space-y-1.5 text-base">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex flex-col items-center">
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-[48px] w-[456px] "
                    type="password"
                    id="password"
                    placeholder="Enter"
                  />
                  <span className="absolute bottom-[12px] right-4 cursor-pointer text-[16px] font-normal">
                    Show
                  </span>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <div className="mt-5 flex flex-col items-center space-y-1.5">
          <Button
            onClick={handleSubmit}
            className="h-[56px] w-[456px] text-base font-medium"
          >
            LOGIN
          </Button>
        </div>
        <CardFooter className="flex items-center justify-center gap-2">
          <span className=" mt-12 flex items-center justify-center">
            Have An Account?{" "}
          </span>
          <Link href="/login">
            <span className=" mt-12 flex items-center justify-center">
              <strong>Sign Up</strong>
            </span>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}

export default LoginPage;
