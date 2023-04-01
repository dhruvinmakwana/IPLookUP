import { create } from "zustand";
import fetchIPDetails from "../services/ApiService";
import { createToast } from "../services/ToastService";

const useIPLookUPStore = create((set, get) => ({
  activeInput: 0,
  multiInputType: false,
  totalInputs: 4,
  ipInputs: ["", "", "", ""],
  bulkIpInputs: [],
  selectedIP: "",
  IPQueryResults: [],
  /**
   * Store selected IP
   * @param value
   */ setSelectedIP: (value) => {
    set((state) => ({ ...state, selectedIP: value }));
  },
  /**
   * Store single input value
   * @param value
   */ setIPInputValue: (value) => {
    let newIpInputs = [...get().ipInputs];
    newIpInputs[get().activeInput] = value;
    set((state) => ({ ...state, ipInputs: newIpInputs }));
  },
  /**
   * Store multiline input value
   * @param value
   */ setBulkIPInputValue: (value) => {
    set((state) => ({
      ...state,
      bulkIpInputs: value,
    }));
  },
  /**
   * Set active input box out of 4 sub inputs for an IP
   * @param value
   */ setFocusedIPInput: (value) => {
    set((state) => ({ ...state, activeInput: value }));
  },
  /**
   * Set Input type which indicates if it is single line or multiline input
   * @param value
   */ setInputType: (value) => {
    set((state) => ({
      ...state,
      multiInputType: value,
      bulkIpInputs: [],
      ipInputs: ["", "", "", ""],
    }));
  },
  /**
   * Fetch IP details based on the mode skip_on_invalid_ip mode value
   * if mode is true then invalid IPs are skipped from results array
   * else respective error toast is shown.
   * @param mode
   * @returns {Promise<void>}
   */ fetchIPDetailsFromAPI: async (mode) => {
    let ipAdressesToQuery;
    if (get().multiInputType) {
      ipAdressesToQuery = [
        ...get()
          .bulkIpInputs.split(",")
          .filter((elm) => elm !== ""),
      ];
    } else {
      ipAdressesToQuery = [get().ipInputs.join(".")];
    }
    try {
      createToast("Processing your request. Please wait.");
      let response = await fetchIPDetails(ipAdressesToQuery, mode);
      createToast("Processing your request. Please wait.");
      let data = response.data;
      if (ipAdressesToQuery.length !== data.results.length) {
        createToast("warn", "Invalid IP(s) have been omitted.");
      }
      set((state) => ({
        ...state,
        IPQueryResults: data.results,
        bulkIpInputs: "",
      }));
    } catch (e) {
      if (e?.message === "Network Error") {
        createToast(
          "error",
          "Cannot reach server at the moment. Please try again later."
        );
      } else if (e?.response?.status === 429) {
        set((state) => ({
          ...state,
          IPQueryResults: e.response.data.results,
          bulkIpInputs: "",
        }));
        createToast(
          "error",
          "You cannot request data for more than 25 records in one minute."
        );
      } else if (e?.response?.data?.error_message) {
        createToast("error", e.response.data.error_message);
      } else {
        createToast(
          "error",
          e?.response?.statusText ??
            "Something went wrong please try again later."
        );
      }
    }
  },
}));

export default useIPLookUPStore;
