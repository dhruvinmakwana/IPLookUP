from marshmallow import post_load
from flasgger import Schema, fields

from marshmallow.validate import Length

import backend.model.lookup as LookupModels


class LocationSchema(Schema):
    time_zone = fields.Str()
    accuracy_radius = fields.Int()
    latitude = fields.Float()
    longitude = fields.Int()


class QueryResultSchema(Schema):
    ip_address = fields.Str()
    country_code = fields.Str(allow_none=True, default="Data not available")
    postal_code = fields.Str(allow_none=True, default="Data not available")
    city_name = fields.Str(allow_none=True, default="Data not available")
    time_zone = fields.Str(allow_none=True, default="Data not available")
    location = fields.Nested(LocationSchema, allow_none=True, default={})

    @post_load
    def make_lookup_response_model(self, data, **kwargs):
        return LookupModels.QueryResultModel(**data)


class LookupResponseSchema(Schema):
    results = fields.List(fields.Nested(QueryResultSchema))

    @post_load
    def make_lookup_response_model(self, data, **kwargs):
        return LookupModels.LookupResponseModel(**data)


class LookupInvalidResponseSchema(Schema):
    errors = fields.Dict(keys=fields.Str(), values=fields.List(fields.Str()))

    @post_load
    def make_lookup_invalid_request_model(self, data, **kwargs):
        return LookupModels.LookupInvalidResponseModel(**data)


class LookupRequestSchema(Schema):
    ip_addresses = fields.List(fields.Str(), required=True, validate=Length(min=1, error='No IP addresses provided.'))

    def swag_validation_function(self, data, main_def):
        self.load(data)

    @post_load
    def make_lookup_request_model(self, data, **kwargs):
        return LookupModels.LookupRequestModel(**data)
