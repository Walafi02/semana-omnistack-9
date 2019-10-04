const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema(
    {
        thumbnail: String,
        company: String,
        price: Number,
        tochs: [String],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

SpotSchema.virtual("thumbnail_url").get(function() {
    return `http://10.10.1.69:3333/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Sport", SpotSchema);
