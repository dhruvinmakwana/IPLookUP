"""[General Configuration Params]
"""
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

class BaseConfig(object):
    ''' Base config class. '''


class DevelopmentConfig(BaseConfig):
    GEO_IP_DATABASE="resources/GeoLite2_City/GeoLite2-City.mmdb"

class StagingConfig(BaseConfig):
    ''' Staging config. '''


class ProductionConfig(BaseConfig):
    ''' Production config '''