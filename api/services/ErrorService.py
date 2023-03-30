from flask import jsonify, abort, make_response

import api.schema.error as ErrorSchemas


def validation_error(message, error_detail):
    error = ErrorSchemas.SchemaValidationErrorSchema().load({"error_message":message, "error_detail":error_detail})
    response = jsonify(ErrorSchemas.SchemaValidationErrorSchema().dump(error))
    response.status_code = 400
    abort(make_response(response))
