const ambulanceDriver = require("../controllers/ambulanceDriver.controller")
const { ambulanceDriverProtected } = require("../middleware/protected")

const router = require("express").Router()


router


    .post("/add-ambulance-driver", ambulanceDriver.registerAmbulanceDriver)
    .post("/verify-otp", ambulanceDriver.verifyOTP)
    .put("/update-ambulance-driver/:id", ambulanceDriver.updateAmbulanceDriverProfile)
    .get("/fetch-ambulance-driver-profile", ambulanceDriverProtected, ambulanceDriver.fetchAmbulanceDriverProfile)


module.exports = router