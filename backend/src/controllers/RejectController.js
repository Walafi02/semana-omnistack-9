const Booking = require("./../models/Booking");
const Spot = require("./../models/Spot");

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id);

        booking.approved = false;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user];

        const spot = await Spot.findById(booking.spot);

        if (bookingUserSocket) {
            req.io
                .to(bookingUserSocket)
                .emit("booking_response", { ...booking._doc, spot });
        }

        return res.json({ ...booking._doc, spot });
    }
};
