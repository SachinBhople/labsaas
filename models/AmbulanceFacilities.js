const mongoose = require("mongoose")

const ambulancefacilitiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false
    },
}, { timestamps: true })

module.exports = mongoose.models.ambulancefacilities || mongoose.model("ambulancefacilities", ambulancefacilitiesSchema)