FROM node:18-alpine
COPY public/ /public
COPY src/ /src
COPY package.json package.json
RUN npm install
EXPOSE 3000/udp
EXPOSE 3000/tcp
ENTRYPOINT ["npm", "start"]