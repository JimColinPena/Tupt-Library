const sendToken = (user, statusCode, res) => {
    // Create Jwt token
    const token = user.getJwtToken();

    if(user.status == 'deactivated'){
        res.status(401).redirect(`http://localhost:3000/`)
    }else{
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }
        res.cookie('token', token, options).redirect(`http://localhost:3000/dashboard`);
    }
}

module.exports = sendToken;