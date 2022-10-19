import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getCurrUserReviewsThunk, deleteReviewThunk, editReviewThunk } from "../../store/reviews";
import './EditReviewForm.css'

function EditReviewForm() {
    const [review, setReview] = useState(null)
    const [stars, setStars] = useState(-10000)
    const [hover, setHover] = useState(0)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const { reviewId } = useParams()

    useEffect(() => {
      dispatch(getCurrUserReviewsThunk())
    },[dispatch])

    const reviews = useSelector(state => state.reviews.Reviews)

    //fixes bug when refreshing page spot was undefined and gave an error
    let currentReviewObj;
    if (reviews) {
      const currentReview = reviews.filter(review => review.id.toString() === reviewId)
      currentReviewObj = currentReview[0]
      if(stars === -10000) setStars(currentReviewObj.stars)
      if(review === null) setReview(currentReviewObj.review)
    }

    //following lines along with the Redirect tag in return below, redirects user to spot details page if he is not the owner of the spot
    const sessionUser = useSelector(state => state.session.user);
    let isOwner = false
    if (currentReviewObj && sessionUser.id === currentReviewObj.userId && isOwner === false) {
        isOwner = (true)
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const newReview = {
        review,
        stars
      }

      setErrors([]);

      dispatch(editReviewThunk(newReview, reviewId))
        .then(() => history.push(`/current-user/reviews`))
        .catch(async (res) => {
          const data = await res.json();
          if(data.statusCode === 404) {
            history.push('/404')
          }
          if (data && data.errors) {
                setErrors(Object.values(data.errors))
            } else if (data.message) {
                setErrors([data.message])
            }
        });
    };

    const deleteReview = () => {
      if(window.confirm("Are you sure you want to delete this review? You can not recover the review after deletion.")) {
        dispatch(deleteReviewThunk(reviewId))
          .then(() => history.push('/current-user/reviews'))
          .catch(() => history.push('/404'))
      }
    }


    return (
      <>
      {!isOwner && (
        <Redirect to={`/current-user/reviews`} />
      )}
      {reviews && (
        <div className='edit_review_container flex top'>
            <form className='edit_review_form flex' onSubmit={handleSubmit}>
              <div className='title'>Edit Your Review</div>
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
              <button type="submit" className="confirm_changes_btn">Confirm Changes</button>
            </form>
            <button className="delete_review_btn" onClick={deleteReview}>Delete Review</button>
        </div>
      )}
      </>
    )
}

export default EditReviewForm
