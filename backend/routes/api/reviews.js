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

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
        where: { id: req.user.id },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include:  [ SpotImage ]
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'reviewId']
                }
            }
        ]
    })

    let allReviews = []
    reviews.forEach(review => {
        const parsedReview = review.toJSON()
        let previewUrl = null
        parsedReview.Spot.SpotImages.forEach(img => {
            if(img.preview === true) { previewUrl = img.url }
        })

        const spotFinal = {
            "id": parsedReview.Spot.id,
            "ownerId": parsedReview.Spot.ownerId,
            "address": parsedReview.Spot.address,
            "city": parsedReview.Spot.city,
            "state": parsedReview.Spot.state,
            "country": parsedReview.Spot.country,
            "lat": parsedReview.Spot.lat,
            "lng": parsedReview.Spot.lng,
            "name": parsedReview.Spot.name,
            "description": parsedReview.Spot.description,
            "price": parsedReview.Spot.price,
            "previewImage": previewUrl
        }

        const reviewFinal = {
            "id": parsedReview.id,
            "userId": parsedReview.userId,
            "spotId": parsedReview.spotId,
            "review": parsedReview.review,
            "stars": parsedReview.stars,
            "createdAt": parsedReview.createdAt,
            "updatedAt": parsedReview.updatedAt,
            "User": parsedReview.User,
            "Spot": spotFinal,
            "ReviewImages": parsedReview.ReviewImages
        }
        allReviews.push(reviewFinal)
    });

    res.json(allReviews)
})

module.exports = router
