import logging
import os
from flask import Flask
from flasgger import Swagger
from flask_cors import CORS

from backend.config.config import ProductionConfig, DevelopmentConfig
from backend.route.home import home_api
from backend.route.lookup import lookup_api
from backend.services.ErrorService import bad_request_error_handler, internal_server_error_handler
from backend.services.GeoDBReader import geoDBReader

from os import path
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
    app = Flask(__name__,static_folder='../frontend/build',static_url_path='')

    app.url_map.strict_slashes = False
    CORS(app)

    app.config.from_object(config_object())
    geoDBReader.init_app(app)

    from backend.services.RateLimiterService import limiter
    limiter.init_app(app)

    app.register_blueprint(home_api, url_prefix='/')
    app.register_blueprint(lookup_api, url_prefix='/api')

    app.register_error_handler(400,bad_request_error_handler)
    app.register_error_handler(500,internal_server_error_handler)
    Swagger(app)

    return app


if __name__ == '__main__':
    app = create_app()

    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", os.environ['FLASK_RUN_PORT'])))
