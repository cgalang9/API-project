const express = require('express')
const router = express.Router()
const sequelize = require("sequelize");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

require('dotenv').config()
require('express-async-errors')

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.use(express.json())

const validateDate = [
    check('endDate')
    .custom( (endDate, { req }) => {
        if(new Date(req.body.startDate) >= new Date(endDate)) {
            throw new Error ('endDate cannot be on or before startDate');
        }
        return true;
    }),
  handleValidationErrors
]


//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: [
            {
                model: Spot,
                include: SpotImage
            }
        ]
    })

    let allBookings = []
    bookings.forEach(booking => {
        const parsed = booking.toJSON()
        let previewUrl = null
        parsed.Spot.SpotImages.forEach(img => {
            if(img.preview === true) { previewUrl = img.url }
        })

        const spotFinal = {
            "id": parsed.Spot.id,
            "ownerId": parsed.Spot.ownerId,
            "address": parsed.Spot.address,
            "city": parsed.Spot.city,
            "state": parsed.Spot.state,
            "country": parsed.Spot.country,
            "lat": parsed.Spot.lat,
            "lng": parsed.Spot.lng,
            "name": parsed.Spot.name,
            "price": parsed.Spot.price,
            "previewImage": previewUrl
        }

        const bookingFinal = {
            "id": parsed.id,
            "spotId": parsed.spotId,
            "Spot": spotFinal,
            "userId": parsed.userId,
            "startDate": parsed.startDate.toISOString().split('T')[0],
            "endDate": parsed.endDate.toISOString().split('T')[0],
            "createdAt": parsed.createdAt,
            "updatedAt": parsed.updatedAt
        }

        allBookings.push(bookingFinal)

    })
    res.json({ "Bookings": allBookings})
})

router.put('/:bookingId', requireAuth, validateDate, async (req, res, next) => {
    const booking = await Booking.findOne({ where: { id: req.params.bookingId }})

    if(!booking) {
        let err = new Error("Booking couldn't be found")
        err.status = 404
        next(err)
    }

    if(booking.userId !== req.user.id) {
        let err = new Error('Forbidden')
        err.status = 403
        next(err)
    }

    res.json(booking)
})


module.exports = router
