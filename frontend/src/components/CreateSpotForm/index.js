import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateSpotForm.css'

function CreateSpotForm() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [st, setSt] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        //   setErrors([]);
        //   return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        //     .catch(async (res) => {
        //       const data = await res.json();
        //       if (data && data.errors) {
        //             setErrors(Object.values(data.errors))
        //             console.log(errors)
        //         } else if (data.message) {
        //             setErrors([data.message])
        //         }
        //     });
      };


    return (
        <div className='create_form_container flex'>
            <form onSubmit={handleSubmit} className='create_form flex'>
              <div className='title'>Create A New Listing</div>
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
                <span className='input_label'>Price per night</span>
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
              <button type="submit" className="create_btn">Create Listing</button>
            </form>
        </div>
    )
}

export default CreateSpotForm
