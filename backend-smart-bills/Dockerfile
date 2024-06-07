# Stage 1: Build the NestJS application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Create the final image for AWS Lambda
FROM public.ecr.aws/lambda/nodejs:20

# Copy built application from the build stage
COPY --from=build /app ./

# Set the CMD to the handler of your lambda function

CMD ["serverless", "offline"]