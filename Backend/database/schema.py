from datetime import datetime

def user_Data(users):
    return {
        "id": str(users["_id"]),
        "email": users["email"],
        "program": users["program"],
        "password": users["password"],
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }

def all_users(users):
    return [user_Data(user) for user in users]