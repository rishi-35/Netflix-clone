const { query, response } = require("express");
const fetchTMDB = require("../services/tmdb.service");
const User = require("../models/user.models");

async function  searchPerson(req,res) {
    const {query}=req.params;
    try{
        const response=await fetchTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length===0){
            res.status(404).send(null)
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"Person",
                    createdAt:new Date(),
                }
            }
        })
        return res.status(200).json({sucess:true,content:response.results});
    }
    catch(e){
        console.log("Error in Search Person in Search.controlers "+e.message);
        return res.status(500).json({sucess:false,message:"Internal-Server Error"})
    }
   
}

async function searchMovie(req,res) {
    const {query}=req.params;
    try{
        const response=await fetchTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length===0){
            res.status(404).send(null)
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"Movie",
                    createdAt:new Date(),
                }
            }
        })
        return res.status(200).json({sucess:true,content:response.results});
    }
    catch(e){
        console.log("Error in Search Movie in Search.controlers "+e.message);
        return res.status(500).json({sucess:false,message:"Internal-Server Error"})
    }
}

async function searchTv(req,res) {
    const {query}=req.params;
    try{
        const response=await fetchTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length===0){
            res.status(404).send(null)
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"Tv",
                    createdAt:new Date(),
                }
            }
        })
        return res.status(200).json({sucess:true,content:response.results});
    }
    catch(e){
        console.log("Error in Search Tv in Search.controlers "+e.message);
        return res.status(500).json({sucess:false,message:"Internal-Server Error"})
    }
}

async function getSearchHistory(req,res) {
    try {
        res.status(200).json({sucess:true,content:req.user.searchHistory});
    } catch (error) {
        console.log("Error in getSearchHistory in Search.controlers "+error.message);
        res.status(500).json({sucess:false,message:"Internal-Server Error"});
    }
}

async function deleteSearchHistory(req,res) {
    let {id}=req.params;
    id=parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{id:id }
            }
        })
        return res.status(200).json({sucess:true,message:"History deleted successfully"})
    } catch (error) {
        console.log("Error in deleteSearchHistory in Search.controlers "+error.message);
        res.status(500).json({sucess:false,message:"Internal-Server Error"});
    }
}
module.exports={
    searchMovie,
    searchPerson,
    searchTv,
    getSearchHistory,
    deleteSearchHistory
}