import { getCurrUserReviewsThunk } from '../../store/reviews'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { NavLink } from 'react-router-dom'

import './ReivewsCurrentUser.css'


function ReivewsCurrentUser() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrUserReviewsThunk())
    },[dispatch])

    const reviews = useSelector(state => state.reviews.Reviews)


    return (
        <>
        <div className="users_reviews_container top">
            <h1>Reviews by you</h1>
            <div className="users_reviews_list">
                <div className='users_reviews_list_head'>Past reviews you’ve written</div>
                {reviews && reviews.length > 0 && reviews[0].Spot && (reviews.map((review, index) => (
                    <div key={review.id} className="users_reviews_list_item" >
                        {index > 0 && (<hr/>)}
                        <div className='users_reviews_list_item_name'>Review for {review.Spot.name}</div>
                        <div className='users_reviews_list_item_text'>{review.review}</div>
                        <div className='users_reviews_list_item_date'>{new Date(review.createdAt).toLocaleString('default', {month: 'long', year: 'numeric'})}</div>
                        <NavLink to={`reviews/${review.id}/edit`}>Edit/Delete Review</NavLink>
                    </div>
                )))}
            </div>
        </div>
        </>
    )
}

export default ReivewsCurrentUser
