import { create } from "zustand";
import fetchIPDetails from "../services/ApiService";

const useIPLookUPStore = create((set, get) => ({
  activeInput: 0,
  multiInputType: false,
  totalInputs: 4,
  ipInputs: ["", "", "", ""],
  bulkIpInputs: [],

  selectedIP:"",
  IPQueryResults:[],

  setSelectedIP: (value) => {
    set((state) => ({ ...state, selectedIP: value }));
  },

  setIPInputValue: (value) => {
    let newIpInputs = [...get().ipInputs];
    newIpInputs[get().activeInput] = value;
    set((state) => ({ ...state, ipInputs: newIpInputs }));
    console.log(get());
  },

  setBulkIPInputValue: (value) => {
    set((state) => ({ ...state, bulkIpInputs: value.split(",").filter(elm=>elm!=="") }));
    console.log(get());
  },

  setFocusedIPInput: (value) => {
    set((state) => ({ ...state, activeInput: value }));
  },

  setInputType: (value) => {
    set((state) => ({ ...state, multiInputType: value }));
  },
  fetchIPDetailsFromAPI: async () => {
    let ipAdressesToQuery;
    if (get().multiInputType) {
      ipAdressesToQuery = [...get().bulkIpInputs];
    } else {
      ipAdressesToQuery = [get().ipInputs.join(".")];
    }

    let data = await fetchIPDetails(ipAdressesToQuery);
    set((state) => ({ ...state, IPQueryResults: data.results }));
    console.log(data);
  },
}));

export default useIPLookUPStore;

