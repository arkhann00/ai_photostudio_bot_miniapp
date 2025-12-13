FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --no-audit --no-fund

COPY . .

EXPOSE 5111

CMD ["sh", "-c", "npm install --no-audit --no-fund && npm rebuild esbuild --force && npm run dev -- --host 0.0.0.0 --port 5111"]
