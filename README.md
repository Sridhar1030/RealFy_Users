# User CRUD Operations 🚀

A full-stack application demonstrating user management with a React & Tailwind CSS frontend and Node.js & Express backend, using Firebase Firestore as the database.

## ✨ Features

- **Create/Update User**: Manage user profiles with personal information (name, email, age, weight, height, health goals)
- **Search User**: Find users by their name
- **Delete User**: Remove users from the database
- **Get All Users**: View complete user listing

## 🛠️ Technologies Used

### Frontend
- React
- Tailwind CSS
- Axios (for API requests)

### Backend
- Node.js
- Express.js
- Firebase Firestore

## 📦 Installation

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/Sridhar1030/user-crud-operations.git
cd user-crud-operations/Backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a Firebase project
   - Generate a new service account key and download the JSON file
   - Rename the downloaded file to `serviceAccountKey.json` and place it in the `Backend` directory

4. Configure environment variables:
   - Create a `.env` file in the `Backend` directory and add:
   ```env
   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="your_private_key"
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_CLIENT_ID=your_client_id
   FIREBASE_AUTH_URI=your_auth_uri
   FIREBASE_TOKEN_URI=your_token_uri
   FIREBASE_CERT_URL=your_cert_url
   FIREBASE_CLIENT_CERT_URL=your_client_cert_url
   FIREBASE_UNIVERSE_DOMAIN=your_universe_domain
   ```

5. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd user-crud-operations/Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the frontend:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🔌 API Endpoints

### Get All Users
```http
GET /users
```
Fetches all users in the database.

### Create User
```http
POST /users
```
Creates a new user.

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "weight": 70,
    "height": 175,
    "healthGoals": "Lose weight and stay healthy."
}
```

### Update User
```http
PUT /users/:id
```
Updates an existing user by ID. Uses the same request body format as Create User.

### Delete User
```http
DELETE /users/:id
```
Deletes a user by ID.

### Search Users
```http
GET /users/search/:name
```
Searches users by their full name.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

[Sridhar1030](https://github.com/Sridhar1030)

---

Feel free to ⭐ this repository if you find it helpful!