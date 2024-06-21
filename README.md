# backend-server
it's a simple project which shows the users data.
# Express TypeScript Server
A TypeScript-powered backend server using Express for handling submissions.

## Prerequisites
- Node.js and npm installed

## Installation
npm install

## Installation
npm start

The server will be running at http://localhost:3000.

## How to Run

1. Install dependencies: `npm install`
2. Compile TypeScript: `npx tsc`
3. Start the server: `node dist/server.js`

## API Endpoints

- `GET /ping`: Returns `true`
- `POST /submit`: Submits a form (parameters: `name`, `email`, `phone`, `github_link`, `stopwatch_time`)
- `GET /read?index=<index>`: Retrieves a submission by index
