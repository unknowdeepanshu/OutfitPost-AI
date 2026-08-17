# OutfitPost-AI

AI-powered fashion poster creation platform that helps fashion creators, clothing brands, and social-media marketers turn product and model images into polished fashion visuals.

## Why was OutfitPost-AI made?

Creating fashion content usually requires a product photographer, model photography, image editing, background design, and social-media design skills. This project combines those steps into one workflow.

With OutfitPost-AI, a user can:

- Upload a fashion product image and a model image.
- Apply AI-powered virtual try-on for supported fashion categories.
- Generate fashion-focused visuals using an AI agent.
- Edit generated images with background removal, background replacement, and image enhancement.
- Prepare visuals for social-media platforms.
- Authenticate users with Clerk and store application data in MongoDB.
- Store generated image assets through Cloudinary.

The project is built as a small service-oriented system with a React frontend, an Express gateway backend, and a separate TypeScript AI-agent service.

## Architecture

```text
┌──────────────────────┐
│      Frontend        │
│ React + Vite + TS    │
│ Clerk + Redux        │
└──────────┬───────────┘
           │ HTTP
           ▼
┌──────────────────────┐
│   Gateway Service    │
│ Express + MongoDB    │
│ Clerk + Cloudinary   │
└──────────┬───────────┘
           │ HTTP
           ▼
┌──────────────────────┐
│     AI Agent         │
│ TypeScript +         │
│ LangGraph + Groq     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      YouCam API      │
│ Virtual Try-On /     │
│ Image Processing     │
└──────────────────────┘
```

## Main Technologies

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- Axios
- Clerk
- Tailwind CSS
- shadcn/ui
- Recharts

### Gateway Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- Clerk
- Cloudinary
- Multer
- Axios

### AI Agent

- TypeScript
- LangChain
- LangGraph
- Groq
- YouCam APIs
- Axios

## Project Structure

```text
OutfitPost-AI/
├── Frontend/                 # React + Vite application
├── Backend/
│   ├── gateway-service/      # API gateway, auth, database and storage
│   └── Ai-agent/             # AI workflow and YouCam integration
└── README.md
```

## Prerequisites

Install the following before starting:

- Node.js 20+ recommended
- npm
- MongoDB running locally
- Clerk account and application
- Cloudinary account
- Groq API key
- YouCam API credentials

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/unknowdeepanshu/OutfitPost-AI.git
cd OutfitPost-AI
```

### 2. Configure the Frontend

```bash
cd Frontend
npm install
```

Create `Frontend/.env` using the variables described in `Frontend/.env.example`.

Start the frontend:

```bash
npm run dev
```

The Vite development server runs on:

```text
http://localhost:5173
```

### 3. Configure the AI Agent

Open another terminal:

```bash
cd Backend/Ai-agent
npm install
```

Create `Backend/Ai-agent/src/.env` using `Backend/Ai-agent/.env.example` and provide your Groq and YouCam credentials.

Start the AI agent:

```bash
npm run dev
```

The AI agent runs on port `8001` by default.

### 4. Configure the Gateway Service

Open another terminal:

```bash
cd Backend/gateway-service
npm install
```

Create `Backend/gateway-service/.env` from `Backend/gateway-service/.env.example`.

Make sure MongoDB is running locally and the connection string points to:

```text
mongodb://localhost:27017/OutfitPost-AI
```

Start the gateway:

```bash
npm run dev
```

The gateway runs on port `8000` by default.

## Environment Variables

Do not commit real secrets to GitHub.

Use the following example files as templates:

- `Frontend/.env.example`
- `Backend/Ai-agent/.env.example`
- `Backend/gateway-service/.env.example`

The frontend only needs public Vite/Clerk configuration.

Keep backend secrets such as the following private:

- `CLERK_SECRET_KEY`
- `CLERK_WEBHOOK_SIGNING_SECRET`
- `CLOUDINARY_API_SECRET`
- `GROQ_API_KEY`
- `YOU_CAM_API`

### Frontend

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_GATEWAY_API=http://localhost:8000
```

### AI Agent

```env
PORT=8001

GROQ_API_KEY=
YOU_CAM_API=
YOU_CAM_URL=https://yce-api-01.makeupar.com/s2s/v2.0/task

ADD_AGENT=http://localhost:8001/api/v1/Imgae
```

### Gateway Service

```env
PORT=8000
CORS_Origin=http://localhost:5173

# Database
MONGO_URI=mongodb://localhost:27017/OutfitPost-AI

# Clerk
CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SIGNING_SECRET=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Agent Server
AGENT_SERVER=http://localhost:8001/api/v1
```

## Running the Complete Application

Run all three services in separate terminals.

### Terminal 1 — Frontend

```bash
cd Frontend
npm run dev
```

### Terminal 2 — Gateway Service

```bash
cd Backend/gateway-service
npm run dev
```

### Terminal 3 — AI Agent

```bash
cd Backend/Ai-agent
npm run dev
```

Then open the frontend:

```text
http://localhost:5173
```

## Typical Image Generation Workflow

1. The user signs in through Clerk.
2. The user creates a fashion project.
3. The user uploads a product/fashion image and a model image.
4. The gateway receives the request.
5. The gateway communicates with the AI-agent service.
6. The AI agent determines the appropriate fashion workflow.
7. The AI agent calls the required YouCam API.
8. The generated image is returned through the backend flow.
9. Optional image editing can be applied, such as:
   - Background removal
   - Background replacement
   - Image enhancement
10. Generated assets can be stored through Cloudinary.
11. The frontend displays the generated result and project/conversation data.

## Supported Fashion Workflows

The AI-agent service currently contains integrations for fashion-related operations including:

- AI clothes virtual try-on
- AI bag virtual try-on
- AI shoes virtual try-on
- AI hat virtual try-on
- AI scarf virtual try-on
- Background replacement
- Background removal
- Photo enhancement
- AI image generation

## Development Notes

The gateway service is the main backend entry point for the frontend.

The AI-agent service is intentionally separated so that AI orchestration and external image APIs can evolve independently from:

- Authentication
- Database operations
- Application APIs
- File and image storage

This repository is an active project, so API routes, environment variables, and implementation details may change as new features are added.

## License

No project license has been declared yet.
