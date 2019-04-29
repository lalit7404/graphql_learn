const Booking = require('../../models/booking')
const Event = require('../../models/event')
const {transformEvent,transformBooking} = require('./merge');


module.exports = {                     // points to object which have resolver function
    bookings: async () =>{
        try {
            const result = await Booking.find()
            console.log("rererre",result)
            return result.map(booking => {
                return transformBooking(booking)
            })
        }catch (e) {
            throw e
        }
    },
    bookEvent: async args =>{
        try {
            const fetchedEvent= await Event.findOne({_id:args.eventId})
            const booking=new  Booking({
                user:'5cc19aed92ee0f36553cbab0',
                event:fetchedEvent
            });
            const result= await booking.save();
            return transformBooking(result)
        }catch (e) {
            throw e
        }
    },
    cancelBooking: async args => {
        try {
            const booking= await Booking.findById(args.bookingId).populate('event');
            const event= transformEvent(booking.event);
            console.log(event);
            await Booking.deleteOne({_id:args.bookingId});
            return event

        }catch (e) {
            throw e
        }
    }
};





