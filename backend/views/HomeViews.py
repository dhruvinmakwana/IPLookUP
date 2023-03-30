from flasgger import SwaggerView
from flask import redirect


class HomeGetView(SwaggerView):


    def get(self):
        """
        Redirect root request to API documentation
        """
        return redirect("/apidocs")