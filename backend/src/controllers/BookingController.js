const Booking = require("../models/Booking");
const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        // await booking.populate("spot").execPopulate();
        // .populate("user")

        const spot = await Spot.findById(spot_id);
        const user = await User.findById(user_id);

        const ownerSocket = req.connectedUsers[spot.user];

        if (ownerSocket) {
            req.io
                .to(ownerSocket)
                .emit("booking_request", { ...booking._doc, user, spot });
        }

        return res.json({ ...booking._doc, user, spot });
    }
};
