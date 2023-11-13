import json
from enum import Enum

class OpenTime:
    def __init__(self, timeSlot_json: dict) -> None:
        self.open: str = timeSlot_json.get('open', None)
        self.close: str = timeSlot_json.get('close', None)
        self.day: str = timeSlot_json.get('day', None)
        if not self.isValid:
            raise Exception("Missing required data in open time")
    
    def isValid(self) -> bool:
         if self.open and self.close and self.day:
              # TODO: use regex to check format
              return True
         else:
              return False

class Store:    
    def __init__(self, store_json: dict):
        self.id: str = store_json.get('id', None)
        if not self.id:
            raise Exception("Missing id in store")
        self.name: str = store_json.get('name', "")
        self.lonLatLoc: list[float] = store_json.get('lonLatLoc', [])
        self.address: str = store_json.get('address', "")
        self.postalCode: str = store_json.get('postalCode', "")
        self.phone: str = store_json.get('phone', "")
        self.openTime: list[OpenTime] = store_json.get('openTime', [])
        if not self.isValid:
            raise Exception("Missing required data in store")
    
    def isValid(self) -> bool:
        if self.id and self.name and self.lonLatLoc and self.address and self.openTime:
            # TODO: check if postalCode and phone is valid with regex
            return True
        else:
            return False
    
    def toJson(self) -> str:
        return json.dumps(self, default=lambda obj: obj.__dict__)
    
    def toDict(self) -> dict:
        return self.__dict__