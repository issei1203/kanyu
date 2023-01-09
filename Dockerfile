FROM node:18
WORKDIR /opt/nodejs
COPY ./ /opt/nodejs/
EXPOSE 8080
CMD ["npm", "start"]