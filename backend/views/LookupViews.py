from http import HTTPStatus

import marshmallow
from flasgger import SwaggerView
from flask import request
from geoip2.errors import AddressNotFoundError
from jsonschema.exceptions import ValidationError

import backend.schema.lookup as LookupSchemas
import backend.schema.error as ErrorSchemas
import backend.services.ErrorService as ErrorService

from backend.services.GeoDBReader import geoDBReader

class LookupPostView(SwaggerView):

    def get_query_result_model(self, geo_ip_data):
        return LookupSchemas.QueryResultSchema().load({
            'ip_address': geo_ip_data.traits.ip_address,
            'country_code': geo_ip_data.country.iso_code,
            'postal_code': geo_ip_data.postal.code,
            'city_name': geo_ip_data.city.name,
            'location': {
                'time_zone': geo_ip_data.location.time_zone,
                'accuracy_radius': geo_ip_data.location.accuracy_radius,
                'latitude': geo_ip_data.location.latitude,
                'longitude': geo_ip_data.location.longitude,
            }

        }, partial=True)

    parameters = [
        {
            "in": "body",
            "name": "ipAddresses",
            "description": "List of IP addresses to get location data for.",
            "required": True,
            "schema": LookupSchemas.LookupRequestSchema

        }
    ]
    responses = {
        HTTPStatus.OK.value: {
            'description': 'Response containing location details associated with the IP.',
            'schema': LookupSchemas.LookupResponseSchema
        },
        HTTPStatus.BAD_REQUEST.value: {
            'description': 'Cannot get location data due to invalid request data.',
            'schema': ErrorSchemas.SchemaValidationErrorSchema
        },
        HTTPStatus.INTERNAL_SERVER_ERROR.value: {
            'description': 'Server error occurred.',
            'schema': ErrorSchemas.InternalServerErrorSchema
        }
    }
    validation = True

    def validation_handler(self, err:ValidationError, data, schema):
        print(err, data, schema)
        return ErrorService.validation_error("Invalid request payload.","Property {0} validation failed. {1}".format(err.json_path,err.message))

    validation_error_handler = validation_handler

    def post(self):
        """
        API to fetch location details from list of IP addresses.
        """


        ips_query = LookupSchemas.LookupRequestSchema().load(request.json)
        result = []
        for ip in ips_query.ip_addresses:
            try:
                result.append(self.get_query_result_model(geoDBReader.get_reader().city(ip.strip())))
            except Exception as e:
                print(e)
                pass
        return LookupSchemas.LookupResponseSchema().dump({'results': result}), 200
