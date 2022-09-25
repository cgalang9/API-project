const express = require('express')
const router = express.Router()
const sequelize = require("sequelize");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

require('dotenv').config()
require('express-async-errors')

const { Spot, Review, SpotImage, User } = require('../../db/models');
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
        attributes: {
            include: [
                [ sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 1), "avgRating" ],
                [ sequelize.col("SpotImages.url"), 'previewImage' ],
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: [],
                order: [['preview', 'DESC']]
            }
        ],
        group: ['spot.id']
    })

    res.json({ "Spots": spots })
})

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: { ownerId: req.user.id },
        attributes: {
            include: [
                [ sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 1), "avgRating" ],
                [ sequelize.col("SpotImages.url"), 'previewImage' ],
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: [],
                order: [['preview', 'DESC']]
            }
        ],
        group: ['spot.id']
    })

    res.json({ "Spots": spots })
})

//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    try {
        const spot = await Spot.findOne({
            where: { id: req.params.spotId },
            attributes: {
                include: [
                    [ sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews" ],
                    [ sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 1), "avgStarRating" ]

                ]
            },
            include: [
                {
                    model: Review,
                    attributes: []
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
            group: ['SpotImages.id']
        })

        if(!spot) { throw new Error("Spot couldn't be found")}

        res.json({
            "id": spot.id,
            "ownerId": spot.ownerId,
            "address": spot.address,
            "city": spot.city,
            "state": spot.state,
            "country": spot.country,
            "lat": spot.lat,
            "lng": spot.lng,
            "name": spot.name,
            "description": spot.description,
            "price": spot.price,
            "createdAt": spot.createdAt,
            "updatedAt": spot.updatedAt,
            "numReviews": spot.numReviews,
            "avgStarRating": spot.avgStarRating,
            "SpotImages": spot.SpotImages,
            "Owner": spot.User
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
            console.log('kkkkkkkkkkk')
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
