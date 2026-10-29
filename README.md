# 🏰 AlCazar — Premium Furniture E-Commerce Platform

A full-stack web application for selling Class A furniture, built with Next.js 13 (App Router) and Node.js / Express.

---

## 🚀 Tech Stack

### Frontend
| Tech | Version |
|------|---------|
| Next.js | 13.5.4 |
| React | 18 |
| Redux Toolkit | 1.9.7 |
| MUI (Material UI) | 5.14 |
| Axios | 1.5 |
| Formik + Yup | Latest |
| SCSS | Latest |

### Backend
| Tech | Version |
|------|---------|
| Node.js | 18 |
| Express | 4.18 |
| MongoDB + Mongoose | 7.6 |
| JWT | 9.0 |
| Cloudinary | 1.41 |
| Nodemailer | 6.9 |
| Passport (Google OAuth) | 0.6 |
| Joi (Validation) | 17.11 |
| Swagger | 6.2 |

---

## 📁 Project Structure

```
AlCazar/
├── client/              # Next.js Frontend (Port 4500)
│   ├── src/
│   │   ├── app/         # Next.js App Router pages
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React Contexts
│   │   ├── models/      # Modal components
│   │   ├── MUIComponents/  # Custom MUI components
│   │   ├── sections/    # Page sections
│   │   ├── store/       # Redux slices
│   │   └── styles/      # Global SCSS styles
│   └── .env.example     # Environment variables template
│
└── server/              # Express.js Backend (Port 3000)
    ├── controllers/     # Route handlers
    ├── DB/              # MongoDB connection
    ├── mails/           # Email templates
    ├── middleware/       # Express middlewares
    ├── models/          # Mongoose schemas
    ├── routes/          # API routes
    ├── utils/           # Helper utilities
    └── .env.example     # Environment variables template
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Gmail account with App Password enabled

### Backend Setup

```bash
cd server
cp .env.example .env
# Fill in your .env values
npm install
npm run dev
```

Server runs on: `http://localhost:3000`  
API Docs: `http://localhost:3000/api-docs`

### Frontend Setup

```bash
cd client
cp .env.example .env.local
# Fill in your .env.local values
npm install
npm run dev
```

Client runs on: `http://localhost:4500`

---

## 🔌 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shop/items` | Get all items (search, sort, filter, paginate) |
| GET | `/api/shop/items/:itemId` | Get single item |
| GET | `/api/shop/categories` | Get all categories |
| GET | `/api/shop/dimensions` | Get all dimensions |
| POST | `/api/contactWithMe` | Send contact message |
| PATCH | `/api/confirmSubscriptedEmail/:id` | Confirm subscription |

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/forgotPassword` | Forgot password |
| PATCH | `/api/auth/resetPassword/:userId` | Reset password |
| GET | `/api/auth/google` | Google OAuth |

### User (🔒 Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get profile |
| PATCH | `/api/user/editAccount` | Edit account |
| DELETE | `/api/user/deleteAccount` | Delete account |
| POST | `/api/user/addNewAddress` | Add address |
| DELETE | `/api/user/deleteAddress/:id` | Delete address |
| PATCH | `/api/user/editAddress/:id` | Edit address |
| POST | `/api/user/confirmOrder` | Confirm order |
| POST | `/api/user/subscriptedEmail` | Subscribe email |
| DELETE | `/api/user/deleteSubscriptedEmail/:id` | Delete subscription |
| PATCH | `/api/user/changeAvatar` | Change avatar |

### Admin (🔒 Admin Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/addNewItem` | Add item |
| DELETE | `/api/admin/deleteItem/:itemId` | Delete item |
| PATCH | `/api/admin/editItem/:itemId` | Edit item |
| POST | `/api/admin/addNewCategory` | Add category |
| DELETE | `/api/admin/deleteCategory/:categoryId` | Delete category |
| PATCH | `/api/admin/editCategory/:categoryId` | Edit category |
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/user/:id` | Get user |
| DELETE | `/api/admin/deleteUser/:userId` | Delete user |
| PATCH | `/api/admin/editUser/:userId` | Edit user |
| PATCH | `/api/admin/addNewAdmin` | Make user admin |

---

## 🔐 Authentication

Uses JWT tokens stored in cookies.  
Google OAuth 2.0 is also supported.

**Token Cookie:** `AlCazar_token`  
**User ID Cookie:** `AlCazar_userId`

---

## 🌍 Deployment

- **Frontend:** Vercel
- **Backend:** Vercel (serverless) or Railway/Render
- **Database:** MongoDB Atlas
- **Images:** Cloudinary

---

## 👤 Author

**webGhoul** — Mustafa Mahmoud  
GitHub: [@mustafamahmoud8](https://github.com/mustafamahmoud8)
