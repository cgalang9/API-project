const express = require('express')
const router = express.Router()
const sequelize = require("sequelize");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

require('dotenv').config()
require('express-async-errors')

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.use(express.json())

const validateReview = [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 0, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
        where: { userId: req.user.id },
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

    res.json({ "Reviews": allReviews})
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findOne({ where: { id: req.params.reviewId } })

    try {
        if(!review) { throw new Error("Review couldn't be found")}
    } catch (err) {
        err.status = 404
        next(err)
    }

    try {
        if(review.userId != req.user.id) { throw new Error("Forbidden")}
    } catch (err) {
        err.status = 403
        next(err)
    }

    try {
        const images = await ReviewImage.findAll({ where: { reviewId: req.params.reviewId }})
        if(images.length >= 10) { throw new Error("Maximum number of images for this resource was reached")}

        const newImg = await ReviewImage.create({
            "reviewId": req.params.reviewId,
            "url": req.body.url
        })

        res.json({
            "id": newImg.id,
            "url": newImg.url
        })

    } catch (err) {
        err.status = 403
        next(err)
    }
})

//Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const review  = await Review.findOne({ where: { id: req.params.reviewId } })

    try {
        if (!review) { throw new Error("Review couldn't be found")}
    } catch (err) {
        err.status = 404
        next(err)
    }

    try {
        if(review.userId != req.user.id) { throw new Error("Forbidden")}

        review.update({
            "review": req.body.review,
            "stars": req.body.stars
        })

        res.json(review)

    } catch (err) {
        err.status = 403
        next(err)
    }

})

//Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const review  = await Review.findOne({ where: { id: req.params.reviewId } })

    try {
        if (!review) { throw new Error("Review couldn't be found")}
    } catch (err) {
        err.status = 404
        next(err)
    }

    try {
        if(review.userId != req.user.id) { throw new Error("Forbidden")}

        review.destroy()

        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })

    } catch (err) {
        err.status = 403
        next(err)
    }

})


module.exports = router
