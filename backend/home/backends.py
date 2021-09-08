import requests
from .models import UserInformation

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
        user_data = response['user']
        users = UserInformation.objects.filter(user_id=user_data[id])
        users_count = UserInformation.objects.filter(user_id=user_data[id]).count()
        print("BE AUTH WAS CALLED***")
        print("Checking existing users: \n")
        print(users)
        if users_count == 0:
            entry = UserInformation()
            entry.user_id = user_data['id']
            entry.first_name = user_data['first_name']
            entry.last_name = user_data['last_name']
            entry.dob = user_data['DOB']
            entry.address = user_data['address']
            entry.city = user_data['city']
            entry.zip_code = user_data['zip_code']
            entry.save()
        return response['user']['id'], response['user']
    except:
        return None
