import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { SignIn } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const data = api.category.categoryList.useQuery();

  const user = useUser();

  console.log(user);

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
        </CardContent>
        <div className="mt-5 flex flex-col items-center space-y-1.5"></div>
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
