"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/images/lightLogo.png";
import { Avatar } from "@heroui/avatar";
import AuthModal from "./AuthModal";

const TopNavbar = ({ name }: { name?: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleCloseModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="h-24 bg-black text-white">
      <div className="flex flex-row w-[90%] mx-auto items-center justify-between mt-4">
        <div className="flex flex-row gap-4 items-center">
          <Image
            className="rounded-[50%]"
            src={logo}
            alt="moven image"
            width={70}
            height={70}
          />
          <h2 className="text-xl font-bold hidden sm:block">Dashboard</h2>
        </div>
        <div onClick={handleCloseModal} className="flex gap-2 cursor-pointer">
          <div className="flex gap-4 items-center">
            <Avatar
              isBordered
              color="success"
              size="lg"
              src={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
              alt="moven image"
            />
            <div className="text-lg">@{name}</div>
          </div>
        </div>
        {isOpen && <AuthModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default TopNavbar;
