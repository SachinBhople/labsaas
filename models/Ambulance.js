const mongoose = require("mongoose")

const ambulanceSchema = new mongoose.Schema({
    ownername: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    vehicleNo: {
        type: String,
    },
    driver: {
        type: mongoose.Types.ObjectId,
        ref: "ambulanceDriver"
    },
    vehicleRc: {
        type: String,
    },
    facilities: {
        type: [String],
    },
    price: {
        type: String,
        required: false
    },
    isDeleted: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: false,
        default: false
    },
    isAvailabe: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true })

module.exports = mongoose.models.ambulance || mongoose.model("ambulance", ambulanceSchema)
