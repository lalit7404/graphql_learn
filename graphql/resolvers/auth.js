var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {dateToString}= require('../helpers/date');

module.exports = {                     // points to object which have resolver function
    createUser: async (args) => {
        try {
            let userData = args.userInput;
            const hashedPassword = await bcrypt.hash(userData.password, 12);
            const user = new User({
                email: userData.email,
                name: userData.name,
                password: hashedPassword,
            })
            const result = await user.save();
            return {...result._doc, password: null, _id: result.id};
        } catch (e) {
            throw e
        }
    },
    login: async ({email,password}) => {
        const user =await User.findOne({email:email});
        if(!user){
            throw new Error('User does not exists@')
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const isEqual=await bcrypt.compare(password,user.password)
        if(!isEqual){
            throw new Error('Password is incorrect!')
        }

        const token=await jwt.sign({userId:user.id,email:email},'somesuperscreatkey',{
            expiresIn : '1h'
        });
        return {userId: user.id,token,tokenExpiration:1}

    }
};





