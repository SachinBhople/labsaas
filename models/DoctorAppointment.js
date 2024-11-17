const mongoose = require("mongoose")

const doctorAppointment = new mongoose.Schema({
    customer: { type: mongoose.Types.ObjectId, ref: "customer", },
    doctor: { type: mongoose.Types.ObjectId, ref: "doctor", },
    address: { type: String, },
    cancleReason: { type: String, },
    schedule: { type: Date, required: true },
    time: { type: String, required: true },
    payment: { type: String, required: true },

}, { timestamps: true })

module.exports = mongoose.models.doctorAppointment || mongoose.model("doctorAppointment", doctorAppointment)

