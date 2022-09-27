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

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const img = await SpotImage.findOne({
        where: { id: req.params.imageId },
        include: Spot
    })

    const parsedImg = img.toJSON()

    if(parsedImg.Spot.ownerId !== req.user.id) {
        let err = new Error('Forbidden')
        err.status = 403
        return next(err)
    }



    res.json(img)
})


module.exports = router
