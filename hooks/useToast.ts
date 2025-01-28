import { toast } from "react-toastify";

export const showToast = (type: "success" | "error", message: string) => {
  // Setup toastify to handle notifications
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
  }
};
