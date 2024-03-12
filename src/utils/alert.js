import { toast } from "react-toastify";

export const alertMsg = (message, isSuccess) => {
  if (isSuccess) toast.success(message);
  else toast.error(message);
};
