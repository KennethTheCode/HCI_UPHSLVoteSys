from pydantic import BaseModel
from datetime import datetime

class Users(BaseModel):
    id: str
    email: str
    program: str
    password: str
    created_at: datetime
    updated_at: datetime