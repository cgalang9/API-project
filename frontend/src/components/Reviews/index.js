import { getAllReviewsThunk } from '../../store/reviews'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Reviews() {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllReviewsThunk(spotId))
    }, [dispatch, spotId])

    const reviews = useSelector(state => state.reviews)
    console.log(reviews)

    return (
        <h1>Reviews</h1>
    )
}

export default Reviews
