from flask import Blueprint

from backend.views import HomeViews

home_api = Blueprint('home', __name__)

home_api.add_url_rule('/',
                      view_func=HomeViews.HomeGetView.as_view('backend'),
                      methods=['GET'])
