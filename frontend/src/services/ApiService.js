import { createToast } from "./ToastService";
import axios from "axios";

async function fetchIPDetails(ipadresses) {
  let response;
  try {
    createToast("info", "Processing your request.");
    response = await axios.post("http://127.0.0.1:5000/api" + "/lookup/", {
      ip_addresses:ipadresses
    });
      return response.data;
    throw new Error("Something went wrong");
  } catch (e) {
    createToast("error", e.response.data.error_message);
  }
}

export default fetchIPDetails;