# ☕ Coffee Shop App \- Architecture & Flow Map

This document outlines how the different files in this project interact, following the path from the user's browser all the way to the backend server and back.

## 1\. 🚀 The Startup Flow (How the app boots up)

* **`backend/venv/Scripts/activate`** \---\> Activates the isolated Python environment.  
* **`uvicorn main:app --reload`** \---\> Boots up the FastAPI backend on port 8000\.  
* **`npm run dev`** \---\> Boots up the Next.js frontend on port 3000\.

## 2\. 🔄 The Data Flow (How Frontend talks to Backend)

* **1\. Browser** \---\> User visits `http://localhost:3000` \---\> Calls `frontend/app/page.tsx`.  
* **2\. `frontend/app/page.tsx`** \---\> Executes `fetch("http://localhost:8000/")` \---\> Reaches out to the backend.  
* **3\. `backend/main.py` (CORS)** \---\> Intercepts the request \---\> Checks `CORSMiddleware` \---\> Permits traffic from port 3000\.  
* **4\. `backend/main.py` (Route)** \---\> Routes to `@app.get("/")` \---\> Returns `{"message": "..."}` as JSON.  
* **5\. `frontend/app/page.tsx`** \---\> Receives JSON data \---\> Bakes the message into the Card component \---\> Renders the final HTML.  
* **6\. Browser** \---\> Displays the fully rendered page to the user.

## 3\. 📂 Directory Map & File Purposes

### 🟢 The Backend (`/backend`)

* **`main.py`** \---\> The Brain \---\> Defines API routes and handles database/logic \---\> Sends JSON to the frontend.  
* **`venv/`** \---\> The Engine Room \---\> Holds isolated FastAPI/Uvicorn installations \---\> Prevents system-wide Python conflicts.

### 🔵 The Frontend Configuration (`/frontend`)

* **`package.json`** \---\> The Blueprint \---\> Tracks JS dependencies (React, Next.js) \---\> Tells Node.js what to install/run.  
* **`components.json`** \---\> The shadcn Compass \---\> Configures UI paths \---\> Tells the CLI where to drop new components (like cards and buttons).  
* **`next.config.ts`** \---\> The Next.js Engine Settings \---\> Configures the server \---\> Controls caching behavior and strict rules.  
* **`tsconfig.json` & `eslint.config.mjs`** \---\> The Code Police \---\> Enforce strict TypeScript typing and syntax rules \---\> Catch bugs in VS Code before saving.

### 🎨 The UI Layer (`/frontend/app` & `/frontend/components`)

* **`app/layout.tsx`** \---\> The Master Wrapper \---\> Defines the `<html>` and `<body>` skeleton \---\> Wraps around `page.tsx`.  
* **`app/page.tsx`** \---\> The Active Canvas \---\> Fetches backend data and imports components \---\> Renders the homepage.  
* **`app/globals.css`** \---\> The Paint Bucket \---\> Stores base Tailwind variables (like Zinc colors) \---\> Accessed by components for styling.  
* **`components/ui/card.tsx` & `button.tsx`** \---\> Reusable UI Building Blocks \---\> Imported into `page.tsx` \---\> Render the visual interfaces.  
* **`lib/utils.ts`** \---\> The Toolbox \---\> Contains the `cn()` function \---\> Called by UI components to cleanly merge Tailwind CSS classes.