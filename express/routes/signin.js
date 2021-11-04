const expressFunction = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = expressFunction.Router();

const key = 'MY_KEY';

var Schema = require("mongoose").Schema;

const userSchema = Schema({
    username: String,
    password: String,
    role: String
},{
    collection: 'users'
})

let User
try {
    User = mongoose.model('users')
} catch(err) {
    User = mongoose.model('users', userSchema);
}

const makeHash = async(plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

const compareHash = async(plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, data)=>{
            if(err){
                reject(new Error('Error bcrypt compare'))
            }else{
                resolve({status: data});
            }
        })
    });
}

const findUser = (username) =>{
    return new Promise((resolve, reject) =>{
        User.findOne({username: username}, (err, data)=>{
            if(err){
                reject(new Error('Cannot find username!'));
            }else{
                if(data){
                    resolve({id: data._id, username: data.username, password: data.password,role: data.role})
                    console.log(data.password);
                }else{
                    reject(new Error('Cannot find username!'));
                }
            }
        })
    })
}

router.route('/signin')
.post( async (req, res)=>{
    const playload = {
        username: req.body.username,
        password: req.body.password
    };

    console.log(playload);

    try {
        const result = await findUser(playload.username);
        const loginStatus =await compareHash(playload.password, result.password);
        
        const status = loginStatus.status;
        console.log("this casue");
        console.log(status);
        //สร้าง token ขึ้นมา
        if(status){
            const token = jwt.sign(result, key, {expiresIn: 60*5});
            res.status(200).json({result, token, status});
            console.log(token)
        }else{
            res.status(200).json({status});
        }
    }catch (error){
        res.status(404).send(error)
    }
})


router.route('/resetPassword').post( (req,res)=>{

    var query = {"_id":req.body._id};
    makeHash(req.body.password)
    .then(hashText => {
        const playload = {
            password: hashText,
        }
        User.findByIdAndUpdate(query, playload, {new: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
        });
        //console.log(playload);  
    })
    .catch( err => {

    })
    
        

})

module.exports = router