const express =require('express')
const router= express.Router()
const {fetchvideos,fetchvideosid, fetchid }=require('./kidsvideo.controller');

router.get('/videos',fetchvideos);

router.get('/id',fetchvideosid)
router.get('/video/:id',fetchid)

module.exports=router