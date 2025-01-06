from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import MongoDBClient
from django.conf import settings

MONGODB_DATABASE_NAME = settings.MONGODB_NAME


class MongoViewSet(APIView):
    def get(self, request):
        client = MongoDBClient()
        db_name = MONGODB_DATABASE_NAME
        collection_name = 'test_collection'
        data = {'name': 'John Doe', 'age': 30}

        client.create_db_if_not_exists(db_name)
        client.create_collection_if_not_exists(db_name, collection_name)

        inserted_id = client.insert_data(db_name, collection_name, data)
        
        data = client.get_all_data(db_name, collection_name)
        data = list(data)
        # print(f'All data: {data}')
        print(f'Data inserted with ID: {inserted_id}')
        return Response({"message": "MongoDB test view"})
