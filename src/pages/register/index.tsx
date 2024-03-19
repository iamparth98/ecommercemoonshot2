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
import Verification from "@/components/verification/Verification";
import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export function RegisterPage() {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        emailAddress,
        password,
      });

      // send the emailAddress.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <>
      {!pendingVerification && (
        <div className=" mt-[36px] flex items-center justify-center">
          <Card className="h-[691px] w-[576px] rounded-[20px]">
            <CardHeader>
              <CardTitle className="size text-center text-3xl">
                Create your account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col items-center  gap-10 rounded-[6px] text-base font-normal">
                  <div className="flex flex-col  space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      onChange={(e) => setFirstName(e.target.value)}
                      className="s h-[48px] w-[456px]"
                      id="name"
                      placeholder="Enter"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 text-base">
                    <Label htmlFor="emailAddress">Email</Label>
                    <Input
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="h-[48px] w-[456px]"
                      id="name"
                      placeholder="Enter"
                    />
                  </div>
                  <div className="flex w-[456px] flex-col space-y-1.5 text-base">
                    <Label htmlFor="password">Password</Label>
                    <div className="flex flex-col items-center">
                      <Input
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-[48px] w-[456px]"
                        type="password"
                        id="password"
                        placeholder="Enter"
                      />
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
                CREATE ACCOUNT
              </Button>
            </div>
            <CardFooter className="flex items-center justify-center gap-2">
              <span className=" mt-12 flex items-center justify-center">
                Have An Account?{" "}
              </span>
              <Link href="/login">
                <span className=" mt-12 flex items-center justify-center">
                  <strong>LOGIN</strong>
                </span>
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}
      {pendingVerification && <Verification />}
    </>
  );
}

export default RegisterPage;
