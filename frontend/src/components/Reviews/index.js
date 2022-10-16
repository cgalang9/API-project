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

    const reviews = useSelector(state => state.reviews.Reviews)
    console.log(reviews)

    return (
        <>
            {reviews && (reviews.map(review => (
                <>
                    <div>{review.User.firstName}</div>
                    <div>{new Date(review.createdAt).toLocaleString('default', {month: 'long', year: 'numeric'})}</div>
                    <div>{review.review}</div>
                </>
            )))}
        </>
    )
}

export default Reviews
