import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function getToastObject(duration) {
  return {
    position: "bottom-right",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
}

/**
 * Create toast based on the options defined above and type passed in
 * @param type
 * @param message
 */
function createToast(type, message) {
  dismissAllToasts();
  switch (type) {
    case "info":
      toast.info(message, getToastObject(1000));
      break;
    case "warn":
      toast.warn(message, getToastObject(3000));
      break;
    case "error":
      toast.error(message, getToastObject(3000));
  }
}

/**
 * dismiss all toast present on the screen.
 */
function dismissAllToasts() {
  toast.dismiss();
}

function createPromiseToast(resolveWithSomeData, messages) {
  toast.promise(resolveWithSomeData, {
    pending: {
      render() {
        return "I'm loading";
      },
      icon: false,
    },
    success: {
      render({ data }) {
        return `Hello ${data}`;
      },
      // other options
      icon: "🟢",
    },
    error: {
      render({ data }) {
        // When the promise reject, data will contains the error
        return data;
      },
    },
  });
}

export { createToast, createPromiseToast, dismissAllToasts };
