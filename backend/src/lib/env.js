import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL: process.env.CLIENT_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    ARCJET_KEY: process.env.ARCJET_KEY,
    ARCJET_ENV: process.env.ARCJET_ENV,
    // DATABASE_URL: process.env.DATABASE_URL,
    // DB_HOST: process.env.DB_HOST,
    // DB_PORT: process.env.DB_PORT,

};




// NODE_ENV='development'
// PORT='5000'
// HOST='http://localhost'
// MONGO_URL='mongodb+srv://oyinloyepeter273_db_user:MRWRi3C4xA5wzHaJ@cluster0.kp6khjh.mongodb.net/chatify_db?appName=Cluster0'
// # 'mongodb+srv://oyinloyepeter273_db_user:Peter@720@cluster0.kp6khjh.mongodb.net/'
// # mongodb+srv://oyinloyepeter273_db_user:MRWRi3C4xA5wzHaJ@cluster0.kp6khjh.mongodb.net/?appName=Cluster0

// DATABASE_URL='postgresql://postgres:Peter@720@localhost:5432/chatify_app'
// DB_HOST='localhost'
// DB_PORT='5432'
// DB_USER='postgres'
// DB_PASSWORD='Peter@720' 
// DB_NAME='chatify_app'



// NODEMAILER_USERNAME='oyinloyepeter273@gmail.com'
// NODEMAILER_PASSWORD='qxjm brin jmvi fabn'



// JWT_SECRET="your_very_strong_and_long_secret_key_here"

// RESEND_API_KEY=re_UdiCvfRA_3fnH8fyRqdDNP4zpHQ2qLsYg

// EMAIL_FROM="oyinloyepeter273@gmail.com"
// EMAIL_FROM_NAME="Peter Akorede"

// CLIENT_URL=http://localhost:5173