from pymongo.database import Database

def get_all(db: Database):
    try:
        users = list(db.users.find())
        return users
    except Exception as err:
        print("Error in fetching all users: ", err)

def get_user_by_email(db: Database, email: str):
    try:
        user = db.users.find_one({"email": email})
        return user
    except Exception as err:
        print("Error in fetching user by email: ", err)