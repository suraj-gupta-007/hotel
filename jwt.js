const JWT = require('jsonwebtoken');

const jwtauthware = (req,res,next) => {
    const Authorization = req.headers.authorization
    if(!Authorization) return res.status(401).json({error: 'token not found'});

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorised'});

    try{
        const decoded = JWT.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error: 'Invalid token'});
    }
}

const generatetoken = (userData) => {
    return JWT.sign(userData,process.env.JWT_SECRET, {expiresIn: 3000});
}

module.exports = {jwtauthware,generatetoken};