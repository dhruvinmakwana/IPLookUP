import logging
import os
from flask import Flask
from flasgger import Swagger
from flask_cors import CORS

from backend.route.home import home_api
from backend.route.lookup import lookup_api
from backend.services.ErrorService import bad_request_error_handler, internal_server_error_handler
from backend.services.GeoDBReader import geoDBReader

from .config import ProductionConfig, DevelopmentConfig
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

def config_object():
    if os.environ['ENV'] == 'production':
        return ProductionConfig()
    elif os.environ['ENV'] == 'development':
        return DevelopmentConfig()


def create_app():
    logging.getLogger('flask_cors').level = logging.DEBUG
    app = Flask(__name__)
    app.config
    app.url_map.strict_slashes = False
    CORS(app)
    app.config['SWAGGER'] = {
        'title': 'IP Lookup API',
    }
    app.config.from_object(config_object())
    geoDBReader.init_app(app)

    app.register_blueprint(home_api, url_prefix='/')
    app.register_blueprint(lookup_api, url_prefix='/api')

    app.register_error_handler(400,bad_request_error_handler)
    app.register_error_handler(500,internal_server_error_handler)
    Swagger(app)

    return app


if __name__ == '__main__':
    app = create_app()

    # app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
