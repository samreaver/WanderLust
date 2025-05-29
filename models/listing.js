const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String
});

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: imageSchema,
    price: {
        type: Number,
        required: true
    },
    location: String,
    country: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

module.exports = mongoose.model("Listing", listingSchema);