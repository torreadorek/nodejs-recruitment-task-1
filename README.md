# nodejs-recruitment-task-1

Testowe endpointy:

GET /public/logs?from=...&to=...

http://176.107.131.27:8000/public/logs/ff77f0eb-ecaf-44dd-b190-1c8822bf5af8

header:

authorization-token: a5c9700a-684e-11ea-bc55-0242ac130003


GET /public/logs/:uuid

http://176.107.131.27:8000/public/logs?from=1584969746817&to=1584969759222

header:

authorization-token: a5c9700a-684e-11ea-bc55-0242ac130003



POST /internal/users

http://176.107.131.27:8000/internal/users

header:

authorization-token: a5c9700a-684e-11ea-bc55-0242ac130003

body:

username:testuser

permissions: ['read','create']



Uruchomienie aplikacji z repozytorium:

git clone https://github.com/torreadorek/nodejs-recruitment-task-1.git

docker-compose up --build
