const post = require("../models/postsModel").model;

exports.createPost = async(req, res) => {
    await post.create();
}

exports.readPost = async(req,res) => {
    // const options = {}; 
    try{
        if (req.body.postid){
            await post.findOne({
                where: {
                    id: req.body.postid
                }
            }).then((data)=>{
                if (data === null){
                    throw err;
                }else{
                    res.send(data);
                }
            }).catch((err)=>{
                throw err;
            })
        }else{
            //limit and offset
            await post.findAll({
                where: req.body
            })
        }
    }catch(err){
        res.send(err);
    } 
}

exports.updatePost = async(req, res) => {
    
}

exports.deletePost = async(req, res) => {

}

