# Simple Node.js Backend for React Native Learning

This is a **simple backend server** built with Node.js, Express, and MongoDB (Atlas) for learning purposes.  
It is designed to connect with a React Native project and handle basic user operations such as registration and password hashing.

---

## Features

- Create new users with **unique usernames**  
- Passwords are securely **hashed using bcrypt**  
- Each user gets a **2-digit string ID** (e.g., "01", "12")  
- Stores data in a **remote MongoDB Atlas cluster** (`spotify` database, `users` collection)  
- Uses **environment variables** for configuration (MongoDB URI, bcrypt salt rounds, server port)

---

## Prerequisites

- Node.js (v16+)  
- npm  
- MongoDB Atlas account and cluster  
- React Native project (to connect to this server)

---

## Installation

#1. Clone the repository:
git clone 

#2.Install dependencies:
npm install

#3.Run the server
npm run dev
