# Productivity Dashboard

A personal productivity dashboard built with plain HTML, CSS, and JavaScript.

The project includes:

- A frontend dashboard with quick access cards for tasks, daily planning, motivation, and a pomodoro timer.
- Persistent task and planner storage using `localStorage`.
- A motivational quote widget powered by the Quotable API.
- A weather widget backed by an Express proxy server that fetches data from WeatherAPI.
- A theme toggle to switch the dashboard look.

## Repository Structure

- `frontend/`
  - `index.html` — dashboard UI and page structure
  - `style.css` — dashboard styles and layout
  - `script.js` — frontend behavior for feature cards, to-do list, daily planner, timer, quote, and weather
  - `assets/` — static icons, fonts, and favicon
- `backend/`
  - `server.js` — Express backend server that proxies requests to WeatherAPI
  - `package.json` — backend dependencies

## Features

- **To Do List** with add, remove, and important-task marking
- **Daily Planner** with hourly notes persisted across reloads
- **Motivational Quote** fetched from `api.quotable.io`
- **Pomodoro Timer** with start, pause, and reset controls
- **Weather Widget** displaying temperature, condition, heat index, humidity, and wind
- **Theme Switcher** for a light / dark style change

## Getting Started

### Frontend

1. Open `frontend/index.html` in your browser.
2. The dashboard should load and make the weather request automatically.

### Backend (optional)

The backend is optional and can be used to proxy weather requests via WeatherAPI.

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory with the following content:
   ```env
   API_KEY=your_weatherapi_key
   PORT=5000
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### Local Weather Proxy

By default, the frontend currently points to the deployed weather proxy at `https://productivity-dashboard-abp8.onrender.com/weather`.
If you want to use your local backend instead, update the weather endpoint in `frontend/script.js` to:

```js
const response = await fetch(`http://localhost:5000/weather?city=${city}`);
```

## Notes

- The current weather request is for the city `Agra` by default.
- Task and planner entries are saved in browser `localStorage`.
- The backend requires a valid WeatherAPI key.

## Dependencies

- Backend: `express`, `axios`, `cors`, `dotenv`
