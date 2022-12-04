const jwt = require("jsonwebtoken")
const {jwtAlgorithm, jwtKey, jwtExpirySeconds} = require("../config/config")
const bcrypt = require("bcrypt")


exports.isValidSignUpPayload = (bodyPayload ) => {
    if(!bodyPayload) return false;
    if(bodyPayload && (!bodyPayload.name || !bodyPayload.email || !bodyPayload.password) ) return false;
    return true;
};


exports.isValidLoginPayload = (bodyPayload ) => {
    if(!bodyPayload) return false;
    if(bodyPayload && (!bodyPayload.email || !bodyPayload.password) ) return false;
    return true;
};

exports.getToken = (payload) => {
    const token = jwt.sign({ payload }, jwtKey, {
		algorithm: jwtAlgorithm,
		expiresIn: jwtExpirySeconds,
	})
    return token;
};


exports.hashPassword = (plaintextPassword) => {
    return new Promise((res, rej)=>{
        bcrypt.hash(plaintextPassword, 10).then(hash => {
            res(hash);
        }).catch(err => {
            rej(err);
        })
    })
}
    
exports.comparePassword = (plaintextPassword, hash) => {
    return new Promise((res, rej)=>{
        bcrypt.compare(plaintextPassword, hash).then(result => {
            res(result);
        }).catch(err => {
            rej(err);
        })
    })    
}