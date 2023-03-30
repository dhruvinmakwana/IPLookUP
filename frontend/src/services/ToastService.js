import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


function getToastObject() {
  return {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
}

function createToast(type, message) {
  switch (type) {
    case "info":
      toast.info(message, getToastObject());
      break;
    case "error":
      toast.error(message, getToastObject(message));
  }
}
export default createToast