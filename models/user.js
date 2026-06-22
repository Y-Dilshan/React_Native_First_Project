const mongoose = require('mongoose')
const bcrypt = require(bcryptjs);

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        requied : [true, 'Please add a name'],
        trim :true 
    },
    email : {
        type :String,
        required : [true, 'Please add a email'],
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : [true, 'Please add a password'],
        minlength : 6
    }
}, {timestamps:true});

// Encrypt password befor saving....
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.gensalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password); 
}

module.exports = mongoose.model('User', userSchema);