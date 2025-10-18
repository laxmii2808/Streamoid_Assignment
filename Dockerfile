FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

FROM node:18-alpine AS runtime
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
ENV NODE_ENV=production
ENV PORT=8000
EXPOSE 8000
CMD ["npm", "start"]