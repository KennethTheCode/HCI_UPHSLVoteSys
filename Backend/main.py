from datetime import datetime

from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from bson.errors import InvalidId

from database.models import UserLogin, Users, Positions, Candidates, ArchiveCandidates, Vote, VoteSubmission

from configrations import collection
from configrations import positions
from configrations import candidates
from configrations import archive_candidates
from configrations import votes

from database.schema import all_candidates
from database.schema import all_users
from database.schema import all_positions

app = FastAPI()
router = APIRouter()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root
@app.get("/")
async def root():
    return {"message": "Hello World"}

# Get all users
@app.get("/users")
async def view_users():
    data = collection.find()
    return all_users(data)

# Create user
@router.post("/users")
async def create_user(new_user: Users):
    try:
        resp = collection.insert_one(new_user.model_dump())
        return {"status": 200, "id": str(resp.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error: {e}")

# Get all positions
@app.get("/positions")
async def view_positions():
    data = positions.find()
    return all_positions(data)

@router.post("/positions")
async def create_position(new_position: Positions):
    try:
        resp = positions.insert_one(new_position.model_dump())
        return {"status": 200, "id": str(resp.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error: {e}")

# Get all candidates
@app.get("/candidates")
async def view_candidates():
    data = candidates.find()
    return all_candidates(data)

@router.post("/candidates")
async def create_candidate(new_candidate: Candidates):
    try:
        resp = candidates.insert_one(new_candidate.model_dump())
        return {"status": 200, "id": str(resp.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error: {e}")

@router.post("/candidates/archive/{candidate_id}")
async def archive_candidate(candidate_id: str):
    try:
        try:
            candidate_obj_id = ObjectId(candidate_id)
        except InvalidId:
            raise HTTPException(status_code=400, detail="Invalid candidate ID")

        candidate = candidates.find_one({"_id": candidate_obj_id})
        if not candidate:
            raise HTTPException(status_code=404, detail="Candidate not found")

        archive_doc = {
            **candidate,
            "archived_at": datetime.now()
        }
        archive_doc.pop("_id", None)

        archive_candidates.insert_one(archive_doc)
        candidates.delete_one({"_id": candidate_obj_id})

        return {"status": 200, "id": candidate_id, "message": "Candidate archived"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error: {e}")

@router.put("/candidates/{candidate_id}")
async def update_candidate(candidate_id: str, updated_candidate: Candidates):
    try:
        try:
            candidate_obj_id = ObjectId(candidate_id)
        except InvalidId:
            raise HTTPException(status_code=400, detail="Invalid candidate ID")

        existing_candidate = candidates.find_one({"_id": candidate_obj_id})
        if not existing_candidate:
            raise HTTPException(status_code=404, detail="Candidate not found")

        update_data = {k: v for k, v in updated_candidate.model_dump().items() if v is not None}
        if not update_data:
            raise HTTPException(status_code=400, detail="No valid fields to update")

        candidates.update_one({"_id": candidate_obj_id}, {"$set": update_data})
        return {"status": 200, "id": candidate_id, "message": "Candidate updated"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error: {e}")
    
@router.post("/login")
async def authenticate_user(user_login: UserLogin):
    try:
        user = collection.find_one({"email": user_login.email})

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # ✅ Check password
        if user["password"] != user_login.password:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return {
            "status": 200,
            "message": "Login successful",
            "user": all_users([user])[0]
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error: {e}")

@router.post("/vote")
async def submit_vote(vote_submission: VoteSubmission):
    try:
        # Verify user exists
        user = collection.find_one({"email": vote_submission.user_email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Store each vote (position->candidate pair)
        vote_entries = []
        for position_name, candidate in vote_submission.votes.items():
            vote_doc = {
                "user_email": vote_submission.user_email,
                "position": position_name,
                "candidate_id": candidate.get("id"),
                "candidate_name": candidate.get("name"),
                "timestamp": datetime.now()
            }
            result = votes.insert_one(vote_doc)
            vote_entries.append({
                "position": position_name,
                "candidate_name": candidate.get("name"),
                "vote_id": str(result.inserted_id)
            })

        return {
            "status": 200,
            "message": "Vote submitted successfully",
            "vote_count": len(vote_entries),
            "votes": vote_entries
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error: {e}")

@router.get("/vote-summary")
async def get_vote_summary():
    try:
        # Aggregate votes by position and candidate
        pipeline = [
            {
                "$group": {
                    "_id": {
                        "position": "$position",
                        "candidate_name": "$candidate_name",
                        "candidate_id": "$candidate_id"
                    },
                    "vote_count": {"$sum": 1}
                }
            },
            {
                "$sort": {"_id.position": 1, "vote_count": -1}
            }
        ]

        results = list(votes.aggregate(pipeline))

        # Group by position
        summary = {}
        for result in results:
            position = result["_id"]["position"]
            if position not in summary:
                summary[position] = []

            summary[position].append({
                "candidate_name": result["_id"]["candidate_name"],
                "candidate_id": result["_id"]["candidate_id"],
                "vote_count": result["vote_count"]
            })

        return {
            "status": 200,
            "summary": summary,
            "total_votes": sum(len(candidates) for candidates in summary.values())
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error: {e}")

# IMPORTANT: include router
app.include_router(router)