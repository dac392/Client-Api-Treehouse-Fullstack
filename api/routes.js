'use strict'

const express = require('express');
const bcrypt = require('bcryptjs');
const {User, Course} = require('./models');
const {authenticateUser} = require('./middleware/authentication');
const {handler} = require('./middleware/async-handler');
const router = express.Router();

let errors = [];

const id_to_user = {
    attributes:['id','title','description','estimatedTime','materialsNeeded','userId',],
    include: [
        {
            model: User,
            as: 'user',
            attributes: ['firstName','lastName','emailAddress']
        }
    ]
}

/**
 * Given a JSON and some keys, the function returns a douplicate item excluding the keys provided.
 * @param {Object} obj - Json object given to the function
 * @param {Keys} keys - List of tags which the function uses as keys to avoid
 * @returns 
 */
function omit(obj, keys){
    let dup = {};
    for(let key in obj.dataValues) {
        if(key === "user"){
            dup[key] = omit(obj[key], ['password', ...keys]);
        }else if(keys.indexOf(key) == -1){
            dup[key] = obj[key];
        }
    }
    return dup
}

/**
 * route that returns the authenticated user's information
 */
router.get('/users', authenticateUser ,handler( async (req, res)=>{
    if(req.authStatus === 401){
        return res.status(401).json({message: "Access denied"});
    }
    const user = req.currentUser;
    res.status(200).json(omit(user, ['password', 'createdAt', 'updatedAt']));
}));

/**
 * debug
 */
 router.get('/users-all', handler( async (req, res)=>{
    const user = await User.findAll();
    const all = user.map((person)=>omit(person, ['password', 'createdAt', 'updatedAt']))
    res.status(200).json(all);
}));

/**
 * route allowing to post a new user
 */
router.post('/users', handler(async (req, res)=>{

    const user = req.body;
    let password = user.password;
    if(password){
        user.password = bcrypt.hashSync(password, 10);
    }

    await User.create(req.body);
    res.status(201).header({"location":"/"}).end();

}));

// get all courses
router.get('/courses/', handler( async (req, res)=>{
    const courses = await Course.findAll(id_to_user);
    let moded;
    if(courses){
        const moded = courses.map((course)=>omit(course, ['createdAt', 'updatedAt']));
    }
    // moded? moded : courses
    res.status(200).json(courses);

}));

// get a particular course
router.get('/courses/:id', handler( async (req, res)=>{
    const course  = await Course.findByPk(req.params.id, id_to_user);
    if(course){
        res.status(200).json(course);
    }else{
        res.status(404).end();
    }
    
}));

// post a course
router.post('/courses/', authenticateUser, handler( async (req, res)=>{
    if(req.authStatus === 401){
        return res.status(401).json({message: "Access denied"});
    }
    // not sure if this is the intended use or not
    const user = req.currentUser;
    const info = req.body;
    info.userId = user.id;
    await Course.create(info);
    res.status(201).header({"location":"/"}).end();
}));

// update a course
router.put('/courses/:id', authenticateUser, handler( async (req, res)=>{
    if(req.authStatus === 401){
        return res.status(403).json({ message: 'Access Denied' });
    }

    const user = req.currentUser;
    const update = await Course.findByPk(req.params.id);

    if(user.id === update.userId){
        await update.update(req.body);
        res.status(204).end();
    }else{
        res.status(403).json({ message: 'Access Denied' });
    }


}));

// delete a course
router.delete('/courses/:id', authenticateUser, handler( async (req, res)=>{
    if(req.authStatus === 401){
        return res.status(403).json({ message: 'Access Denied' });
    }
    const user = req.currentUser;
    const del = await Course.findByPk(req.params.id);

    if(!del){
        res.status(404).end();
    } else if(user.id === del.userId) {
        await del.destroy();
        res.status(204).end();
    }else{
        res.status(403).json({ message: 'Access Denied' });
    }

}));

module.exports = router;