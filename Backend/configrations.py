
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://paulekennethd_db_user:17mZTehTiOIqhMEo@cluster0.wlcizog.mongodb.net/?appName=Cluster0&retryWrites=false"

# Create a new client and connect to the server
client = MongoClient(
    uri, 
    server_api=ServerApi('1'),
    tlsAllowInvalidCertificates=True,
    connect=False
)

db = client['UPHSLVoteSysDB']
collection = db['users']
positions = db['positions']
candidates = db['candidates']
archive_candidates = db['archive_candidates']
votes = db['votes']