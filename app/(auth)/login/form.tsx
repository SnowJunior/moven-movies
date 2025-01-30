"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }
  return (
    <div className="p-8 w-full md:p-14 lg:p-16 text-center z-10 bg-white rounded-lg xl:p-20 text-black">
      <div className="flex flex-col w-full gap-4">
        <button
          onClick={() => signIn("github", { redirectTo: "/dashboard" })}
          className={`bg-white w-full flex items-center justify-center gap-3 mt-10 h-16 rounded-md text-black border border-black text-xl`}
        >
          <Image
            src={"https://authjs.dev/img/providers/github.svg"}
            alt="Google logo"
            height="24"
            width="24"
          />
          Sign in with Github
        </button>
        <p className="mb-[-2.2rem]">OR</p>
        <button
          onClick={() => signIn("google", { redirectTo: "/dashboard" })}
          className={`bg-white w-full flex items-center justify-center gap-3 mt-10 h-16 rounded-md text-black border border-black text-xl`}
        >
          <Image
            src={"https://authjs.dev/img/providers/google.svg"}
            alt="Google logo"
            height="24"
            width="24"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
