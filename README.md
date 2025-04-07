# Next.js Blog App - DevLog

DevLog is a **Next.js 14** blog application powered by **Strapi 5 CMS**, featuring **server-side rendering, API integration, authentication middleware, search, and pagination**.

## Features
- Fetches blog posts from **Strapi 5 CMS**
- Implements **API authentication middleware**
- Supports **search functionality**
- Includes **pagination for blog posts**
- Fully responsive UI built with **Tailwind CSS**
- Deployed on **Vercel**

---

## Prerequisites
Before running this project, make sure you have the following installed on your system:

- **Node.js 18.20.7** (Recommended)
- **npm 10.8.2** or later
- **Git** for cloning the repository

### Project Dependencies
This project is built with the following dependencies:
- **Next.js 14.2.24**
- **React 18**
- **Lodash**
- **Tailwind CSS 3.4.1**
- **TypeScript 5**

---

## Getting Started - Running Locally
### 1. Clone the Repository
```sh
git clone https://github.com/waqqasiq/next-blog-app.git
cd next-blog-app
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following:
```sh
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_STRAPI_URL=https://unwavering-power-a41ed9d21b.strapiapp.com
API_KEY=my-hardcoded-key-2025
```

### 4. Start the Development Server
```sh
npm run dev
```
Your app will be available at **[http://localhost:3000](http://localhost:3000)**.

---

## Middleware Logic (Authentication)
This project uses a **custom authentication middleware** to secure API routes.

### File: `middleware/auth.ts`
```ts
import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.API_KEY || "my-hardcoded-key-2025";

const authMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
    const apiKey = req.headers["x-api-key"];
    
    if (!apiKey || apiKey !== API_KEY) {
        res.status(401).json({ error: "Unauthorized: Invalid API key" });
        return false;
    }

    return true;
};

export default authMiddleware;
```
- Applies to `/api/blogs.ts` and `/api/comments.ts`
- Requires `x-api-key` header in requests
- Returns `401 Unauthorized` if key is missing or incorrect

---

## API Endpoints & Integration
### 1. Fetch Blog Posts
**File:** `/pages/api/blogs.ts`
```sh
GET /api/blogs?page=1&search=next.js
Headers: { "x-api-key": "my-hardcoded-key-2025" }
```
- Supports **pagination**
- Supports **search filtering**

### 2. Fetch a Single Blog Post
```sh
GET /api/blogs/[slug]
Headers: { "x-api-key": "my-hardcoded-key-2025" }
```

### 3. Comments API (CRUD)
#### Fetch Comments for a Blog Post
```sh
GET /api/comments?blogId=123
Headers: { "x-api-key": "my-hardcoded-key-2025" }
```
- Returns all comments for the specified `blogId`
- If no comments exist, returns an empty array

#### Add a Comment
```sh
POST /api/comments?blogId=123
Headers: { "x-api-key": "my-hardcoded-key-2025" }
Body:
{
  "text": "Great post!",
  "author": "Alice"
}
```

#### Edit a Comment
```sh
PUT /api/comments/[commentId]
Headers: { "x-api-key": "my-hardcoded-key-2025" }
Body:
{
  "text": "Updated comment text",
  "author": "Updated author"
}
```

#### Delete a Comment
```sh
DELETE /api/comments/[commentId]
Headers: { "x-api-key": "my-hardcoded-key-2025" }
```

---

## Deployment
The app is deployed on **Vercel**. You can access it at:
[https://next-blog-app-devlog.vercel.app](https://next-blog-app-devlog.vercel.app)

---

## Tech Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend (CMS):** Strapi 5 (hosted on [Strapi Cloud](https://unwavering-power-a41ed9d21b.strapiapp.com))
