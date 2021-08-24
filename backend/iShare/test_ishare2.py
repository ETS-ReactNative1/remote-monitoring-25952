import requests
import json


def list_messages():
    # Base url
    api_url = 'https://api.test.isharemedicalrecords.com:8443/v2/get/messages'

    # Old sent cert
    # key_file    = 'cert/api@preventscripts.isharemedicalrecords.com.key.pem'
    # cert_file   = 'cert/api@preventscripts.isharemedicalrecords.com.cert.pem'

    # New sent cert
    key_file    = 'test_cert/preventscripts@test.isharemedicalrecords.com.key.pem'
    cert_file   = 'test_cert/preventscripts@test.isharemedicalrecords.com.cert.pem'

    # Payload
    data = {
        'direct_address': 'preventscripts@test.isharemedicalrecords.com',
        'password': 'a6f6y1S0WMyZgFC8GS72',
        'limit': 2
    }

    # headers
    headers = {
        'Content-Type': 'text/plain'
    }
    r = requests.post(api_url, json=data, cert=(cert_file, key_file), verify='test_cert/api.ca-chain.cert.pem', headers=headers, timeout=30)
    print(r.text)

if __name__ == '__main__':
    # run the func
    list_messages()
