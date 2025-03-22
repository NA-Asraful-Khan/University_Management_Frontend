# University Management System - Frontend

This is the frontend of the **University Management System**, built using the MERN stack. It provides an intuitive UI for managing users, courses, and academic programs. The project features secure authentication, role-based access control, and a responsive design using **Ant Design**.

## 🚀 Features

- 🔑 Secure authentication with JWT
- 🏫 Role-based access control (Admin, Faculty, Student)
- 📚 CRUD operations for courses and academic programs
- 📊 Dynamic dashboard with data visualization
- 🎨 Responsive UI with Ant Design and Redux for state management

## 🛠️ Tech Stack

- **React.js** - Frontend framework
- **Redux** - State management
- **Ant Design** - UI components
- **Axios** - API communication
- **React Router** - Navigation

## ⚡ Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/university-management-frontend.git
   cd university-management-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file in the project root and add the following environment variables:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## 📜 Folder Structure

```
/src
  ├── assets/           # Asset of the App
  ├── components/       # Reusable UI components
  ├── config/           # configuration information
  ├── constants/        # Type Constants
  ├── hooks/            # Custom hooks
  ├── lib/              # Library dependencies
  ├── pages/            # Application pages
  ├── redux/            # Redux store and slices
  ├── routes/           # Routing
  ├── schemas/          # Application
  ├── styles/           # Application styles
  ├── utils/            # Utility functions
  ├── App.tsx           # Main component
  ├── main.tsx          # Entry point
```

## 🚀 Deployment

To build the project for production:

```bash
npm run build
```

The build files will be available in the `build/` directory.

## 👨‍💻 Contributors

- [Your Name](https://github.com/your-username)

## 📜 License

This project is licensed under the MIT License.
