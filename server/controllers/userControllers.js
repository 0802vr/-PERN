const ApiError = require('../errors/ApiError')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const {User,Basket} = require('../models/models')

const generateJWT = (id, email, role) => {
    return jsonwebtoken.sign(
      {id, email, role}, 
      process.env.SECRET_KEY, 
      {expiresIn:"24h"}
      ) 
}
class UserControllers {
    async registration(req, res, next){
        const{email, password, role} = req.body
        if(!email || ! password) {
          return next(ApiError.bedRequest("некорректный пароль/почта"))
        }
        const onceUser = await User.findOne({where:{email}})
        if(onceUser){
          return next(ApiError.bedRequest("почта занята"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJWT(user.id, user.email, user.role) /* jsonwebtoken.sign({id:user.id, email, role}, process.env.SECRET_KEY, {expiresIn:"24h"}) */
        return res.json({token})
    }
    async login(req, res, next ){
      const{email, password} = req.body
      const user = await User.findOne({where:{email}})
      if(!user) {
        return next(ApiError.internal("user not found"))
      }
      

      let comparePassword = bcrypt.compareSync(password, user.password)
      if(!comparePassword) return next(ApiError.internal("user not found"))

      const token = generateJWT(user.id, user.email, user.role)  
      return res.json({token})
    }

    async check(req, res, next){
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}
module.exports = new UserControllers()  