const mongoose = require("mongoose")

const ambulanceSpecialitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.models.ambulanceSpeciality || mongoose.model("ambulanceSpeciality", ambulanceSpecialitySchema)

