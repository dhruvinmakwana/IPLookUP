
from flask import Blueprint

from api.views import LookupViews

lookup_api = Blueprint('api', __name__)

lookup_api.add_url_rule('/lookup',
                        view_func=LookupViews.LookupPostView.as_view('lookup'),
                        methods=['POST'])
