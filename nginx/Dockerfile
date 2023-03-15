FROM nginx
COPY ./client/build/* /usr/share/nginx/html/
EXPOSE 80
COPY ./default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
