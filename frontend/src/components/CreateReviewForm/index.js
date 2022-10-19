import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";
import './CreateReviewForm.css'

function CreateReviewForm() {
  const [review, setReview] = useState('')
  const [stars, setStars] = useState(0)
  const [hover, setHover] = useState(0)
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

    const sessionUser = useSelector(state => state.session.user);

    return (
      <>
        {!sessionUser && (
            <Redirect to={`/`} />
        )}
        <div className='create_review_container flex top'>
            <form className='create_review_form flex' onSubmit={handleSubmit}>
              <div className='title'>Create Review</div>
              <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
              <label className='flex'>
                <span className='input_label'>Overall Rating</span>
                <div className="stars_container">
                  <input
                    type="radio"
                    id="1"
                    className="stars"
                    name="rating"
                    checked={stars === 1}
                    onChange={() => setStars(1)}
                  />
                  <label htmlFor="1"
                    className={1 <= Math.max(stars, hover) ? "stars_label_on" : "stars_label_off"}
                    onMouseEnter={() => setHover(1)}
                    onMouseLeave={() => setHover(stars)}
                  >
                    <i className="fa-sharp fa-solid fa-star" />
                  </label>
                  <input
                    type="radio"
                    id="2"
                    className="stars"
                    name="rating"
                    checked={stars === 2}
                    onChange={() => setStars(2)}
                  />
                  <label htmlFor="2"
                    className={2 <= Math.max(stars, hover) ? "stars_label_on" : "stars_label_off"}
                    onMouseEnter={() => setHover(2)}
                    onMouseLeave={() => setHover(stars)}
                  >
                    <i className="fa-sharp fa-solid fa-star" />
                  </label>
                  <input
                    type="radio"
                    id="3"
                    className="stars"
                    name="rating"
                    checked={stars === 3}
                    onChange={() => setStars(3)}
                  />
                  <label htmlFor="3"
                    className={3 <= Math.max(stars, hover) ? "stars_label_on" : "stars_label_off"}
                    onMouseEnter={() => setHover(3)}
                    onMouseLeave={() => setHover(stars)}
                  >
                    <i className="fa-sharp fa-solid fa-star" />
                  </label>
                  <input
                    type="radio"
                    id="4"
                    className="stars"
                    name="rating"
                    checked={stars === 4}
                    onChange={() => setStars(4)}
                  />
                  <label htmlFor="4"
                    className={4 <= Math.max(stars, hover) ? "stars_label_on" : "stars_label_off"}
                    onMouseEnter={() => setHover(4)}
                    onMouseLeave={() => setHover(stars)}
                  >
                    <i className="fa-sharp fa-solid fa-star" />
                  </label>
                  <input
                    type="radio"
                    id="5"
                    className="stars"
                    name="rating"
                    checked={stars === 5}
                    onChange={() => setStars(5)}
                  />
                  <label htmlFor="5"
                    className={5 <= Math.max(stars, hover) ? "stars_label_on" : "stars_label_off"}
                    onMouseEnter={() => setHover(5)}
                    onMouseLeave={() => setHover(stars)}
                  >
                    <i className="fa-sharp fa-solid fa-star" />
                  </label>
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
