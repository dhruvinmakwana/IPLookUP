"""[General Configuration Params]
"""
import os

class BaseConfig(object):
    ''' Base config class. '''


class DevelopmentConfig(BaseConfig):
    '''Developement config'''
    GEO_IP_DATABASE=os.path.join(os.path.dirname(__file__),"../resources/GeoLite2_City/GeoLite2-City.mmdb")
    MAXIMUM_ALLOWED_QUERIES_COUNT=25
    SWAGGER={
        'title': 'IP Lookup API',
    }

class StagingConfig(BaseConfig):
    ''' Staging config. '''


class ProductionConfig(BaseConfig):
    ''' Production config '''