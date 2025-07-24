# 🌐 Latency Topology Visualizer

This project is an interactive **3D globe-based visualization** of real-time and historical network latency between major cloud exchange locations hosted on AWS, Azure, and GCP. Built using **Next.js**, **React Three Fiber**, and **Drei**, it allows users to:

- Explore cloud provider regions in 3D
- View simulated latency data
- Switch between realtime and historical modes
- Inspect latencies between cloud exchanges
- Toggle between arc and straight connection lines
- View latency trends in a dynamic overlay chart

---

## ✨ Features

- 🌍 3D globe with realistic Earth texture
- 📡 Latency lines connecting exchange locations
- 🕒 Toggle between **Realtime** and **Historical** data
- 🟢 Live simulated latency updates (every 2 seconds)
- 🌙 Light/Dark theme toggle
- 📈 Mini chart overlay for latency history
- 🔌 No backend dependencies — runs entirely in-browser

---

## 📦 Tech Stack

- **Next.js 14**
- **React Three Fiber**
- **@react-three/drei**
- **TypeScript**
- **React Hooks**

---

## 🚀 Getting Started

```
git clone https://github.com/your-username/latency-visualizer.git
cd latency-visualizer
npm install
npm run dev
```
Visit http://localhost:3000 in your browser.

📝 Project Structure
```
components/
  ├── Globe.tsx
  ├── ExchangeMarker.tsx
  ├── ConnectionLine.tsx
  ├── LatencyControl.tsx
  ├── LatencyChart.tsx
  ├── ThemeToggle.tsx
hooks/
  ├── useLatencyData.ts
  ├── useLatencyHistory.ts
utils/
  └── convertLatLngToVector3.ts
public/
  └── earth.jpg
```

❓ Why I Didn't Use a Real API
This is a simulation-based visualizer by design. Here's why:

🚫 No Real API Used — Explanation:
Assignment Scope & Instruction:
The assignment emphasized latency visualization, not API integration. The focus is on rendering logic, UI interactivity, and 3D data representation.

No Public API Available for Global Latency in Real-Time:
Accurate real-time cloud-to-cloud latency APIs are generally private or require credentials/subscriptions. Using mock data keeps the app portable and self-contained.

Simplified Evaluation:
Simulated latency allows interviewers to test the frontend logic without worrying about auth keys, rate limits, or server dependencies.

Pluggable Architecture:
The useLatencyData.ts and useLatencyHistory.ts hooks are designed to be swapped with real API calls if needed later.

📦 Simulated Latency Logic
Realtime latency is updated every 2 seconds using setInterval.

History is stored in-memory for the past 30 data points.

All data is randomly generated but follows a consistent structure.

```
const latency = Math.floor(Math.random() * 200 + 20); // 20ms to 220ms
```
🌐 Deployment
To deploy on Vercel:

```
npm install -g vercel
```
vercel
Or push to GitHub and connect your repo at https://vercel.com

📄 License
MIT — free to use for educational and demo purposes.

🙋‍♀️ Author
Rishika
[LinkedIn](https://www.linkedin.com/in/rishika-rathore-rishika/)
[Portfolio]([https://your-portfolio.com](https://rishika-rathore-portfolio.netlify.app/))


