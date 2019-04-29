var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next()
    }
    const token = authHeader.split(' ')[1];  //  Authorization Bearer kkjgjhgjh
    if (!token || token === '') {
        req.isAuth = false;
        return next()
    }
    let decodedToken;
    try {
        decodedToken= jwt.verify(token,'somesuperscreatkey')

    }catch (e) {
        req.isAuth = false;
        return next()
    }
    if(!decodedToken){
        req.isAuth = false;
        return next()
    }
    req.isAuth = true;
    req.userId=decodedToken.userId;
    req.email=decodedToken.email;
    return next()

}