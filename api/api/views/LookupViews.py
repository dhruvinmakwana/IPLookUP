from http import HTTPStatus

import marshmallow
from flasgger import SwaggerView
from flask import request
from jsonschema.exceptions import ValidationError

import api.schema.lookup as LookupSchemas
import api.schema.error as ErrorSchemas
import services.ErrorService as ErrorService
from services.GeoDBReader import geoDBReader


class LookupPostView(SwaggerView):

    def get_query_result_model(self, geo_ip_data):
        return LookupSchemas.QueryResultSchema().load({
            'ip_address': geo_ip_data.traits.ip_address.compressed,
            'country_code': geo_ip_data.country.iso_code,
            'postal_code': geo_ip_data.postal.code,
            'city_name': geo_ip_data.city.name,
            'location': {
                'time_zone': geo_ip_data.location.time_zone,
                'accuracy_radius': geo_ip_data.location.accuracy_radius,
                'latitude': geo_ip_data.location.latitude,
                'longitude': geo_ip_data.location.longitude,
            }

        })

    parameters = [
        {
            "in": "body",
            "name": "ipAddresses",
            "description": "List of ip addresses to get location data for.",
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
        }
    }
    validation = True

    def validation_handler(self, err:ValidationError, data, schema):
        print(err, data, schema)
        return ErrorService.validation_error("Invalid request payload.","Property {0} validation failed. {1}".format(err.json_path,err.message))

    validation_error_handler = validation_handler

    def post(self):
        """
        Colors API using schema
        This example is using marshmallow schemas
        """

        try:
            ips_query = LookupSchemas.LookupRequestSchema().load(request.json)
        except marshmallow.exceptions.ValidationError as e:
            return ErrorService.validation_error("Invalid request payload",str(e))
        result = []
        for ip in ips_query.ip_addresses:
            try:
                result.append(self.get_query_result_model(geoDBReader.get_reader().city(ip)))
            except ValueError as e:
                return ErrorService.validation_error(str(e))
        return LookupSchemas.LookupResponseSchema().dump({'results': result}), 200
