import os
import requests
import base64
import uuid
import pdfkit
from django.template.loader import render_to_string


# Base url
BASE_URL = 'https://api.isharemedicalrecords.com:8443'

# Certificate files
key_file    = 'iShare/cert/api@preventscripts.isharemedicalrecords.com.key.pem'
cert_file   = 'iShare/cert/api@preventscripts.isharemedicalrecords.com.cert.pem'
verify_file = 'iShare/cert/ca-chain.cert.pem'

# headers
headers = {'Content-Type': 'text/plain'}

# proxies
# https://devcenter.heroku.com/articles/quotaguardstatic#http-proxy-with-python-django
proxies = {
    "http": os.getenv('QUOTAGUARDSTATIC_URL', 'QUOTAGUARDSTATIC_URL'),
    "https": os.getenv('QUOTAGUARDSTATIC_URL', 'QUOTAGUARDSTATIC_URL')
}


# Credintials
ISHARE_ACCOUNT_EMAIL = 'api@preventscripts.isharemedicalrecords.com'
ISHARE_ACCOUNT_PASSWORD = 'a6f6y1S0WMyZgFC8GS72'
# ISHARE_ACCOUNT_PASSWORD = os.getenv('ISHARE_ACCOUNT_PASSWORD')



# Send attachment
def send_attachment(direct_address, password, html_file):
    ''' Send attachment - encode file base64 '''

    URL = F'{BASE_URL}/v2/send/message/attachmentjson'

    html_message    = render_to_string(html_file, context={'report': ""})
    # Create random file name
    pdf_file = uuid.uuid4().hex + '.pdf'
    # Create the pdf file in the base dir

    pdfkit.from_string(html_message, pdf_file)

    with open(pdf_file, "rb") as f:
        base64_bytes = base64.b64encode(f.read())

    data = {
        'direct_address': direct_address,
        'password': password,
        'filename': 'assessment.pdf',
        'attachment': base64_bytes.decode('utf-8')
    }

    # send request
    #r = requests.post(URL, json=data, cert=(cert_file, key_file), verify=verify_file, headers=headers, timeout=30, proxies=proxies)
    r = requests.post(URL, json=data, cert=(cert_file, key_file), verify=verify_file, headers=headers, timeout=30)
    
    # remove the pdf file after send the mail
    os.remove(pdf_file)

    # return response
    return r.json()


def mail_provider_ishare(direct_address, password, to, html_file):
    ''' Send assessment attachment request and use it's ID to send the actual email '''
    
    URL = F'{BASE_URL}/v2/send/message'

    # Assessment attachment
    attachment = send_attachment(direct_address=direct_address, password=password, html_file=html_file)

    data = {
        'direct_address': direct_address,
        'password': password,
        'to': to,
        'subject': 'Assessment',
        'body': 'Hello from PreventScript App',
        'attachmentId': attachment['attachmentID'],
    }
    
    # send request
    #r = requests.post(URL, json=data, cert=(cert_file, key_file), verify=verify_file, headers=headers, timeout=30, proxies=proxies)
    r = requests.post(URL, json=data, cert=(cert_file, key_file), verify=verify_file, headers=headers, timeout=30)
    
    # return response
    return r.json()


def mail_provider_ishare_without_attachment(direct_address, password, to):
    ''' Send assessment attachment request and use it's ID to send the actual email '''
    
    URL = F'{BASE_URL}/v2/send/message'
    data = {
        'direct_address': direct_address,
        'password': password,
        'to': to,
        'subject': 'Assessment',
        'body': 'Hello from PreventScript App'
    }
    # send request
    r = requests.post(URL, json=data, cert=(cert_file, key_file), verify=verify_file, headers=headers, timeout=30, proxies=proxies)
    return r.json()
