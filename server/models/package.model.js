const mongoose = require("mongoose");
const {Schema} = mongoose;

const packageSchema = new Schema(
    {
        packageName:{
            type:String,
            required:true,
            trim:true,
        },
        price:{
            type:Number,
        },
        items:[
            {
                itemName:{
                    type:String,
                    required:true,
                    trim:true,
                },
                
                 itemQuantity:{
                    type:Number,
                   
                 },
            }
        ]
       
        
    }
)

const Package = mongoose.model("Package",packageSchema)
module.exports = {Package}