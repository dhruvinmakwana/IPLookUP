from marshmallow import post_load
from flasgger import Schema, fields

from marshmallow.validate import Length

import backend.model.lookup as LookupModels


class LocationSchema(Schema):
    """
    Schema representing location data associated with IP
    """
    time_zone = fields.Str()
    accuracy_radius = fields.Int()
    latitude = fields.Float()
    longitude = fields.Int()


class QueryResultSchema(Schema):
    """
    Schema representing result of query to find details of an IP
    """
    ip_address = fields.Str()
    country_code = fields.Str(allow_none=True, )
    postal_code = fields.Str(allow_none=True, )
    city_name = fields.Str(allow_none=True, )
    time_zone = fields.Str(allow_none=True, )
    location = fields.Nested(LocationSchema, allow_none=True)

    @post_load
    def make_lookup_response_model(self, data, **kwargs):
        """
        Generate QueryResultModel upon schema load
        @param data:
        @param kwargs:
        @return: QueryResultModel
        """
        return LookupModels.QueryResultModel(**data)


class LookupResponseSchema(Schema):
    """
    Schema representing /lookup API response format
    """
    results = fields.List(fields.Nested(QueryResultSchema))

    @post_load
    def make_lookup_response_model(self, data, **kwargs):
        """
        Generate LookupResponseModel upon schema load
        @param data:
        @param kwargs:
        @return:
        """
        return LookupModels.LookupResponseModel(**data)


class LookupInvalidResponseSchema(Schema):
    """
    Schema representing /lookup API invalid response format
    """
    errors = fields.Dict(keys=fields.Str(), values=fields.List(fields.Str()))

    @post_load
    def make_lookup_invalid_request_model(self, data, **kwargs):
        """
        Generate LookupInvalidResponseModel upon schema load
        @param data:
        @param kwargs:
        @return:LookupInvalidResponseModel
        """
        return LookupModels.LookupInvalidResponseModel(**data)


class LookupRequestSchema(Schema):
    ip_addresses = fields.List(fields.Str(), required=True, validate=Length(min=1, error='No IP addresses provided.'))
    skip_on_invalid_ip=fields.Bool()

    @post_load
    def make_lookup_request_model(self, data, **kwargs):
        """
        Generate LookupRequestModel upon schema load
        @param data:
        @param kwargs:
        @return:LookupRequestModel
        """
        return LookupModels.LookupRequestModel(**data)
