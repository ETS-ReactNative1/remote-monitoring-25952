import requests

def get_user_id(request):
    try:
        token = request.headers.get('Authorization')
    except:
        return None

    url = "https://preventive-counseli-25953.botics.co/api/v1/userinfos/"

    payload={}
    headers = {
    'Authorization': token
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    response = response.json()
    try:
        print(response['user']['id'])
        return response['user']['id'], response['user']
    except:
        return None
