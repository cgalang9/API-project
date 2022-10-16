import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import './EditReviewForm.css'

function EditReviewForm({ spot }) {
    const [review, setReview] = useState(null)
    const [stars, setStars] = useState(null)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()

    //fixed bug when refreshing page spot was undefined and gave an error
    // if(spot) {
    //   if(name === null) setName(spot.name)
    //   if(name === null) setPrice(spot.price)
    // }

    //to following line along with the Redirect tag in return below, redirects user to spot details page if he is not the owner of the spot
    // const sessionUser = useSelector(state => state.session.user);
    // let isOwner = false
    // if (spot && sessionUser.id === spot.ownerId && isOwner === false) {
    //     isOwner = (true)
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newSpot = {
    //         name,
    //         price,
    //         address,
    //         city,
    //         state: st,
    //         country,
    //         description
    //     }

    //     setErrors([]);
    //     setName('')
    //     setPrice(0)
    //     setAddress('')
    //     setCity('')
    //     setCountry('')
    //     setDescription('')

    //     dispatch(editSpotThunk(newSpot, spotId))
    //       .catch(async (res) => {
    //         const data = await res.json();
    //         if (data && data.errors) {
    //               setErrors(Object.values(data.errors))
    //               console.log(errors)
    //           } else if (data.message) {
    //               setErrors([data.message])
    //           }
    //       });

    //       history.push(`/spots/${spotId}`)
    // };

    return (
      <>
      {/* {!isOwner && (
        <Redirect to={`/spots/${spotId}`} />
      )} */}
      {spot && (
        <div className='edit_review_container flex'>
            <form onSubmit={handleSubmit} className='edit_review_form flex'>
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
