const fetchTMDB = require("../services/tmdb.service");

async function getTrendingMovie(req,res) {
    try {
        const data = await fetchTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomTrendingMovie=data.results[Math.floor(Math.random()*data.results?.length)]
       return  res.json({sucess:true,content:randomTrendingMovie})
    } catch (error) {
        console.error("Error in movies.controlers" +error)
        res.status(500).json({sucess:false,message:"Internal-Server Error"})
    }
}

async function getTrailers(req,res) {
    try { 

        const {id}=req.params;
        const data= await fetchTMDB( `https://api.themoviedb.org/3/movie/${id}/videos` )
        return res.json({sucess:true,trailers:data.results})

    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        return res.status(500).json({sucess:false,message:"Internal-Server Error"});
    }
}

async function getDetails(req,res) {
    try { 
        const {id}=req.params;
        const data= await fetchTMDB( `https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        return res.json({sucess:true,content:data})

    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        return res.status(500).json({sucess:false,message:"Internal-Server Error"});
    }
}



async function getSimilarMovies(req,res) {
    try { 
        const {id}=req.params;
        const data= await fetchTMDB( `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        return res.json({sucess:true,content:data.results})
    } catch (error) {
        return res.status(500).json({sucess:false,message:"Internal-Server Error"});
    }
}

async function getMoviesByCatogery(req,res) {
    try { 
        const {catogery}=req.params;
        const data= await fetchTMDB( `https://api.themoviedb.org/3/movie/${catogery}?language=en-US&page=1`)
        return res.json({sucess:true,content:data.results})
    } catch (error) {
        return res.status(500).json({sucess:false,message:"Internal-Server Error"});
    }
}

module.exports={
    getTrendingMovie,
    getTrailers,
    getDetails,
    getSimilarMovies,
    getMoviesByCatogery
}