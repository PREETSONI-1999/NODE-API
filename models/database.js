const mongoose=require('mongoose');
const Schema = mongoose.Schema;


const NinjaSchema = new Schema({
    email: {
    type: String,
    required: true,
    unique: true,
    },
    name:String,
    password:String
});

const Ninja=mongoose.model('ninja',NinjaSchema);

module.exports=Ninja;