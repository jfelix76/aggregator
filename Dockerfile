FROM node:8.11.2
COPY . /var/www/node
WORKDIR /var/www/node
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]