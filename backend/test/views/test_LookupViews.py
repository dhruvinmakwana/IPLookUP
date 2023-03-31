import json

import pytest

from backend.app import create_app
import backend.test.mocks.Mocks as Mocks


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


def test_lookup_api_with_single_ip_data_happy_path(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/lookup' page is requested (POST) with single IP
    THEN it return location data associated with IP.
    """
    response = client.post('/api/lookup', json=Mocks.SINGLE_IP_REQUEST)
    assert response.status_code == 200
    assert response.data == Mocks.SINGLE_IP_RESPONSE


def test_lookup_api_with_multi_ip_data_happy_path(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/lookup' page is requested (POST)
    THEN it is redirected to api documentation.
    """
    response = client.post('/api/lookup', json=Mocks.MULTI_IP_REQUEST_SKIP_ON_INVALID)
    assert response.status_code == 200
    assert response.data == Mocks.MULTI_IP_RESPONSE


def test_lookup_api_with_empty_array(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/lookup' page is requested (POST) with empty ip address error
    THEN it return 400 bad request error with error code 1000
    """
    expected = {'error_code': 1000,
                'error_detail': 'Property $.ip_addresses validation failed. [] is too short',
                'error_message': 'Invalid request payload.'}
    response = client.post('/api/lookup', json={"ip_addresses": []})
    assert response.status_code == 400
    assert json.loads(response.data) == expected


def test_lookup_api_with_invalid_ip_removes_invalid_element_from_response(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/lookup' page is requested (POST) with empty ip address error
    THEN it removes element from respose if skip_on_invalid_ip is true
    """
    response = client.post('/api/lookup', json={"ip_addresses": ["invalid_ip"], "skip_on_invalid_ip": True})
    assert response.status_code == 200
    assert len(json.loads(response.data)['results']) == 0


def test_lookup_api_with_invalid_ip_fails(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/lookup' page is requested (POST) with empty ip address error
    THEN it fails with 400 error code
    """
    expected = (b'{"error_code":1000,"error_detail":"\'invalid_ip\' does not appear to be an'
                b' IPv4 or IPv6 address","error_message":"Failed to obtain location details du'
                b'e to invalid IP address(es)."}\n')
    response = client.post('/api/lookup', json={"ip_addresses": ["invalid_ip"]})
    assert response.status_code == 400
    assert response.data == expected


def test_lookup_api_with_ip_not_in_database(client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/lookup' page is requested (POST) with ip address not is database
    THEN it fails with 404 error code
    """
    expected = (b'{"error_code":1002,"error_detail":"The address 0.0.0.0 is not in the databas'
                b'e.","error_message":"No location details associated with IP found"}\n')
    response = client.post('/api/lookup', json={"ip_addresses": ["0.0.0.0"]})
    assert response.status_code == 404
    assert response.data == expected
