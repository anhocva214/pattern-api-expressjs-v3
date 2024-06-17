#!/bin/bash
docker image rm 3rdapis_api:latest
docker build -t 3rdapis_api:latest .
docker rm -f 3rdapis_api
docker run -it -d --name 3rdapis_api --restart always -p 6800:6800 --network apps --link nginx-proxy --link letsencrypt-nginx-proxy --env TZ=Asia/Ho_Chi_Minh -e VIRTUAL_HOST="api.3rdapis.com" -e VIRTUAL_PORT=6800 -e LETSENCRYPT_HOST="api.3rdapis.com" -e LETSENCRYPT_EMAIL="3rdapis@gmail.com" 3rdapis_api:latest
docker system prune -f