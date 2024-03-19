// import * as React from "react";
import React, { ChangeEvent, MouseEventHandler, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";

export function Verification() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");

  const router = useRouter();

  const onPressVerify = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
             or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <main className=" mt-[36px] flex items-center justify-center">
      <Card className="h-[691px] w-[576px] rounded-[20px]">
        <CardHeader>
          <CardTitle className="size text-center text-3xl">
            Verify Your Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" mb-[46px] mt-[32px] flex flex-col items-center justify-center gap-[13px] ">
            <span className="text-[16px] font-normal">
              Enter the 8 digit code you have received on{" "}
            </span>
            <span className="text-[16px] font-normal">emailID.com</span>
          </div>
          <form className="relative flex items-center justify-center">
            <span className="absolute left-[77px] top-[-25px]">Code</span>
            <InputOTP
              value={code}
              className="mb-[64px]"
              maxLength={8}
              render={({ slots }) => (
                <InputOTPGroup className="gap-2">
                  {slots.map((slot, index) => (
                    <React.Fragment key={index}>
                      <InputOTPSlot className="rounded-md border " {...slot} />
                      {index !== slots.length - 1}
                    </React.Fragment>
                  ))}{" "}
                </InputOTPGroup>
              )}
            />
          </form>
        </CardContent>
        <div className="mt-5 flex flex-col items-center space-y-1.5">
          <Button
            onClick={onPressVerify}
            className="h-[56px] w-[456px] text-base font-medium"
          >
            VERIFY
          </Button>
        </div>
      </Card>
    </main>
  );
}

export default Verification;
