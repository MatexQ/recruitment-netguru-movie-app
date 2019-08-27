FROM node:10.16.3-alpine as builder

WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:10.16.3-alpine
WORKDIR /app

COPY --from=builder ./app/build/ ./build
COPY package* ./
COPY tsconfig* ./

RUN npm install --production
CMD ["npm", "run", "start:prod"]
