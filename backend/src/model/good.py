import json

class Good:    
    def __init__(self, good_json: dict):
        self.id: str = good_json.get('id', None)
        if not self.id:
            raise Exception("Missing id in good")
        self.name: str = good_json.get('name', "")
        self.type: str = good_json.get('type', "")
        self.current_price: float = good_json.get('current_price', None)
        self.pre_price: float = good_json.get('pre_price', 0)
        self.favors: int = good_json.get('favors', 0)
        self.on_sale: bool = good_json.get('on_sale', False)
        # TODO: add a default image with 'noImage' path
        self.imageUrl: str = good_json.get('imageUrl', 'noImage')
        if not self.isValid:
            raise Exception("Missing required data in good")
    
    def isValid(self) -> bool:
        if self.id and self.name and self.type and self.current_price:
            if not self.pre_price:
                self.pre_price = 0
            if not self.favors:
                self.favors = 0
            if not self.on_sale:
                self.on_sale = False
            return True
        else:
            return False
    
    def toJson(self) -> str:
        return json.dumps(self, default=lambda obj: obj.__dict__)
    
    def toDict(self) -> dict:
        return self.__dict__