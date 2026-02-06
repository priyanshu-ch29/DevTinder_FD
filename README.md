# DevTinder (Frontend)

Frontend for **DevTinder** — a Tinder-like developer networking app where you can:

- browse a feed of developer profiles
- mark profiles as **Interested** or **Ignored**
- view **Connections**
- review incoming **Connection Requests** (Accept / Reject)
- manage your **Profile**

Built with **React (Vite)**, **Redux Toolkit**, **React Router**, **TailwindCSS**, and **daisyUI**.

---

## Tech Stack

- **React 19** + **Vite**
- **React Router DOM**
- **Redux Toolkit** + **React Redux**
- **TailwindCSS** + **daisyUI**
- **Axios** (cookie-based auth via `withCredentials: true`)

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A running backend server (see **Backend API requirements**)

### Install

```bash
npm install
```

### Run (dev)

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Backend API Requirements

This frontend expects a backend running at:

- `http://localhost:5010` (configured in `src/utils/constant.js` as `BASE_API_URL`)

Authentication is cookie-based:

- All authenticated requests use `axios` with `withCredentials: true`
- Your backend must enable CORS with credentials and allow the frontend origin.

### API endpoints used by the UI

- **Auth**
  - `POST /auth/login`
  - `POST /auth/signup`
  - `POST /auth/logout`

- **Profile**
  - `GET /profile/view` (used on app load to restore session)
  - `PATCH /profile/edit`

- **Feed**
  - `GET /user/view/feed`

- **Connections**
  - `GET /user/view/connection`

- **Requests**
  - `GET /user/request/recieved`

- **Send / review requests**
  - `POST /request/send/:status/:userId`
    - statuses used: `interested`, `ignored`
  - `POST /request/review/:status/:requestId`
    - statuses used: `accepted`, `rejected`

---

## Routes (Frontend)

Defined in `src/App.jsx`:

- `/` - Feed
- `/login` - Login / Signup
- `/profile` - Edit profile
- `/connections` - Connections list
- `/requests` - Incoming connection requests

---

## State Management

Redux store (`src/store/store.js`) contains:

- `user` slice: logged-in user (or `null`)
- `feed` slice: list of profiles for the feed

---

## Styling

- Tailwind + daisyUI are enabled in `src/index.css`:
  - `@import "tailwindcss";`
  - `@plugin "daisyui";`

---
