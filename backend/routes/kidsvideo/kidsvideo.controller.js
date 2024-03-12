const {fetchvideodata, fetchvideoiddata, fetchiddata} =require('./kidsvideo.services')

const fetchvideos=(req,res)=>{
 fetchvideodata(req,(err,resultsent)=>{
    if(err){
        res.status(400).json(err)
        console.log(err)
    }
    res.json({videos:resultsent})
    // console.log(resultsent)
 })
}

const fetchvideosid=(req,res)=>{
 fetchvideoiddata(req,(err,result)=>{
    if(err){
        console.log(err)
        res.status(400).json({error:err})
    }else{
        console.log(result);
        res.json({message:result})
    }
 })
}
const fetchid=(req,res)=>{
    fetchiddata(req,(err,result)=>{
        if(err){
            console.log(err)
            res.status(400).json({error:err})
        }else{
            console.log(result);
            res.json({message:result})
        }  
    })
}
module.exports= {fetchvideos,fetchvideosid,fetchid}