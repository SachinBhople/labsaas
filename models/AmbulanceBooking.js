const mongoose = require("mongoose")

const ambulanceBookingSchma = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
    },
    pickUpLocation: {
        type: String,
        required: true,
    },
    dropoffLocation: {
        type: String,
        required: true,
    },
    Time: {
        type: String,
    },
    hospitalname: {
        type: String,
    },
    cancleBooking: {
        type: String,
    },
    isAccept: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["pending", "book", "cancleByDriver", "cancleByCustomer", "other"]

    },
    reason: {
        type: String,
        default: false
    },
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "customer"
    },
    driverId: {
        type: mongoose.Types.ObjectId,
        ref: "ambulanceDriver"
    },


}, { timestamps: true })

module.exports = mongoose.models.ambulanceBooking || mongoose.model("ambulanceBooking", ambulanceBookingSchma)


// Ambulace Booking => {
//     patient Name:, PickUp Location, Drop - off Location, Time:, Hospital name
// }



// status- pending, book , cancle by dric/paint ,other
//reson



// cancle by dric=> driver controller hardconrder cancle funcation
// cancle by paint=> customer controller hardconrder cancle funcation
// cancle by other  admin=> admin controller hardconrder cancle funcation



//
// FetchDriverBooking: builder.query({
//     query: () => {
//         return {
//             url: "/driver",
//             method: "GET"
//         }
//     },
//     providesTags: ["driver"],
//     transformResponse: data => date.result
// }),
// UpdateBooking: builder.mutation({
//     query: userData => {
//         return {
//             url: "/driver",
//             method: "PUT",
//             body: userData
//         }
//     },
//     invalidatesTags: ["driver"],
//     transformResponse: data => data.result
// }),
// FetchBookingHistory: builder.query({
//     query: userData => {
//         return {
//             url: /ambulamce-booking-history/${userData._id},
//             method: "PUT",
//             body: userData
//         }
//     },
//     invalidatesTags: ["driver"],
//     transformResponse: data => data.result
// }),
// UpdateDriverData: builder.mutation({
//     query: userData => {
//         return {
//             url: /update-ambulance-driver/${userData._id},
//             method: "PUT",
//             body: userData
//         }
//     },
//     invalidatesTags: ["driver"],
//     transformResponse: data => data.result
// }),
// updateStatus: builder.mutation({
//     query: userData => {
//         return {
//             url: /update-driver-status/${userData._id},
//             method: "PUT",
//             body: userData
//         }
//     },
//     invalidatesTags: ["driver"],
//     transformResponse: data => data.result
// }),