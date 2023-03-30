
import geoip2.database


class GeoDBReader:
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