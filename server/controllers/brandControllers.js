const { Brand } = require("../models/models")
const ApiError = require('../errors/ApiError')

class BrandControllers {
    async create(req, res, next){
        try{
            const {name} =req.body
            const brand = await Brand.create({name})
            return res.json(brand) 
        }
        catch(e) {
            next((e.message))
        }
        
    }
    async getAll(req, res){
        const brand = await  Brand.findAll()
        return res.json(brand)
    }
    
}
module.exports = new BrandControllers()   