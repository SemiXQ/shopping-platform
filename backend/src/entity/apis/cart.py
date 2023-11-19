from pymongo.database import Database

def get_all(db: Database):
    try:
        carts = list(db.cart.find())
        return carts
    except Exception as err:
        print("Error in fetching all carts: ", err)