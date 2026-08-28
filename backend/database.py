import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")

client = MongoClient(MONGODB_URL)

db = client["landguard"]

predictions_collection = db["predictions"]
reports_collection = db["reports"]

print("MongoDB connected successfully!")