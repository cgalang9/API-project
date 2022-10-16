import { getCurrUserReviewsThunk } from '../../store/reviews'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { NavLink, Route } from 'react-router-dom'

import './ReivewsCurrentUser.css'


function ReivewsCurrentUser() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrUserReviewsThunk())
    },[dispatch])

    const reviews = useSelector(state => state.reviews.Reviews)

    return (
        <div className="users_reviews_container">
            {reviews && (reviews.map(review => (
                <div key={review.id}>
                    <div>==========================</div>
                    <div>{review.Spot.name}</div>
                    <div>{review.Spot.city}, {review.Spot.state}</div>
                    <div>{new Date(review.createdAt).toLocaleString('default', {month: 'long', year: 'numeric'})}</div>
                    <div>{review.review}</div>
                    <NavLink to={`reviews/${review.id}/edit`}>Edit Review</NavLink>
                </div>
            )))}
        </div>
    )
}

export default ReivewsCurrentUser
