import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpotThunk } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import './EditSpotForm.css'

function EditSpotForm({ spot }) {
    const [name, setName] = useState(spot.name)
    const [price, setPrice] = useState(spot.price)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [st, setSt] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [description, setDescription] = useState(spot.description)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()

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

    //     dispatch(createSpotThunk(newSpot))
    //       .catch(async (res) => {
    //         const data = await res.json();
    //         if (data && data.errors) {
    //               setErrors(Object.values(data.errors))
    //               console.log(errors)
    //           } else if (data.message) {
    //               setErrors([data.message])
    //           }
    //       });

    //       history.push('/')
    // };


    return (
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
    )
}

export default EditSpotForm
