const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization
    // VALIDAR SE O AUTHHEADER EXISTE
    if (!authHeader) {
        return res.status(401).json({ message: 'Token not provided' })
    }
    // PEGAR TOKEN
    const [, token] = authHeader.split(' ');
    
    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
        req.userId = decoded.id
        return next()
    }catch (err) {
        return res.status(401).json({ message: 'Token not invalid' })
    }

}