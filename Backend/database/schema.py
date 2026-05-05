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

def position_Data(position):
    return {
        "id": str(position["_id"]),
        "position": position["position"],
        "image": position.get("image")
    }

def all_positions(positions):
    return [position_Data(position) for position in positions]

def candidate_Data(candidate):
    return {
        "id": str(candidate["_id"]),
        "name": candidate.get("name", "Unknown Name"),
        "position": candidate.get("position", "Unknown Position"),
        "party": candidate.get("party", "No Party"),
        "img": candidate.get("img", "No Image")
    }

def all_candidates(candidates):
    return [candidate_Data(candidate) for candidate in candidates]

def archive_candidate_Data(candidate):
    return {
        "id": str(candidate["_id"]),
        "name": candidate.get("name", "Unknown Name"),
        "position": candidate.get("position", "Unknown Position"),
        "party": candidate.get("party", "No Party"),
        "img": candidate.get("img", "No Image"),
        "archived_at": datetime.now()
    }

def all_archive_candidates(candidates):
    return [archive_candidate_Data(candidate) for candidate in candidates]

def user_login_Data(user):
    return {
        "email": user["email"],
        "password": user["password"]
    }

def all_user_logins(users):
    return [user_login_Data(user) for user in users]