const mongoose = require("mongoose")

const ambulancdrivereSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        // required: true,
    },
    vehicleNo: {
        type: String,
    },
    drivingLicence: {
        type: String,
    },
    isActvie: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isAvailabe: {
        type: Boolean,
        default: false
    },
    hodlidays: {
        type: [String],
        default: false
    },

}, { timestamps: true })

module.exports = mongoose.models.ambulanceDriver || mongoose.model("ambulanceDriver", ambulancdrivereSchema)



// driver  schma
// dirver name
// driver mobile no
// driver email id
// gadi no
// driving lignce (optional)
// gadi rc (optional)
// location
// hosptil data => name
// isAvailabe
//  isacitve
// isdeleted
// holidays unAvalibe  =[] // not visiable entry
//
