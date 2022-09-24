const express = require('express')
const router = express.Router()
const sequelize = require("sequelize");

require('dotenv').config()
require('express-async-errors')

const { Spot, Review, SpotImage, User } = require('../../db/models');
const spot = require('../../db/models/spot');
const { requireAuth } = require('../../utils/auth');

router.use(express.json())

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

    res.json(spots)
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
                    as: 'Owner'
                }
            ],
            group: ['SpotImages.id']
        })

        if(!spot) { throw new Error("Spot couldn't be found")}
        res.json(spot)

    } catch (err) {
        err.status = 404
        next(err)
    }
})

module.exports = router
