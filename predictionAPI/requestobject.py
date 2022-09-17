import datetime
from pydantic import BaseModel


class RequestObject(BaseModel):
    def __int__(self, data):
        self.__int__(data)
        self.datum: datetime = data["datum"]
        self.temperature: float = data["temperature"]
        self.precipitation: float = data["precipitation"]
        self.people: float = data["people"]
