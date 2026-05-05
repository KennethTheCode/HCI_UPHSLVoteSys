from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Users(BaseModel):
    id: Optional[str] = None
    email: str
    program: str
    password: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class Positions(BaseModel):
    id: Optional[str] = None
    position: str

class Candidates(BaseModel):
    id: Optional[str] = None
    name: str
    position: str
    party: str
    img: Optional[str] = None

class ArchiveCandidates(BaseModel):
    id: Optional[str] = None
    name: str
    position: str
    party: str
    img: Optional[str] = None
    archived_at: Optional[datetime] = None

class UserLogin(BaseModel):
    email: str
    password: str

class Vote(BaseModel):
    user_email: str
    position: str
    candidate_id: str
    candidate_name: str
    timestamp: Optional[datetime] = None

class VoteSubmission(BaseModel):
    user_email: str
    votes: dict