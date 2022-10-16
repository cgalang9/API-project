import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getCurrUserReviewsThunk } from "../../store/reviews";
import './EditReviewForm.css'

function EditReviewForm() {
    const [review, setReview] = useState(null)
    const [stars, setStars] = useState(-10000)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const { reviewId } = useParams()

    useEffect(() => {
      dispatch(getCurrUserReviewsThunk())
    },[dispatch])

    const reviews = useSelector(state => state.reviews.Reviews)

    //fixes bug when refreshing page spot was undefined and gave an error
    if (reviews) {
      const currentReview = reviews.filter(review => review.id.toString() === reviewId)
      const currentReviewObj = currentReview[0]
      if(stars === -10000) setStars(currentReviewObj.stars)
      if(review === null) setReview(currentReviewObj.review)
    }



    return (
      <>
      {reviews && (
        <div className='edit_review_container flex'>
            <form className='edit_review_form flex'>
              <div className='title'>Edit Your Review</div>
              <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
              <label className='flex'>
                <span className='input_label'>Stars</span>
                <input
                  type="number"
                  value={stars}
                  onChange={(e) => setStars(e.target.value)}
                  required
                  max={5}
                  min={0}
                />
              </label>
              <label className='flex'>
                <span className='input_label'>Review</span>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                  className="input_review"
                />
              </label>
              <button type="submit" className="confirm_changes_btn">Confirm Changes</button>
            </form>
        </div>
      )}
      </>
    )
}

export default EditReviewForm
