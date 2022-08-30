'use strict';
const auth = require('basic-auth');
const {User, Course} = require('../models');
const bcrypt = require('bcryptjs');

/**
 * Middleware to authenticate the request using Basic Authentication.
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {Function} next - The function to call to pass execution to the next middleware.
 */
exports.authenticateUser = async (req, res, next)=>{
    // console.log(req);
    let message;
    const credentials = auth(req);

    if(credentials){
        const user = await User.findOne({where: {emailAddress: credentials.name}});
        if(user){
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
            if(authenticated){
                //console.log(`authentication successful for email: ${user.emailAddress}`);
                req.currentUser = user;
            }else {
                message = `Authentication failure for email: ${user.emailAddress}`;
              }
        } else {
            message = `User not found for email: ${credentials.emailAddress}`;
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        //console.warn(message);
        // res.status(403).json({ message: 'Access Denied' });
        req.authStatus = 401;
        next();
    } else {
        next();
    }

}