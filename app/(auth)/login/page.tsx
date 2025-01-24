import logo from "@/public/images/darkLogo.png"
import React from "react";
import Image from "next/image"
import SignInForm from "./form";

export default function SignInPage() {
    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-custom-gradient text-black">
            <div className="absolute h-screen w-screen inset-0 bg-custom_gradient blur-lg"></div>
            <div className="relative z-20 flex flex-col items-center border-none rounded-xl bg-white w-2/5 p-10 gap-3">
                <Image
                    src={logo}
                    alt="Logo"
                    className="h-32 w-32 object-cover rounded-[50%]"
                />
                <h2 className="capitalize text-4xl font-semibold">Welcome Movener</h2>
                <div className="flex flex-col text-center text-lg gap-4">
                    <p>Glad to see you again 👋🏽</p>
                    <p>Login with Moven ID</p>
                </div>
                <SignInForm/>
            </div>
        </div>
    )
}