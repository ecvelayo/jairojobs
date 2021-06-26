const model = require('../models/accountInformationModel').model;


exports.create = async (req, res) => {
    try{
        let ret = await model.create(req.body)
        .then((data)=>{
            return {id: data.id};
        }).catch((err)=>{
            return {name: err.name, errors: err.errors[0].message};
        });
        res.send(ret);    
    }catch(err){
        console.log(err.stack);
        res.send(err.stack)
    }

}

exports.readOne = async (req, res) => {
    
}

exports.viewUser = async (req, res) => {
    try{
        const data = await model.findOne({
            where: {
                username: req.params.account
            }
        }).then((data)=>{
            if (data.status == "SUSPENDED"){
                return {status: "Suspended"}
            }else{
                return data;
            }
        }).catch((err)=>{
            return err;
        })
        res.send({username: data.username, status: data.status});
    }catch(err){
        res.send(err.stack);
    }
}
