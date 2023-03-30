class ErrorModel:
    def __init__(self, error_code,error_message,error_detail):
        self.error_code = error_code
        self.error_message = error_message
        self.error_detail = error_detail


class SchemaValidationErrorModel(ErrorModel):
    def __init__(self, error_message, error_detail):
        ErrorModel.__init__(self,1000, error_message,error_detail)


class DataValidationErrorModel(ErrorModel):
    def __init__(self, error_message,error_detail):
        ErrorModel.__init__(self, 1001, error_message,error_detail)
