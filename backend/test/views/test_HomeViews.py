from backend.app import create_app
import pytest

from backend.app import create_app


@pytest.fixture()
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })

    # other setup can go here

    yield app

    # clean up / reset resources here


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


def test_home_page_redirection(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/' page is requested (GET)
    THEN it is redirected to api documentation.
    """
    response = client.get('/')
    assert response.status_code == 302
    assert response.headers.get("Location")=="/apidocs"