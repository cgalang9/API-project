const express = require('express')
const router = express.Router()
const sequelize = require("sequelize");

require('dotenv').config()
require('express-async-errors')

const { Spot, Review, SpotImage, User } = require('../../db/models');
const spot = require('../../db/models/spot');

router.use(express.json())



//Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findOne({
        where: { id: req.params.spotId },
        attributes: {
            include: [
                [ sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews" ],
                [ sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 1), "averageStars" ]

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
    res.json(spot)
})

module.exports = router
