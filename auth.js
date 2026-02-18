const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person');

passport.use(new LocalStrategy(async (username,password,done) => {
    try{
        //console.log('recieved crediencials:',USERNAME,pswd);
        const user = await person.findOne({ username });
        if(!user)
            return done(null,false,{message: 'Invalid username'});
        const ispswdmatch = await user.comparePassword(password);
        if(ispswdmatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message: 'incorrect pasword'})
        }
    }
    catch(err){
        return done(err);
    }
}))

module.exports = passport;