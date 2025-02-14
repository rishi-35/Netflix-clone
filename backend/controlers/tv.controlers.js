const fetchTMDB = require("../services/tmdb.service");

async function getTrendingTv(req,res) {
    try {
        const data = await fetchTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        console.log(data);
        const randomTrendingtv=data.results[Math.floor(Math.random()*data.results?.length)]
       return  res.json({sucess:true,content:randomTrendingtv})
    } catch (error) {
        console.error("Error in tvs.controlers" +error)
        res.status(500).json({sucess:false,message:"Internal-Server Error"})
    }
}

async function getTrailers(req,res) {
    try { 

        const {id}=req.params;
        const data= await fetchTMDB( `https://api.themoviedb.org/3/tv/${id}/videos` )
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
        const data= await fetchTMDB( `https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        return res.json({sucess:true,content:data})

    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        return res.status(500).json({sucess:false,message:"Internal-Server Error"});
    }
}



async function getSimilartvs(req,res) {
    try { 
        const {id}=req.params;
        const data= await fetchTMDB( `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        return res.json({sucess:true,content:data.results})
    } catch (error) {
        return res.status(500).json({sucess:false,message:"Internal-Server Error"});
    }
}

async function gettvsByCatogery(req,res) {
    try { 
        const {catogery}=req.params;
        const data= await fetchTMDB( `https://api.themoviedb.org/3/tv/${catogery}?language=en-US&page=1`)
        return res.json({sucess:true,content:data.results})
    } catch (error) {
        return res.status(500).json({sucess:false,message:"Internal-Server Error"});
    }
}

module.exports={
    getTrendingTv,
    getTrailers,
    getDetails,
    getSimilartvs,
    gettvsByCatogery
}