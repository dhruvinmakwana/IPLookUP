"""[General Configuration Params]
"""
import os

class BaseConfig(object):
    ''' Base config class. '''


class DevelopmentConfig(BaseConfig):
    '''Developement config'''
    GEO_IP_DATABASE=os.path.join(os.path.dirname(__file__),"resources/GeoLite2_City/GeoLite2-City.mmdb")

class StagingConfig(BaseConfig):
    ''' Staging config. '''


class ProductionConfig(BaseConfig):
    ''' Production config '''