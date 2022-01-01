const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './.env' })
const {secretkey} = process.env
const generateToken = (data) => {
    const token = jwt.sign({data}, secretkey, {
        expiresIn: '1h'
    });
    return token;
}
const verifyToken = (req,res,next)=>{
    try {
        const token = req.headers.authorization
        const id = req.params.id
        const verify = jwt.verify(token.split(" ")[1], secretkey);
        if(verify){
            next()
        }else{
            res.status(500).send('invalid token')
            res.end()
        }
    } catch (error) {
        res.status(500).send('error')
        res.end()
    }   
}
const dataToken = (req,res)=>{
    try {
        const token = req.headers.authorization
        const verify = jwt.verify(token.split(" ")[1], secretkey)
        return verify
    } catch(error){
        console.log('invalid token')
    }
}
const verifyTokenWithId = (req,res,next)=>{
    try {
        const token = req.headers.authorization
        const id = req.params.id
        const verify = jwt.verify(token.split(" ")[1], secretkey);
        if(verify.data._id === id){
            next()
        }else{
            res.status(500).send('forbidden')
            res.end()

        }
    } catch(error){
        res.status(500).send(error)
        res.end()
    }   
}
const allowedAdmin = (req,res,next)=>{
    try {
        const token = req.headers.authorization
        const verify = jwt.verify(token.split(" ")[1], secretkey);
        if(verify.data.role === "admin"){
            next()
        }else{
            res.status(500).send('forbidden user')
            res.end()
        }
    } catch (error) {
        res.status(500).send(error)
        res.end()
    }
}

const allowedUser = (req,res,next)=>{
    try {
        const token = req.headers.authorization
        const verify = jwt.verify(token.split(" ")[1], secretkey);
        if(verify.data.role === "user"){
            next()
        }else{
            res.status(500).send('forbidden admin')
            res.end()
        }
    } catch (error) {
        res.status(500).send(error)
        res.end()
    }
}



module.exports = {
    generateToken : generateToken,
    verifyToken: verifyToken,
    verifyTokenWithId: verifyTokenWithId,
    dataToken: dataToken,
    allowedAdmin: allowedAdmin,
    allowedUser: allowedUser    
}