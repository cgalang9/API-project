import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './CreateReviewForm.css'

function CreateReviewForm() {
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()

    return (
      <>
        <div className='create_review_container flex'>
            <form className='create_review_form flex'>
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
              <button type="submit" className="create_review_btn">Create Review</button>
            </form>
        </div>
      </>
    )
}

export default CreateReviewForm
