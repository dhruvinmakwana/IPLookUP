import axios from "axios";

/**
 * Fetches geo-location data about list of IP addresses and mode provided
 * if mode is true then invalid ips are skiped from then results
 * else respective error toast is show.
 * @param ipAdresses
 * @param skip_on_invalid_ip
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
function fetchIPDetails(ipAdresses,skip_on_invalid_ip=false) {
    return axios.post("/api/lookup/", {
        ip_addresses: ipAdresses,
        skip_on_invalid_ip:skip_on_invalid_ip
    });
}

export default fetchIPDetails;