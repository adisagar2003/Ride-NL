const cabModel = require('../models/cabModel');

module.exports = {
    get: async (req,res) => {
        const data = await cabModel.find(req.query);
        res.json({
            data: data,
            response: 'success'
        })
    },
    post: (req,res) => {

    },
    update: async (req,res) => {
        const data  = await cabModel.findByIdAndUpdate(req.body);
        res.json({
            data: data,
            response: 'success'
        })
    },
    delete: async (req,res) => {
        const data = await cabModel.findByIdAndDelete(req.body);
    },
    getById: async (req,res) => {
        const data = await cabModel.findOne({id:req.params.id});
        if (data){
            res.json({
                data: data,
                response:'success'
            })
        }else{
            throw new Error('Id invalid 💔');
        }
       
    }
}