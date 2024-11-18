const ambulanceDriver = require("../controllers/ambulanceDriver.controller")

const router = require("express").Router()


router


    .post("/add-ambulance-driver", ambulanceDriver.registerAmbulanceDriver)
    .post("/verify-otp", ambulanceDriver.verifyOTP)
    .put("/update-ambulance-driver/:id", ambulanceDriver.updateAmbulanceDriverProfile)


module.exports = router