
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://paulekennethd_db_user:17mZTehTiOIqhMEo@cluster0.wlcizog.mongodb.net/?appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db = client['UPHSLVoteSysDB']
collection = db['users']