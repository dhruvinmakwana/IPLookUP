class QueryResultModel:
    def __init__(self, ip_address, country_code, postal_code, city_name, location):
        self.ip_address = ip_address
        self.country_code = country_code
        self.postal_code = postal_code
        self.city_name = city_name
        self.location = location


class LookupResponseModel:
    def __init__(self, results):
        self.results = results


class LookupRequestModel:
    def __init__(self, ip_addresses,skip_on_invalid_ip=False):
        self.ip_addresses = ip_addresses
        self.skip_on_invalid_ip = skip_on_invalid_ip


class LookupInvalidResponseModel:
    def __init__(self, message):
        self.message = message
