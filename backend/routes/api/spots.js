const express = require('express')
const router = express.Router()
const sequelize = require("sequelize");
const { check } = require('express-validator');
const { query } = require('express-validator/check');
const { handleValidationErrors } = require('../../utils/validation');

require('dotenv').config()
require('express-async-errors')

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");



router.use(express.json())

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
      .isNumeric()
      .withMessage('Latitude is not valid'),
    check('lng')
      .isNumeric()
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 49 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: false })
    .isInt({ min: 0, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

const validateDate = [
    check('startDate')
    .isDate(),
    check('endDate')
    .isDate()
    .custom( (endDate, { req }) => {
        if(new Date(req.body.startDate) >= new Date(endDate)) {
            throw new Error ('endDate cannot be on or before startDate');
        }
        return true;
    }),
  handleValidationErrors
]

const validateSpotQuery = [
    query('maxLat')
    .optional({checkFalsy: false})
    .isDecimal()
    .withMessage('Maximum latitude is invalid'),
    query('minLat')
    .optional({checkFalsy: false})
    .isDecimal()
    .withMessage('Minimum latitude is invalid'),
    query('maxLng')
    .optional({checkFalsy: false})
    .isDecimal()
    .withMessage('Maximum longitude is invalid'),
    query('minLng')
    .optional({checkFalsy: false})
    .isDecimal()
    .withMessage('Minimum longitude is invalid'),
    query('maxPrice')
    .optional({checkFalsy: false})
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be greater than or equal to 0'),
    query('minPrice')
    .optional({checkFalsy: false})
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be greater than or equal to 0'),

    handleValidationErrors
]


//Get all spots
router.get('/', validateSpotQuery, async (req, res, next) => {
    let where = {}

    let page = 1
    if(req.query.page) {
        page = Number(req.query.page);
        if (Number.isNaN(page)) { page = 1 }
        if (page > 10) { page = 10 }
        if(page <= 0) {
            let err = new Error('Validation Error')
            err.status = 400
            err.errors = { "page": "Page must be greater than or equal to 1" }
            next(err)
        }
    }

    let size = 20
    if(req.query.size) {
        size = Number(req.query.size);
        if (Number.isNaN(size) || size > 20) { size = 20 }
        if(size <= 0) {
            let err = new Error('Validation Error')
            err.status = 400
            err.errors = { "size": "Size must be greater than or equal to 1" }
            next(err)
        }
    }

    if(req.query.minLat) {
        if(req.query.maxLat) {
            const innerQuery = { [Op.between]: [req.query.minLat, req.query.maxLat] }
            where.lat = innerQuery
        } else {
            const innerQuery = { [Op.gte]: req.query.minLat }
            where.lat = innerQuery
        }
    }

    if(req.query.maxLat && !req.query.minLat) {
        const innerQuery = { [Op.lte]: req.query.maxLat }
        where.lat = innerQuery
    }

    if(req.query.minLng) {
        if(req.query.maxLng) {
            const innerQuery = { [Op.between]: [req.query.minLng, req.query.maxLng] }
            where.lng = innerQuery
        } else {
            const innerQuery = { [Op.gte]: req.query.minLng }
            where.lng = innerQuery
        }
    }

    if(req.query.maxLng && !req.query.minLng) {
        const innerQuery = { [Op.lte]: req.query.maxLng }
        where.lng = innerQuery
    }

    if(req.query.minPrice) {
        if(req.query.maxPrice) {
            const innerQuery = { [Op.between]: [req.query.minPrice, req.query.maxPrice] }
            where.price = innerQuery
        } else {
            const innerQuery = { [Op.gte]: req.query.minPrice }
            where.price = innerQuery
        }
    }

    if(req.query.maxPrice && !req.query.minPrice) {
        const innerQuery = { [Op.lte]: req.query.maxPrice }
        where.price = innerQuery
    }




    const spots = await Spot.findAll({
        where,
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: SpotImage,
                attributes: ['url', 'preview']
            }
        ],
        limit: size,
        offset: size * (page - 1),
    })

    let spotsArr = []
    spots.forEach(spot => {
        const parsed = spot.toJSON();

        let sumStars = 0
        parsed.Reviews.forEach(review => {
            sumStars += review['stars']
        })
        const avgStars = sumStars/(parsed.Reviews.length)
        const avgStarsRounded = Math.round(avgStars * 10) / 10

        let prevUrl = ''
        parsed.SpotImages.forEach(img => {
            if (img.preview === true) {
                prevUrl = img.url
            }
        })


        let spotObj = {
            "id": parsed.id,
            "ownerId": parsed.ownerId,
            "address": parsed.address,
            "city": parsed.city,
            "state": parsed.state,
            "country": parsed.country,
            "lat": parsed.lat,
            "lng": parsed.lng,
            "name": parsed.name,
            "description": parsed.description,
            "price": parsed.price,
            "createdAt": parsed.createdAt,
            "updatedAt": parsed.updatedAt,
            "avgRating": avgStarsRounded,
            "previewImage": prevUrl
        }
        spotsArr.push(spotObj)
    })
    res.json({
        "Spots": spotsArr,
        page,
        size
    })
})

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: { ownerId: req.user.id },
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: SpotImage,
                attributes: ['url', 'preview']
            }
        ],
    })

    let spotsArr = []
    spots.forEach(spot => {
        const parsed = spot.toJSON();

        let sumStars = 0
        parsed.Reviews.forEach(review => {
            sumStars += review['stars']
        })
        const avgStars = sumStars/(parsed.Reviews.length)
        const avgStarsRounded = Math.round(avgStars * 10) / 10

        let prevUrl = ''
        parsed.SpotImages.forEach(img => {
            if (img.preview === true) {
                prevUrl = img.url
            }
        })


        let spotObj = {
            "id": parsed.id,
            "ownerId": parsed.ownerId,
            "address": parsed.address,
            "city": parsed.city,
            "state": parsed.state,
            "country": parsed.country,
            "lat": parsed.lat,
            "lng": parsed.lng,
            "name": parsed.name,
            "description": parsed.description,
            "price": parsed.price,
            "createdAt": parsed.createdAt,
            "updatedAt": parsed.updatedAt,
            "avgRating": avgStarsRounded,
            "previewImage": prevUrl
        }
        spotsArr.push(spotObj)
    })
    res.json({ "Spots": spotsArr })
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    try {
        const spot = await Spot.findOne({ where: { id: req.params.spotId }})

        if(!spot) { throw new Error("Spot couldn't be found") }

        const reviews = await Review.findAll({
            where: { spotId: req.params.spotId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        })

        res.json({ "Reviews": reviews })

    } catch (err) {
        err.status = 404
        next(err)
    }
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    try {
        const spot = await Spot.findOne({ where: { id: req.params.spotId }})

        if(!spot) { throw new Error("Spot couldn't be found") }

        const bookings = await Booking.findAll({
            where: { spotId: req.params.spotId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Spot
                }
            ]
        })

        let allBookings = []

        bookings.forEach(booking => {
            const parsed = booking.toJSON()
            if(req.user.id == parsed.Spot.ownerId) {
                const bookingFinal = {
                    "User": parsed.User,
                    "id": parsed.id,
                    "spotId": parsed.spotId,
                    "userId": parsed.userId,
                    "startDate": parsed.startDate.toISOString().split('T')[0],
                    "endDate": parsed.endDate.toISOString().split('T')[0],
                    "createdAt": parsed.createdAt,
                    "updatedAt": parsed.updatedAt
                }
                allBookings.push(bookingFinal)
            } else {
                const bookingFinal = {
                    "spotId": parsed.spotId,
                    "startDate": parsed.startDate.toISOString().split('T')[0],
                    "endDate": parsed.endDate.toISOString().split('T')[0],
                }
                allBookings.push(bookingFinal)
            }

        })
        res.json({ "Bookings": allBookings })
    } catch (err) {
        err.status = 404
        next(err)
    }
})


