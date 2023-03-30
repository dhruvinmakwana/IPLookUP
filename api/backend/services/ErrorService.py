from flask import jsonify, abort, make_response

import backend.schema.error as ErrorSchemas

def server_error(message, error_detail):
    error = ErrorSchemas.InternalServerErrorSchema().load({"error_message":message, "error_detail":error_detail})
    response = jsonify(ErrorSchemas.InternalServerErrorSchema().dump(error))
    response.status_code = 500
    abort(make_response(response))

def validation_error(message, error_detail):
    error = ErrorSchemas.SchemaValidationErrorSchema().load({"error_message":message, "error_detail":error_detail})
    response = jsonify(ErrorSchemas.SchemaValidationErrorSchema().dump(error))
    response.status_code = 400
    abort(make_response(response))

def address_not_found_error(message, error_detail):
    error = ErrorSchemas.AddressNotFoundSchema().load({"error_message":message, "error_detail":error_detail})
    response = jsonify(ErrorSchemas.AddressNotFoundSchema().dump(error))
    response.status_code = 404
    abort(make_response(response))
