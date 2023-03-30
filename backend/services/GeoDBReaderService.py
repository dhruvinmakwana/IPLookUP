
import geoip2.database


class GeoDBReader:
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(GeoDBReader, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        self.reader = None
        self.app = None
    def init_app(self, app):
        self.app = app
        self.connect()
    def connect(self):
        self.reader = geoip2.database.Reader(self.app.config['GEO_IP_DATABASE'])
        return self.reader

    def get_reader(self):
        if not self.reader:
            return self.connect()
        return self.reader