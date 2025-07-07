# Legacy Rescue Kit

🚀 Full-stack web application for task management with role-based authentication and JWT protection.

---

## 🧰 Tech Stack

- **Backend:** ASP.NET Core 8, Entity Framework Core, Identity, PostgreSQL, JWT
- **Frontend:** Angular (deployed on Vercel)
- **Database:** PostgreSQL (hosted on Render)
- **Deployment:** 
  - Backend → Render
  - Frontend → Vercel

---

## 🌐 Live URLs

- 🔗 **Frontend:** [https://legacy-rescue-kit.vercel.app](https://legacy-rescue-kit.vercel.app)
- 🔗 **API:** [https://legacy-rescue-kit.onrender.com](https://legacy-rescue-kit.onrender.com)

---

## 👥 Test Users

| Role   | Email             | Password   |
|--------|------------------|------------|
| Admin  | admin@legacy.com | Admin123!  |
| User   | user@legacy.com  | User123!   |

---

## 📋 Features

- ✅ User registration & login
- 🔐 JWT-based authentication
- 🛡 Role-based authorization (`Admin` / `User`)
- 📁 Task CRUD operations (assigned to users)
- 📊 Admin panel access control
- 🌍 CORS configured for secure frontend-backend communication

---

## 🔌 API Endpoints (examples)

| Method | Route               | Description           |
|--------|---------------------|-----------------------|
| POST   | `/api/auth/register`| Register a new user   |
| POST   | `/api/auth/login`   | Login and receive JWT |
| GET    | `/api/task`         | Get all tasks (auth)  |
| POST   | `/api/task`         | Create task (auth)    |

---

## ⚙ Backend Configuration

**appsettings.Production.json:**
```json
{
  "JwtSecret": "ThisIsAnExtremelySecureJWTSecretKeyOfAtLeast64CharsLong_1234567890!@#$%^&*()",
  "FrontendUrl": "https://legacy-rescue-kit.vercel.app",
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=...;Port=5432;Database=...;Username=...;Password=..."
  },
  "AllowedHosts": "*"
}
