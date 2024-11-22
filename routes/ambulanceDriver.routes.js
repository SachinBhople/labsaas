const ambulanceDriver = require("../controllers/ambulanceDriver.controller")
const { ambulanceDriverProtected } = require("../middleware/protected")

const router = require("express").Router()


router


    .post("/add-ambulance-driver", ambulanceDriver.registerAmbulanceDriver)
    .put("/update-ambulance-driver/:id", ambulanceDriver.updateAmbulanceDriverProfile)
    .get("/fetch-ambulance-driver-profile", ambulanceDriverProtected, ambulanceDriver.fetchAmbulanceDriverProfile)
    .put("/update-ambulance-booking/:id", ambulanceDriverProtected, ambulanceDriver.updateBooking)
    .put("/ambulance-driver-isavailabe/:id", ambulanceDriverProtected, ambulanceDriver.DriverIsAvailable)
    .get("/fetch-booking-history", ambulanceDriverProtected, ambulanceDriver.fetchBookingHistory)
    .put("/cancle-ambulance-booking", ambulanceDriverProtected, ambulanceDriver.cancleAmbulanceBookingbyDriver)
    .post("/logout-ambulance-driver", ambulanceDriver.logoutambulanceDriver)
    .post("/verify-otp", ambulanceDriver.verifyOTP)
    .post("/customer-request", ambulanceDriverProtected, ambulanceDriver.customerrequest)


module.exports = router