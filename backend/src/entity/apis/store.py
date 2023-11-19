from pymongo.database import Database

def get_all(db: Database):
    try:
        stores = list(db.stores.find())
        return stores
    except Exception as err:
        print("Error in fetching all stores: ", err)