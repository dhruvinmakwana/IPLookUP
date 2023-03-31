from flask_marshmallow import Schema
from flasgger import fields
from marshmallow import post_load

from backend.model.error import SchemaValidationErrorModel, DataValidationErrorModel, ErrorModel, AddressNotFoundModel, \
    InternalServerErrorModel


class ErrorSchema(Schema):
    error_code = fields.Int()
    error_message = fields.Str()
    error_detail = fields.Str()
    error_model = ErrorModel

    @post_load
    def make_error(self, data, **kwargs):
        """
        Generate error_model upon schema load
        @param data:
        @param kwargs:
        @return:
        """
        return self.error_model(**data)


class SchemaValidationErrorSchema(ErrorSchema):

    error_model = SchemaValidationErrorModel


class DataValidationErrorSchema(ErrorSchema):
    error_model = DataValidationErrorModel


class AddressNotFoundSchema(ErrorSchema):
    error_model = AddressNotFoundModel


class InternalServerErrorSchema(ErrorSchema):
    error_model = InternalServerErrorModel
