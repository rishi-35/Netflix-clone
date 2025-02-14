const express =require("express");
const { route } = require("./auth.routs");
const { searchPerson, searchMovie, searchTv, getSearchHistory, deleteSearchHistory } = require("../controlers/search.controlers");

const router=express.Router();

router.get('/person/:query',searchPerson)
router.get('/movie/:query',searchMovie)
router.get('/tv/:query',searchTv)


router.get('/history',getSearchHistory);
router.delete('/history/:id',deleteSearchHistory);

module.exports=router;