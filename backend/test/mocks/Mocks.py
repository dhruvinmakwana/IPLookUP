SINGLE_IP_REQUEST = {
    "ip_addresses": ["8.8.8.81"]
}
SINGLE_IP_RESPONSE = b'{"results":[{"city_name":"Los Angeles","country_code":"US","ip_address":"8.8.8.81","location":{"accuracy_radius":1000,"latitude":34.0544,"longitude":-118,"time_zone":"America/Los_Angeles"},"postal_code":"90009"}]}\n'

MULTI_IP_REQUEST_SKIP_ON_INVALID = {
    "ip_addresses": ["8.8.0.8", "8.8.6.8", "8.8.8.81", "8.8.1.8"],
    "skip_on_invalid_ip": True
}
MULTI_IP_RESPONSE = b'{"results":[{"city_name":"Los Angeles","country_code":"US","ip_address":"8.8.0.8","location":{"accuracy_radius":5,"latitude":34.0544,"longitude":-118,"time_zone":"America/Los_Angeles"},"postal_code":"90009"},{"city_name":"Los Angeles","country_code":"US","ip_address":"8.8.6.8","location":{"accuracy_radius":5,"latitude":34.0544,"longitude":-118,"time_zone":"America/Los_Angeles"},"postal_code":"90009"},{"city_name":"Los Angeles","country_code":"US","ip_address":"8.8.8.81","location":{"accuracy_radius":1000,"latitude":34.0544,"longitude":-118,"time_zone":"America/Los_Angeles"},"postal_code":"90009"},{"city_name":"Los Angeles","country_code":"US","ip_address":"8.8.1.8","location":{"accuracy_radius":5,"latitude":34.0544,"longitude":-118,"time_zone":"America/Los_Angeles"},"postal_code":"90009"}]}\n'
