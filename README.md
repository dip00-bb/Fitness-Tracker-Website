# FitSync – Fitness Tracker Website 🏋️‍♂️

Live Site: [https://fitness-tracker-3b28c.web.app/](https://fitness-tracker-3b28c.web.app/)

## 🔐 Admin Login Credentials
- **Email**: lmovie134@gmail.com  
- **Password**: 123456

---

## 💡 Website Features

1. **Role-Based Dashboard**  
   Supports Admin, Trainer, and User dashboards with individual role privileges.

2. **JWT Authentication System**  
   Secure login and route protection using JSON Web Tokens (JWT).

3. **Firebase Authentication Integration**  
   Provides Google and email/password-based authentication.

4. **Dynamic Class Booking System**  
   Users can view all fitness classes and book them in real-time.

5. **Trainer Application & Management**  
   Any user can apply to become a trainer. Admin can approve/reject trainer applications.

6. **Real-Time Trainer Assignments**  
   Admin can assign approved trainers to available classes.

7. **Admin Class Management**  
   Admin can create, update, delete, and search fitness classes.

8. **Trainer Dashboard**  
   Trainers can create and manage their assigned classes.

9. **Payment Integration**  
   Users can book classes using a secure payment system (Stripe/SSLCommerz).

10. **Newsletter System**  
    Visitors can subscribe to newsletters, and Admin can manage subscriber data.

11. **Search & Pagination**  
    Users can search for classes and navigate using pagination.

12. **User Booking History & Dashboard Overview**  
    Users can see all past bookings and their statuses.

13. **Admin Financial Summary & User Analytics**  
    Admin dashboard includes total revenue, recent transactions, and user data charts.

14. **Responsive Design**  
    Fully responsive UI/UX across mobile, tablet, and desktop using Tailwind CSS.

15. **Protected Routes & Role Validation**  
    Frontend routes are protected by role and JWT validation using React Router and Axios interceptors.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, React Router DOM, Axios, React Query  
- **Backend**: Node.js, Express, MongoDB, JWT  
- **Authentication**: Firebase Auth  
- **Payment**: Stripe or SSLCommerz  
- **Deployment**: Firebase (Frontend), Render/Verce/Glitch (Backend)

---

## 🚀 Getting Started (Development)

### Frontend
```bash
cd client
npm install
npm run dev
