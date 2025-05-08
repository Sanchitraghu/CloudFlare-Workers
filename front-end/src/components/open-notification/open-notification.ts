import { toast } from "react-toastify";

const openNotification = (message: string, type: "success" | "error") => {
  return toast[type](message);
};

export default openNotification;
