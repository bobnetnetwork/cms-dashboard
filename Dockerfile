FROM nginx:1.17.1-alpine
COPY /dist/cms-dashboard /usr/share/nginx/html

COPY nginx.conf /etc/nginx/

EXPOSE $APP_PORT
