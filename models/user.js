const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email: {
type: String,
required: true,
unique: true
},
    password: {
type: String,
required: true,
},
    firstname: {
type: String,
required: true,
},
    lastname: {
type: String,
required: true,
},
    role: {
type: String,
enum: ["user", "admin"],
default: "user"
},
    isActive: {
type: Boolean,
default: false, /// houya ki yamel compte n'est pa encore activer 
required: false
},
    avatar :{ // image
type: String,
required: false
} ,
},
{
timestamps: true,
},
)
/// les callbacks : à quoi sert 
userSchema.pre('save', async function(next) {  // pre mantha 9bal save tokhdemli il méthode hethy 
    if (!this.isModified('password')) return next() // mantha idha kan il password matbedilech amel save 
    const salt = await bcrypt.genSalt(10) // await yestana
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
    })
module.exports = mongoose.model('User', userSchema)