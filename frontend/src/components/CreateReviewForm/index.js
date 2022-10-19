import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";
import './CreateReviewForm.css'

function CreateReviewForm() {
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState([])
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
          review,
          stars
        }

        setErrors([]);

        dispatch(createReviewThunk(newReview, spotId))
          .then(() => history.push(`/spots/${spotId}`))
          .catch(async (res) => {
            const data = await res.json();
            if(data.statusCode === 404) {
              history.push('/404')
            }
            if(data.statusCode === 403) {
              history.push('/403')
            }
            if (data && data.errors) {
                  setErrors(Object.values(data.errors))
                  console.log(errors)
              } else if (data.message) {
                  setErrors([data.message])
              }
          });
      };

    return (
      <>
        <div className='create_review_container flex'>
            <form className='create_review_form flex' onSubmit={handleSubmit}>
              <div className='title'>Create Review</div>
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
                <span className='input_label'>Rating</span>
                <div className="stars_container">
                  <input
                    type="radio"
                    id="1"
                    className="stars"
                    name="rating"
                  />
                  <label htmlFor="1" className="stars_label"><i class="fa-sharp fa-solid fa-star" /></label>
                  <input
                    type="radio"
                    id="2"
                    className="stars"
                    name="rating"
                  />
                  <label htmlFor="2" className="stars_label"><i class="fa-sharp fa-solid fa-star" /></label>
                  <input
                    type="radio"
                    id="3"
                    className="stars"
                    name="rating"
                  />
                  <label htmlFor="3" className="stars_label"><i class="fa-sharp fa-solid fa-star" /></label>
                  <input
                    type="radio"
                    id="4"
                    className="stars"
                    name="rating"
                  />
                  <label htmlFor="4" className="stars_label"><i class="fa-sharp fa-solid fa-star" /></label>
                  <input
                    type="radio"
                    id="5"
                    className="stars"
                    name="rating"
                  />
                  <label htmlFor="5" className="stars_label"><i class="fa-sharp fa-solid fa-star" /></label>
                </div>
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
