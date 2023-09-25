FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
# RUN npm install -g @nestjs/cli
RUN npm install
EXPOSE 8000
COPY . .
CMD npm run start:dev
