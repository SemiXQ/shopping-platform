import json

class GoodInfo:
    def __init__(self, goodInfo_json: dict):
        self.good_id = goodInfo_json.get('good_id', None)
        if not self.good_id:
            raise Exception("Missing id in good info")
        self.good_count = goodInfo_json.get('good_count', None)
        if not self.isValid:
            raise Exception("Missing required data in good info")
    
    def isValid(self) -> bool:
        if self.good_id and self.good_count:
            return True
        else:
            return False
    
    def toJson(self) -> str:
        return json.dumps(self, default=lambda obj: obj.__dict__)
    
    def toDict(self) -> dict:
        return self.__dict__

class Cart:    
    def __init__(self, cart_json: dict):
        self.user_id: str = cart_json.get('user_id', None)
        if not self.user_id:
            raise Exception("Missing id in cart")
        self.goods_info: list[GoodInfo] = cart_json.get('goods_info', [])
        self.price_amount: float = cart_json.get("price_amount", 0)
        self.isDirty: bool = cart_json.get("isDirty", False)
        self.timeStamp: int = cart_json.get("timeStamp", 0)
        if not self.isValid:
            raise Exception("Missing required data in cart")
    
    def isValid(self) -> bool:
        # TODO: how to validate timeStamp, isDirty, price_amount, goods_info - Need or not?
        if not self.user_id:
            return False
        else:
            return True
    
    def toJson(self) -> str:
        return json.dumps(self, default=lambda obj: obj.__dict__)
    
    def toDict(self) -> dict:
        return self.__dict__