IncogNote Anonymous Messaging Website README 📝

Welcome to IncogNote, our anonymous messaging website! This platform allows users to send messages anonymously to each other. Below, you'll find all the necessary information to understand, set up, and contribute to our project.

Technologies Used: 🛠️
Next.js: Next.js is a React framework that enables functionality like server-side rendering and generating static websites for React based web applications.
Zod: Zod is a TypeScript-first schema declaration and validation library. It helps ensure data integrity and type safety.
TypeScript: TypeScript is a strongly typed superset of JavaScript that helps catch errors early in the development process and improve code quality.
MongoDB: MongoDB is a NoSQL database used for storing and managing our application's data.
SCSS: SCSS is a CSS preprocessor that enables us to write more maintainable and modular CSS code.
Tailwind CSS: Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs.
Prerequisites: 🧩
Node.js and npm installed on your machine.
MongoDB installed and running.
Setup Instructions: 🚀
Clone the repository from [GitHub Repository URL].
Navigate to the project directory.
Run npm install to install the project dependencies.
Create a .env file in the root directory and provide the necessary environment variables. Example:
makefile
Copy code
MONGODB_URI=your_mongodb_uri
Run npm run dev to start the development server.
Access the application in your browser at http://localhost:3000.
Project Structure: 📁
graphql
Copy code
├── pages/                  # Next.js pages
│   ├── api/                # API routes
│   │   └── messages.ts     # API route for handling messages
│   ├── _app.tsx            # Next.js app component
│   └── index.tsx           # Homepage component
├── components/             # React components
│   ├── Layout.tsx          # Layout component
│   └── MessageForm.tsx     # Component for sending messages
├── lib/                    # Utility functions and modules
│   └── database.ts         # MongoDB connection and models
├── styles/                 # SCSS and Tailwind CSS styles
│   ├── globals.scss        # Global styles
│   └── tailwind.config.js  # Tailwind CSS configuration file
├── .env.example            # Example environment variables
└── README.md               # Project README file
