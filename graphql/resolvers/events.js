const Event = require('../../models/event');
const {transformEvent} = require('./merge');

module.exports = {                     // points to object which have resolver function
    events: async () => {
        try {
            const result = await Event.find()
            return result.map(event => {
                return  transformEvent(event)
            })
        } catch (e) {
            throw e
        }


    },
    createEvent: async (args,req) => {
        try {
            if(!req.isAuth){
                throw new Error('UnAuhenticated')
            }
            let evenData = args.eventInput;
            const event = new Event({
                title: evenData.title,
                description: evenData.description,
                price: +evenData.price,
                date: new Date().toISOString(),
                creator: '5cc19aed92ee0f36553cbab0'
            });
            let createdEvent;
            let result = await event.save();
            createdEvent =  transformEvent(result);
            const userById = await User.findById('5cc19aed92ee0f36553cbab0');
            if (!userById) {
                throw new Error('User Not Found')
            }
            userById.createdEvents.push(event);
            await userById.save();
            return createdEvent
        } catch (e) {
            throw e
        }

    },




};