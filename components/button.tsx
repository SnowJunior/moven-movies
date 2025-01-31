import { Button } from "@/model/components";
import Image from "next/image";

export default function CustomButton(props: Readonly<Button>) {
  return (
    <button
      type={props.type}
      className={`bg-white w-full flex items-center justify-center gap-3 mt-10 h-16 rounded-md text-black border border-black text-xl ${
        props.isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={props.isLoading}
    >
      <Image
        src={props.image}
        alt="Google logo"
        height="24"
        width="24"
      />
      {props.isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        `${props.title}`
      )}
    </button>
  );
}
