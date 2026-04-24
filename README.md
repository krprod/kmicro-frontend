# 🚀 kmicro-frontend

Modern React app built with **Vite + TypeScript + TailwindCSS + Redux Toolkit + RBAC**.  
Designed for scalable and micro-frontend-ready architecture.

---

## ⚡ Tech Stack

- React 19 + Vite 7
- TypeScript
- TailwindCSS + shadcn/ui
- Redux Toolkit + Redux Persist
- React Router v7
- React Hook Form + Yup
- Axios
- Grafana Faro (monitoring)

---

## 📦 Setup

```bash
git clone https://github.com/krprod/kmicro-frontend.git
cd kmicro-frontend
npm install
npm run dev
```

App runs at: http://localhost:5173

### 🛡️ Env Var
```bash
VITE_COMMON_ENDPOINT=http://endpoint:port
VITE_USER_LOCAL_STORAGE_TOKEN=customStorageTokenKey
VITE_USER_LOCAL_STORAGE_USER=customStorageUserKey
```
---

## 🛠 Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run preview    # preview build
npm run lint       # lint code
npm run format     # format code
npm run typecheck  # TS check
```

---

## 🧩 Architecture

- Feature-based structure (scalable)
- Centralized state (Redux)
- API layer with Axios
- Ready for micro-frontend integration

---

## 📁 Structure

```
kmicro-frontend/
│
├── src/
│   ├── components/      # Reusable UI components
│   ├── features/        # Feature-based modules (micro-frontend ready)
│   ├── store/           # Redux store setup
│   ├── hooks/           # Custom hooks
│   ├── services/        # API layer (Axios)
│   ├── utils/           # Helper functions
│   ├── routes/          # Routing config
│   └── main.tsx         # App entry point
│
├── public/
├── index.html
├── vite.config.ts
└── package.json
```

---

## 📊 Monitoring

Uses **@grafana/faro-react** for frontend observability.

---

## 👤 Author

krprod → https://github.com/krprod
