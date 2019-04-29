const Event = require('../../models/event');
const User = require('../../models/User');
const {dateToString}= require('../helpers/date');


const events = async eventIds => {                       // called only if required
    try {
        const events = await Event.find({_id: {$in: eventIds}});
        return events.map(event => {
            return transformEvent(event)
        })
    } catch (err) {
        throw err
    }


};

const singleEvents = async eventId => {
    try {
        const event = await Event.findById( eventId)
        return transformEvent(event)

    }catch (e) {
        throw e
    }
};

const user = async userId => {                // called only if required
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            createdEvents: events.bind(this, user._doc.createdEvents)
        }
    } catch (e) {
        throw e
    }

};

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    }
};

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this,booking._doc.user),
        event: singleEvents.bind(this,booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt),
    }
};


/*module.exports.user=user
module.exports.events=events
module.exports.singleEvents=singleEvents*/
module.exports.transformEvent=transformEvent
module.exports.transformBooking=transformBooking