from flask import redirect, send_from_directory, current_app
from flask.views import MethodView


class HomeGetView(MethodView):


    def get(self):
        """
        Redirect root request to API documentation
        """
        return send_from_directory(current_app.static_folder, 'index.html')