# Box dir
# https://21stcenturyedge.app.box.com/s/v2zxbhb40jb5mp09nu4yjgqu3lpq8g4z


import requests


def list_messages():
    # Base url
    api_url = 'https://api.test.isharemedicalrecords.com:8443/v2/get/messages'

    # ref certificates
    key_file    = 'cert/preventscripts@test.isharemedicalrecords.com.key.pem'
    cert_file   = 'cert/preventscripts@test.isharemedicalrecords.com.cert.pem'

    # Payload
    data = {
        'direct_address': 'preventscripts@test.isharemedicalrecords.com',
        'password': 'a6f6y1S0WMyZgFC8GS72',
        'limit': 2
    }

    # headers
    headers = {
        'cache-control': 'no-cache'
    }

    # r = requests.post(api_url, data=data, cert=(cert_file, key_file), verify=cert_file, headers=headers, timeout=30)
    r = requests.post(api_url, data=data, cert=(cert_file, key_file), verify=False, headers=headers, timeout=30)


if __name__ == '__main__':
    # run the func
    list_messages()