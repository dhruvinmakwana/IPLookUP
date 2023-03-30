
from flask import Blueprint

from backend.views import LookupViews

lookup_api = Blueprint('backend', __name__)

lookup_api.add_url_rule('/lookup',
                        view_func=LookupViews.LookupPostView.as_view('lookup'),
                        methods=['POST'])
