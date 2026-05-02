from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database.models import Users
from database.schema import all_users
from configrations import collection  # make sure filename is correct

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

# IMPORTANT: include router
app.include_router(router)