//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    try {
        const spot = await Spot.findOne({
            where: { id: req.params.spotId },

            include: [
                {
                    model: Review,
                    attributes: ['stars']
                },
                {
                    model: SpotImage,
                    attributes: ['id', 'url', 'preview']
                },
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                }
            ],
        })

        if(!spot) { throw new Error("Spot couldn't be found") }

        const parsed = spot.toJSON()
        const numReviews = parsed.Reviews.length

        let sum = 0
        parsed.Reviews.forEach(review => {
            sum += review.stars
        })

        const avgStars = sum / numReviews
        const avgStarsRounded = Math.round(avgStars * 10) / 10


        res.json({
            "id": parsed.id,
            "ownerId": parsed.ownerId,
            "address": parsed.address,
            "city": parsed.city,
            "state": parsed.state,
            "country": parsed.country,
            "lat": parsed.lat,
            "lng": parsed.lng,
            "name": parsed.name,
            "description": parsed.description,
            "price": parsed.price,
            "createdAt": parsed.createdAt,
            "updatedAt": parsed.updatedAt,
            "numReviews": numReviews,
            "avgStarRating": avgStarsRounded,
            "SpotImages": parsed.SpotImages,
            "Owner": parsed.User

        })

    } catch (err) {
        err.status = 404
        next(err)
    }

})



