#!/bin/bash

if [ -n "Config" ]; then
    cd Config
fi

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
