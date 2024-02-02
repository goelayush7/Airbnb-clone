const mongoose = require("mongoose");
const schema  = mongoose.Schema;
const Review = require("./reviews.js");
const { string } = require("joi");
const lisitingschema = new schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },

    image : {
        url:String,
        filename:String
    },
    price:Number,
    location:String,
    country:String,
    reviews: [
        {
            type: schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner : {
        type : schema.Types.ObjectId,
        ref : "User" 
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    category:{
        type:String,
        enum:["Mountain","Pool","City"]
    }
}); 

lisitingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
})
const listing  = mongoose.model("listing",lisitingschema);
module.exports = listing;