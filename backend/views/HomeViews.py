from flasgger import SwaggerView
from flask import redirect
from flask.views import MethodView


class HomeGetView(MethodView):


    def get(self):
        """
        Redirect root request to API documentation
        """
        return redirect("/apidocs")