This project is a web application built with React and Node.js that allows users to detect Estonian number plates from images. The application uses the Clarifai API for image recognition and provides a user-friendly interface for uploading images and viewing results. Here are some key features of your project:

User Authentication: Users can register and sign in to the application. The authentication system is built using bcrypt for password hashing and a PostgreSQL database for storing user information.

Image Upload and Processing: Users can upload images by providing a URL. The application sends the image to the Clarifai API, which detects vehicles and number plates in the image.

Number Plate Detection: The application processes the API response to filter and display detected number plates. It highlights the detected number plates on the image and lists them for the user.

Periodic Pings: The server periodically pings the Clarifai API to keep it warm and ensure faster response times.

Responsive Design: The frontend is built with React and styled using Tailwind CSS, ensuring a responsive and modern user interface.

Deployment: The project includes a GitHub Actions workflow for deploying the application to Amazon ECS.

Project Structure
Frontend: The frontend is located in the src directory and includes components for the header, sign-in, registration, image link form, rank display, and vehicle number recognition.
Backend: The backend is located in the api directory and includes controllers for handling user registration, sign-in, profile retrieval, and image processing.
Deployment: The workflows directory contains a GitHub Actions workflow for deploying the application to Amazon ECS.
Key Files
App.js: Main React component that manages the application state and handles routing.
server.js: Express server that handles API requests and serves the frontend.
image.js: Controller for handling image processing requests.

Deployed version is available at https://carpp.online