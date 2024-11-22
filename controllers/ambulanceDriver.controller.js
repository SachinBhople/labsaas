const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/handleEmpty")
const { nanoid } = require("nanoid")
const AmbulanceDriver = require("../models/AmbulanceDriver")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const AmbulanceBooking = require("../models/AmbulanceBooking")
const Ambulance = require("../models/Ambulance")

exports.registerAmbulanceDriver = asyncHandler(async (req, res) => {
    const { mobile, } = req.body
    console.log(req.body, "dddd");

    const { isError, error } = checkEmpty({ mobile })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }
    const isFound = await AmbulanceDriver.findOne({ mobile })

    console.log("Dref");
    console.log(isFound);

    if (isFound) {
        const otp = nanoid(6)
        await AmbulanceDriver.findByIdAndUpdate(isFound._id, { otp })
        console.log("true");
        return res.status(200).json({ messsage: "Customer Login Success, OTP Send To Registered Mobile" })
    } else {
        console.log("flase");
        const otp = nanoid(6)
        console.log("flase");
        // await AmbulanceDriver.create({ mobile, otp })
        await AmbulanceDriver.create({ mobile, otp })
        return res.status(200).json({ messsage: "Customer Register Success,OTP Send To Registered Mobile" })
    }
})


exports.verifyOTP = asyncHandler(async (req, res) => {
    const { mobile, otp } = req.body
    console.log(req.body);

    const { isError, error } = checkEmpty({ mobile, otp })
    if (isError) {
        return res.status(400).json({ messsage: "All Feilds Required", error })
    }
    if (!validator.isMobilePhone(mobile.toString(), "en-IN")) {
        return res.status(400).json({
            messsage: "Invalid Email Or Mobile",
            error: "Invalid Email Or Mobile"
        })
    }
    const isFound = await AmbulanceDriver.findOne({ mobile })
    console.log(isFound);

    if (!isFound) {
        return res.status(400).json({
            messsage: "  Mobile is not Found",
            error: "  Mobile is not Found"
        })
    }
    if (otp !== isFound.otp) {
        return res.status(400).json({ message: "Invalid OTP" })
    }
    const token = jwt.sign({ userId: isFound._id },
        process.env.JWT_KEY,
        { expiresIn: process.env.JWT_CITY_ADMIN_EXPIRE })

    res.cookie("ambulanceDrvier", token, {
        httpOnly: true,
        maxAge: process.env.CITY_ADMIN_COOKIE_EXPIRE,
        secure: process.env.NODE_ENV === "production"
    })

    res.json({
        message: "OTP Verify Success", result: {
            _id: isFound._id,
            mobile: isFound.mobile,

        }
    })
})
exports.updateAmbulanceDriverProfile = asyncHandler(async (req, res) => {
    const { name, email, mobile, isAvailabe, drivingLicence, vehicleNo, hodlidays, } = req.body
    const { id } = req.params
    const { isError, error } = checkEmpty({ vehicleNo })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }


    if (!validator.isEmail(email)) {
        return res.status(400).json({
            messsage: "Invalid Email Or Mobile",
            error: "Invalid Email Or Mobile"
        })
    }
    await AmbulanceDriver.findByIdAndUpdate(id, { name, email, isAvailabe, mobile, drivingLicence, vehicleNo, hodlidays })
    return res.status(200).json({ message: "ambulance Data Updated", })
})
exports.fetchAmbulanceDriverProfile = asyncHandler(async (req, res) => {
    const ambulancedriverId = req.user
    const result = await AmbulanceDriver.findOne({ _id: ambulancedriverId })
    return res.status(200).json({ message: "Ambulance Driver Profile Fetch success", result })
})


exports.fetchDriverBooking = asyncHandler(async (req, res) => {
    const driverId = req.user
    const result = await AmbulanceBooking.find({ driverId: driverId }).sort({ createdAt: -1 }).populate("driverId")
    res.status(200).json({ message: "Fetch Driver Booking success", result: result[0] })
})


exports.updateBooking = asyncHandler(async (req, res) => {
    const { isAccept, bookingId } = req.body
    console.log(isAccept, "isAccept");
    if (!isAccept) {
        const arr = []
        const result = await Ambulance.find().populate("driver")
        console.log(result, "result");

        for (let i = 0; i < result.length; i++) {
            if (result[i].isAvailabe === true && result[i].driver.isAvailabe === true) {
                arr.push(result[i])
            }
        }
        console.log(arr, "arr")
        await AmbulanceBooking.findByIdAndUpdate(bookingId, { driverId: arr[0].driver._id })
    } else {
        await AmbulanceBooking.findByIdAndUpdate(bookingId, { isAccept: true })
    }
    return res.json({ messsage: "update Booking  success." })
})
exports.DriverIsAvailable = asyncHandler(async (req, res) => {
    const driverId = req.user
    const { isAvailable } = req.body
    await AmbulanceDriver.findByIdAndUpdate(driverId, { isAvailabe: isAvailable })
    return res.json({ messsage: " Driver Status Update success." })
})

exports.fetchBookingHistory = asyncHandler(async (req, res) => {
    const driverId = req.user
    const result = await AmbulanceBooking.find({ driverId: driverId })
    console.log(result);
    let arr = []
    for (let i = 0; i < result.length; i++) {
        console.log(result[i], "result[i]");
        if (result[i].isAccept === true) {

            arr.push(result[i])
        }
    }
    return res.json({ messsage: "update Ambulance Facilities success.", result: arr })
})
exports.cancleAmbulanceBookingbyDriver = asyncHandler(async (req, res) => {
    const driverId = req.user
    await AmbulanceBooking.findByIdAndUpdate(driverId, { status: "cancleByDriver" })
    return res.json({ messsage: "update Ambulance Facilities success.", result })
})
exports.logoutambulanceDriver = asyncHandler(async (req, res) => {
    res.clearCookie("ambulanceDrvier")
    // res.clearCookie("ambulanceDrvier")
    return res.json({ messsage: " Ambulance Driver Logout success.", })
})

exports.customerrequest = asyncHandler(async (req, res) => {
    const { isAccept, bookingId } = req.body
    console.log(isAccept, "isAccept");

    if (!isAccept) {
        const arr = []
        const result = await Ambulance.find().populate("driver")
        console.log(result, "result");

        for (let i = 0; i < result.length; i++) {
            if (result[i].isAvailabe === true && result[i].driver.isAvailabe === true) {
                arr.push(result[i])
            }
        }
        console.log(arr, "arr")
        await AmbulanceBooking.findByIdAndUpdate(bookingId, { driverId: arr[0].driver._id })
    } else {
        await AmbulanceBooking.findByIdAndUpdate(bookingId, { isAccept: true })
    }
    res.status(200).json({ message: "customer request success" })

    // const driverId = req.user
    // const result = await AmbulanceBooking.find({ driverId: driverId }).sort({ createdAt: -1 })
    // if (!isAccept) {
    //     let dresult = await AmbulanceDriver.find({ isAvailabe: true })
    //     let driver = dresult[0]
    //     console.log(driverId, "driverId");
    //     console.log(dresult, "dresult");
    //     console.log(driver, "driver");
    //     console.log(result, "result");

    //     await AmbulanceBooking.findByIdAndUpdate(result._id, { driver: driver._id })
    // }

})
