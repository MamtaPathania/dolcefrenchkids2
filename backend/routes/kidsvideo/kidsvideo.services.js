const db=require('../../db')

module.exports={
    fetchvideodata:(req,callback)=>{
        // const{NAME}=req.query
        const{id}=req.params
        console.log(req)
        const fetchdata=process.env.FETCH_ALL
        // .replace('%<NAME>%',NAME)
        
        console.log("fetchdata",fetchdata)
        // const fetchname=process.env.FETCH_NAME
        // db.query(fetchdata, [], (err, data) => {
        //     if (err) {
        //         return callback(err);
        //     }
        
            db.query(fetchdata, [], (err,result) => {
                if(err){
                    console.log(err)
                    return callback(err,null);
                   }
                   console.log(result)
                   return callback (null,result);
  
            //     const combinedResult = {
            //         data: data,
            //         name: name
            //     };
            //             return callback("", combinedResult);
            // });
        });
    },
    fetchvideoiddata:(req,callback)=>{
        const{sub_category_id}=req.query
        const getvideoid=process.env.FETCH_VIDEOS_ID
        .replace('<SUB_CATEGORY_ID>',sub_category_id)
        console.log(getvideoid)
        db.query(getvideoid,[],(err,result)=>{
       if(err){
        console.log(err)
        return callback(err,null);
       }
       console.log(result)
       return callback (null,result);
  })

    },
    fetchiddata:(req,callback)=>{
        const{id}=req.params
        console.log(req)

        const getid=process.env.FETCH_ID
        .replace('<ID>',id)
        console.log(getid)
        db.query(getid,[],(err,result)=>{
       if(err){
        console.log(err)
        return callback(err,null);
       }
       console.log(result)
       return callback (null,result);
  })

    }
}