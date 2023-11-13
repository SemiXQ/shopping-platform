import json
import jwt
from src.env.constants import SECRET_KEY
from datetime import datetime, timedelta

class User:    
    def __init__(self, user_json: dict):
        self.id: str = user_json.get('id', None)
        if not self.id:
            raise Exception("Missing id in user profile")
        self.email: str = user_json.get('email', None)
        if not self.email:
            raise Exception("Missing email in user profile")
        self.name: str = user_json.get('name', "")
        self.default_address: str = user_json.get('default_address', "")
        self.address: list[str] = user_json.get('address', [])
        self.isAdmin: bool = user_json.get("isAdmin", False)
        if not self.isValid:
            raise Exception("Missing required data in user profile")
        else:
            self.token = self._generateToken()
    
    def isValid(self) -> bool:
        if self.id and self.email and self.name and self.default_address and self.address and self.isAdmin:
            # TODO: check if email, default_address and data inside address is valid with regex
            return True
        else:
            return False
    
    def toJson(self) -> str:
        return json.dumps(self, default=lambda obj: obj.__dict__)
    
    def toDict(self) -> dict:
        return self.__dict__
    
    def _generateToken(self):
        token = jwt.encode({
            'usrId': self.id,
            'usrEmail': self.email,
            'exp': datetime.utcnow() + timedelta(minutes=50)
        }, key=SECRET_KEY)
        return token