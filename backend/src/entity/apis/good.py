from pymongo.database import Database

def get_all(db: Database):
    try:
        goods = list(db.goods.find())
        return goods
    except Exception as err:
        print("Error in fetching all goods: ", err)