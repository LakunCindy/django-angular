# django-angular


Pour travailler sur la bonne branch : git checkout develop


Pour la partie serveur :
    - Démarrage : A la racine de TME_webAPI : py -m venv env 
                                             .\env\Scripts\activate
                  mySearchEngine: pip3 install django djangorestframework requests
                                  pip install django-cors-headers
                                  pip install djangorestframework_simplejwt
                                  py manage.py createsuperuser
                                  py manage.py runserver


Pour la partie client : 
    -Démarrage : A la racine de BTBO2 : npm i puis npm start

dans la partie my search engine pour acceder a la page hello il faut faire curl http://127.0.0.1:8000/hello/ --header "Authorization:Bearer token"
