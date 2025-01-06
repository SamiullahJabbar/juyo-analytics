from pymongo import MongoClient

# import mongodb url from settings
from django.conf import settings

class MongoDBClient:
    _client = None
    
    def __init__(self):
        self.client = MongoDBClient.get_client() 

    @staticmethod
    def get_client():
        if MongoDBClient._client is None:
            MongoDBClient._client = MongoClient(settings.MONGODB_URI)
        return MongoDBClient._client

    def create_db_if_not_exists(self, db_name):
        client = self.client
        db_list = client.list_database_names()
        if db_name not in db_list:
            db = client[db_name]
            return db
        return client[db_name]
    
    def create_collection_if_not_exists(self, db_name, collection_name):
        client = self.client
        db = client[db_name]
        
        collection_list = db.list_collection_names()
        if collection_name not in collection_list:
            collection = db[collection_name]
            return collection
        
        return db[collection_name]
    
    def get_all_data(self, db_name, collection_name):
        return self.client[db_name][collection_name].find()    
    
    @staticmethod
    def get_database(db_name):
        client = MongoDBClient.get_client()
        return client[db_name]

    @staticmethod
    def get_collection(db_name, collection_name):
        db = MongoDBClient.get_database(db_name)
        return db[collection_name]

    def insert_data(self, db_name, collection_name, data):
        collection = self.get_collection(db_name, collection_name)
        result = collection.insert_one(data)
        return result.inserted_id
    
    def get_all_data(self, db_name, collection_name):
        collection = self.get_collection(db_name, collection_name)
        return collection.find()
    