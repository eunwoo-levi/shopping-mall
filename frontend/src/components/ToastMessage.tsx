import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = () => {
  const { toastMessage } = useSelector((state: any) => state.ui);

  useEffect(() => {
    if (toastMessage) {
      const { message, status } = toastMessage;
      if (message !== "" && status !== "") {
        //  toast[status](message, { theme: "colored" });
        switch (status) {
          case "success":
            toast.success(message, { theme: "colored" });
            break;
          case "error":
            toast.error(message, { theme: "colored" });
            break;
          case "info":
            toast.info(message, { theme: "colored" });
            break;
          case "warning":
            toast.warning(message, { theme: "colored" });
            break;
          default:
            break;
        }
      }
    }
  }, [toastMessage]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastMessage;
