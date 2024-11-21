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

// gadi no
//spacitlyt =[string]
// price


// model
// spacitlyt=Name









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





// Ambulance  Service
//   book, owener name, mobile,  email(op.),
//  driver  => name, mobile, email,  ab-number, location, hospital = data, isAvilable,
//  holiday = [date unavilable, date unavilable,]
// new Mobile setup for driver
//  Driver profile,  avilable and unavilable, bookings, ambulance Details,




// HOme page accept or reject option 
// mobile no update 
// on booking drop location accept reject  if its reject then assign to next driver  
// cancel btn 
// history 


{/*

1. Home vr sagle  abmbuance booking print karaychi ,                (Design ✔)
2. profile Update =>  name, email, mobile, photo,  (if mobile no updated  then re login and re verify otp), unavilable:[]
3. ambulance book kartani customer kadun   pick up location and drop location, 
4. JAR DRIVER NE 5min madhe accept nahi keli tr ti dusrya driver la assign zali pahije 
5. driver la cancel cha button  and cancel zalyavr lagech ti dusrya driver la assign zali pahije.
6. history  ambulance booking history per driver.   (Design ✔)
7. 
  
 !! BackEnd Schema
8.   Driver => {
                name:, email:, mobile:, unavilable:[], isonDelivery,
            }
9.   Ambulace Booking =>{
                 patient Name:, PickUp Location , Drop-off Location, Time:, Hospital name
              }
10. Controller =>{
  Fetchbooking by driver ID ,
  Update Driver Profile,
  Driver register, login,otp,
  booking History,
  JAR DRIVER NE 5min madhe accept nahi keli tr ti dusrya driver la assign zali pahije 
  
}

*/ }