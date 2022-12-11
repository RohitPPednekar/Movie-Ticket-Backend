const jwt = require("jsonwebtoken")
const {jwtAlgorithm, jwtKey, jwtExpirySeconds} = require("../config/config")
const bcrypt = require("bcrypt")


exports.isValidSignUpPayload = (bodyPayload) => {
    if(!bodyPayload) return false;
    if(bodyPayload && (!bodyPayload.name || !bodyPayload.email || !bodyPayload.password) ) return false;
    return true;
};


exports.isValidLoginPayload = (bodyPayload) => {
    if(!bodyPayload) return false;
    if(bodyPayload && (!bodyPayload.email || !bodyPayload.password) ) return false;
    return true;
};

exports.isValidShowsPayload = (bodyPayload) => {
    if(!bodyPayload) return false;
    if(bodyPayload && (!bodyPayload.movie_show || !bodyPayload.movie_show_time || !bodyPayload.seats || !bodyPayload.per_seat_price)) return false;
    if(!exports.isValidDate(bodyPayload.movie_show_time) || !exports.isValidDate(bodyPayload.movie_show_end_time) || !exports.isInteger(bodyPayload.seats) || !exports.isInteger(bodyPayload.per_seat_price)) return false;
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

exports.isInteger = (intValue) => {
    return Number.isInteger(intValue);    
}

exports.isValidDate = (dateValue) => {
    return dateValue instanceof Date && !isNaN(dateValue);
}

exports.getShowStartTime = (dateValue, showTime) => {
    const updatedDateSplit = dateValue.split('-');
    const updatedTimeSplit = showTime.split(':');
    if(updatedDateSplit.length < 3 || updatedTimeSplit.length < 2 ) return null;
    const movieDate = new Date(new Date(updatedDateSplit[0], updatedDateSplit[1] - 1, parseInt(updatedDateSplit[2]) + 1).setHours(0, 0, 0, 0));
    movieDate.setUTCHours(parseInt(updatedTimeSplit[0]), parseInt(updatedTimeSplit[1],0,0));
    return movieDate;
}

exports.getShowEndTime = (movieDuration, movieStartTime) => {
    const movieDurationSplit = movieDuration.split(':');
    if(!movieStartTime || movieDurationSplit.length < 3) return null;
    const movieEndDate = new Date(movieStartTime);
    movieEndDate.setUTCHours(movieStartTime.getUTCHours() + parseInt(movieDurationSplit[0]),
        movieStartTime.getUTCMinutes() + parseInt(movieDurationSplit[1]),
        movieStartTime.getUTCSeconds() + parseInt(movieDurationSplit[2])
    );
    return movieEndDate;
}

