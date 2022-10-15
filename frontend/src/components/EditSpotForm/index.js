import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSpotThunk } from "../../store/spots";
import { Redirect, useHistory, useParams } from "react-router-dom";
import './EditSpotForm.css'

function EditSpotForm({ spot }) {
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [address, setAddress] = useState(null)
    const [city, setCity] = useState(null)
    const [st, setSt] = useState(null)
    const [country, setCountry] = useState(null)
    const [description, setDescription] = useState(null)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()

    //fixed bug when refreshing page spot was undefined and gave an error
    if(spot) {
      if(name === null) setName(spot.name)
      if(name === null) setPrice(spot.price)
      if(name === null) setAddress(spot.address)
      if(name === null) setCity(spot.city)
      if(name === null) setSt(spot.state)
      if(name === null) setCountry(spot.country)
      if(name === null) setDescription(spot.description)
    }

    //to following line along with the Redirect tag in return below, redirects user to spot details page if he is not the owner of the spot
    const sessionUser = useSelector(state => state.session.user);
    let isOwner = false
    if (spot && sessionUser.id === spot.ownerId && isOwner === false) {
        isOwner = (true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSpot = {
            name,
            price,
            address,
            city,
            state: st,
            country,
            description
        }

        setErrors([]);
        setName('')
        setPrice(0)
        setAddress('')
        setCity('')
        setCountry('')
        setDescription('')

        dispatch(editSpotThunk(newSpot, spotId))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                  setErrors(Object.values(data.errors))
                  console.log(errors)
              } else if (data.message) {
                  setErrors([data.message])
              }
          });

          history.push(`/spots/${spotId}`)
    };


    return (
      <>
      {!isOwner && (
        <Redirect to={`/spots/${spotId}`} />
      )}
      {spot && (
        <div className='edit_form_container flex'>
            <form onSubmit={handleSubmit} className='edit_form flex'>
              <div className='title'>Edit Your Listing</div>
              <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
              <label className='flex'>
                <span className='input_label'>Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className='flex'>
                <span className='input_label'>Price per night (USD)</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </label>
              <label className='flex'>
                <span className='input_label'>Address</span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>
              <label className='flex'>
                <span className='input_label'>City</span>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </label>
              <label className='flex'>
                <span className='input_label'>State</span>
                <input
                  type="text"
                  value={st}
                  onChange={(e) => setSt(e.target.value)}
                  required
                />
              </label>
              <label className='flex'>
                <span className='input_label'>Country</span>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </label>
              <label className='flex'>
                <span className='input_label'>Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="input_description"
                />
              </label>
              <button type="submit" className="confirm_changes_btn">Confirm Changes</button>
            </form>
        </div>
      )}
      </>
    )
}

export default EditSpotForm
