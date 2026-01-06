"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoogleOutlined } from "@ant-design/icons";

import { signUP } from "./auth/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Authenticaiton({ type }: { type: string }) {
  const route = useRouter();

  return (
    <section className="flex p-10 flex-grow">
      <div className="basis-[60%] relative rounded-md overflow-hidden">
        <Image
          src={
            "https://images.unsplash.com/photo-1506875644286-0fa3dc4df91f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="image-auth"
          fill
          className=" absolute w-full h-full"
        />
      </div>
      <div className="flex-grow flex justify-center items-center">
        <div className=" flex flex-col gap-5 text-center">
          <h2 className=" text-5xl">Create an account</h2>
          <p>
            Already have an account?{" "}
            <Link className=" underline" href={""}>
              Log In
            </Link>
          </p>

          <Button
            onClick={async (ev) => {
              ev.preventDefault();
              try {
                await signUP();
                route.push("/dashboard");
              } catch (error) {}
            }}
            className="mt-10"
          >
            <GoogleOutlined /> Login with Google
          </Button>
        </div>
      </div>
    </section>
  );
}
