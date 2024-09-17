Sentiment Based Movie Rating System (Ongoing)
This project is an innovative movie rating platform that uses MERN stack (MongoDB, Express.js, React.js, Node.js) to create a responsive and evolving user experience. The main feature of this project is that movie ratings are dynamically shaped by real-time sentiment analysis of user reviews, using the powerful Python library TextBlob. This way, the system can capture nuanced audience reactions and provide more accurate and meaningful ratings.

Installation and Usage
To run this project, you will need to have Node.js, MongoDB, and Python installed on your machine. You will also need to obtain an API key from The Movie Database (TMDB) and set it as an environment variable as TMDB_ACCESS_TOKEN in the server directory and VITE_TMDB_ACCESS_TOKEN in the client directory.

You will also need to obtain an API key from Firebase and set it as an environment variable as VITE_FIREBASE_API_KEY in the client directory.

Setting Environment Variables
For development, you can set these environment variables by creating a .env file in the root of the server directory.

Server Configuration
SERVER_PORT=4000

Authentication Server Configuration
AUTH_SERVER_PORT=5000

Token Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

MongoDB Configuration
MONGO_URI=your_mongo_uri

Clone this repository and navigate to the project folder. Then, follow these steps

Install the dependencies for the backend and the frontend using npm install.
Set up the Environment varriables
Start the backend server using npm run dev.
Start the backend auth server using npm run devAuth.
Start the frontend server using npm run dev.
Open your browser and go to httplocalhost5173 to see the application.
You can sign up using your email and password, or use your Google account to sign in. Once you are logged in, you can browse the movies, read the reviews, and rate them using the sentiment analysis feature. You can also write your own reviews and see how they affect the movie ratings.

Demo
Here is a recording of the current state of the application.

httpsgithub.comSameeraDayaratneSentiment-Based-Movie-Rating-System-v1assets85645373d99700c0-7252-482d-b230-41460416e1be

Documentation
This project consists of two main parts the backend and the frontend. The backend is built using Node.js and Express.js, and it handles the authentication, authorization, database operations, and API requests. The frontend is built using React.js and Tailwind CSS, and it handles the user interface, state management, and routing.

The backend uses the following technologies and libraries

MongoDB A NoSQL database that stores the user and movie data.
Mongoose An object data modeling (ODM) library that provides a schema-based solution to model the data.
Bcrypt A library that helps to hash and compare passwords for security purposes.
JSON Web Token (JWT) A standard that defines a compact and self-contained way of securely transmitting information between parties as a JSON object.
Cookie Parser A middleware that parses cookie headers and populates req.cookies with an object keyed by the cookie names.
Redis An in-memory data structure store that is used for efficient refresh token validation.
Axios A promise-based HTTP client that is used to make requests to external APIs.
TMDB API An API that provides access to movie and review data from The Movie Database.
TextBlob A Python library that provides a simple API for natural language processing (NLP) tasks such as sentiment analysis.
The frontend uses the following technologies and libraries

React.js A JavaScript library for building user interfaces.
Tailwind CSS A utility-first CSS framework that provides a set of predefined classes for styling elements.
Redux Toolkit A library that helps to simplify the Redux state management logic and reduce boilerplate code.
Redux Persist A library that helps to persist and rehydrate the Redux state using local storage.
React Router A library that provides dynamic routing for React applications.
Axios A promise-based HTTP client that is used to make requests to the backend server.
Axios Interceptors A feature that allows to intercept requests or responses before they are handled by then or catch.
Firebase Google Authentication A service that allows to authenticate users using their Google accounts.
Contributing
This project is still ongoing and open to contributions. If you are interested in contributing, please follow these steps
