const dotenv = require('dotenv');
dotenv.config();
console.log("thisi is testing",process.env.jwt_secret);
module.exports={
    PORT : process.env.PORT || 5000,
    NODE_ENV:process.env.NODE_ENV,
    MONGO_URI: process.env.MONGO_URI,
    jwt_secrect: process.env.jwt_secret ,
    TMDB_API_KEY: process.env.TMDB_API_KEY
}
