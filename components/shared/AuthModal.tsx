import { AuthModalProps } from "@/model/components";
import { signOut } from "next-auth/react";
import React from "react";
import { IoClose } from "react-icons/io5";

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  return (
    <div className="fixed bg-black inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[40%] p-12 lg:p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-700"
        >
          <IoClose size={30} />
        </button>
        <div className="flex flex-col text-black items-center justify-center w-full gap-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">Logout User</p>
            <p className="text-lg">Are you sure you to exit ?</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className={`bg-black w-44 flex items-center justify-center gap-3 h-12 rounded-md text-white text-xl`}
            >
              Cancel
            </button>
            <button
              onClick={() => signOut()}
              className={`bg-red-500 w-44 flex items-center justify-center gap-3 h-12 rounded-md text-white text-xl`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
