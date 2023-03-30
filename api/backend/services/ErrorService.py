from flask import jsonify, abort, make_response
from werkzeug.exceptions import BadRequest

import backend.schema.error as ErrorSchemas


def get_error_object(status_code,error_schema, message, error_detail ):
    error = error_schema().load({"error_message": message, "error_detail": error_detail})
    response = jsonify(error_schema().dump(error))
    response.status_code = status_code
    return response


def server_error(message, error_detail):
    response = get_error_object(500, ErrorSchemas.InternalServerErrorSchema, message, error_detail)
    abort(make_response(response))


def validation_error(message, error_detail):
    response = get_error_object(400, ErrorSchemas.SchemaValidationErrorSchema, message, error_detail)
    abort(make_response(response))


def address_not_found_error(message, error_detail):
    response = get_error_object(404, ErrorSchemas.AddressNotFoundSchema, message, error_detail)
    abort(make_response(response))


def bad_request_error_handler(e: BadRequest):
    print(e)
    response = get_error_object(400, ErrorSchemas.SchemaValidationErrorSchema, e.name, e.description)
    return make_response(response)


def internal_server_error_handler(e: BadRequest):
    print(e)
    response = get_error_object(400, ErrorSchemas.InternalServerErrorSchema, e.name, e.description)
    return make_response(response)
