FROM node:16-alpine

WORKDIR /hms

ENV PORT 8000

ENV HOST 0.0.0.0

COPY package.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm","start"]

# sqlinjection-381208