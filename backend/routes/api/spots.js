const express = require('express')
const router = express.Router()
const sequelize = require("sequelize");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

require('dotenv').config()
require('express-async-errors')

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const spot = require('../../db/models/spot');
const { requireAuth } = require('../../utils/auth');

router.use(express.json())

const validateCreateSpot = [
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

//Get all spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
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
        const reviews = await Review.findAll({
            include: [
                {
                    model: Spot,
                    where: { id: req.params.spotId },
                    attributes: []
                },
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

        if(!reviews.length) { throw new Error("Spot couldn't be found") }

        res.json({ "Reviews": reviews })

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
router.post('/', requireAuth, validateCreateSpot, async (req, res, next) => {
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

// Edit a Spot
router.put('/:spotId', requireAuth, validateCreateSpot, async (req, res, next) => {
    try {
        const spot = await Spot.findOne({ where: { id: req.params.spotId }})
        if(!spot) { throw new Error("Spot couldn't be found") }

        if(spot.ownerId !== req.user.id) {
            let err = new Error('Forbidden')
            err.status = 403
            next(err)
        } else {
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
            res.json(newSpot)
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