//Creates and returns a new spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.status(201)
    res.json(newSpot)
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    try {
        const spot = await Spot.findOne({ where: { id: req.params.spotId }})
        if(!spot) { throw new Error("Spot couldn't be found") }

        if(spot.ownerId !== req.user.id) {
            let err = new Error('Forbidden')
            err.status = 403
            next(err)
        } else {
            const newImage = await SpotImage.create({
                spotId: spot.id,
                url: req.body.url,
                preview: req.body.preview
            })
            res.json({
                id: newImage.id,
                url: newImage.url,
                preview: newImage.preview
            })
        }

    } catch (err) {
        err.status = 404
        next(err)
    }
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    try {
        const spot = await Spot.findOne({ where: { id: req.params.spotId } })
        if(!spot) { throw new Error("Spot couldn't be found") }
    } catch (err) {
        err.status = 404
        next(err)
    }

    try {
        const reviews = await Review.findAll({
            where: { spotId: req.params.spotId }
        })
        reviews.forEach( review => {
            const parsedReview = review.toJSON()
            if (parsedReview.userId == req.user.id) {
                throw new Error("User already has a review for this spot")
            }
        })

        const newReview = await Review.create({
            "spotId": Number(req.params.spotId),
            "userId": req.user.id,
            "review": req.body.review,
            "stars": req.body.stars
        })
        res.status(201)
        res.json(newReview)

    } catch (err) {
        err.status = 403
        next(err)
    }
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, validateDate, async (req, res, next) => {

        const spot = await Spot.findOne({
            where: { id: req.params.spotId },
            include: Booking
        })

        if(!spot) {
            let err = new Error("Spot couldn't be found")
            err.status = 404
            next(err)
        }

        if(spot.ownerId === req.user.id) {
            let err = new Error('Forbidden')
            err.status = 403
            next(err)
        }

        const currentBookings = []

        spot.Bookings.forEach(booking => {
            currentBookings.push([booking.startDate, booking.endDate])
        })

        const newStartDate = new Date(req.body.startDate)
        const newEndDate = new Date(req.body.endDate)

        currentBookings.forEach(dates => {
            if (newStartDate >= dates[0] && newStartDate <= dates[1]) {
                let err = new Error('Sorry, this spot is already booked for the specified dates')
                err.status = 403
                err.errors = { "startDate": "Start date conflicts with an existing booking" }
                if (newEndDate >= dates[0] && newEndDate <= dates[1]) {
                    err.errors = { "startDate": "Start date conflicts with an existing booking",
                        "endDate": "End date conflicts with an existing booking"
                    }
                }
                next(err)
            }

            if (newEndDate >= dates[0] && newEndDate <= dates[1]) {
                let err = new Error('Sorry, this spot is already booked for the specified dates')
                err.status = 403
                err.errors = { "endDate": "End date conflicts with an existing booking" }
                next(err)
            }

            if (newStartDate < dates[0] && newEndDate > dates[1]) {
                let err = new Error('Sorry, this spot is already booked for the specified dates')
                err.status = 403
                err.errors = { "startDate": "Start date conflicts with an existing booking",
                        "endDate": "End date conflicts with an existing booking"
                    }
                next(err)
            }
        })

        const newBooking = await Booking.create({
            "spotId": Number(req.params.spotId),
            "userId": req.user.id,
            "startDate": new Date(req.body.startDate),
            "endDate": new Date(req.body.endDate)
        })

        res.json({
            "id": newBooking.id,
            "spotId": newBooking.spotId,
            "userId": newBooking.userId,
            "startDate": newBooking.startDate.toISOString().split('T')[0],
            "endDate": newBooking.endDate.toISOString().split('T')[0],
            "createdAt": newBooking.createdAt,
            "updatedAt": newBooking.updatedAt
        })

})


// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    try {
        const spot = await Spot.findOne({ where: { id: req.params.spotId }})
        if(!spot) { throw new Error("Spot couldn't be found") }

        if(spot.ownerId !== req.user.id) {
            let err = new Error('Forbidden')
            err.status = 403
            next(err)
        } else {
            const { address, city, state, country, lat, lng, name, description, price } = req.body
            spot.update({
                ownerId: req.user.id,
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            })
            res.json(spot)
        }

    } catch (err) {
        err.status = 404
        next(err)
    }
})

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    try {
        const spot = await Spot.findOne({ where: { id: req.params.spotId }})
        if(!spot) { throw new Error("Spot couldn't be found") }

        if(spot.ownerId !== req.user.id) {
            let err = new Error('Forbidden')
            err.status = 403
            next(err)
        } else {
            spot.destroy()

            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            })

        }



    } catch (err) {
        err.status = 404
        next(err)
    }
})




module.exports = router
