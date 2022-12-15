import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpotThunk } from "../../store/spots";
import { useHistory, Redirect } from "react-router-dom";
import './CreateSpotForm.css'

function CreateSpotForm() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(1)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [st, setSt] = useState('')
  const [country, setCountry] = useState('')
  const [description, setDescription] = useState('')
  const [previewImage, setPreviewImage] = useState(null)
  const [otherImgUrls, setotherImgUrls] = useState(null)
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()
  const history = useHistory()

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

    const imagesArr = otherImgUrls.split(', ')
    dispatch(createSpotThunk(newSpot, previewImage, imagesArr))
      .then(() => history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
              setErrors(Object.values(data.errors))
              console.log(errors)
          } else if (data.message) {
              setErrors([data.message])
          }
      });
    };

    const sessionUser = useSelector(state => state.session.user);
    console.log(previewImage)
    return (
      <>
        {!sessionUser && (
            <Redirect to={`/`} />
        )}
        <div className='create_form_container flex top'>
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
                  maxLength={49}
                  className="input_top"
                  />
              </label>
              <label className='flex'>
                <span className='input_label'>Price per night (USD)</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min={1}
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
              {/* <label className='flex'>
                <span className='input_label'>Preview Image</span>
                <input
                  value={previewImage}
                  onChange={(e) => setPreviewImage(e.target.value)}
                  required
                  className="input_prev_img"
                  />
                <input className="input_file" type="file" onChange={(e) => setPreviewImage(e.target.files[0])} required/>
              </label> */}
              {/* <label className='flex'>
                <span className='input_label'>Other Images URL (separate each URL with comma)</span>
                <textarea
                  value={otherImgUrls}
                  onChange={(e) => setotherImgUrls(e.target.value)}
                  className="input_img_urls"
                  />
              </label> */}
              <label className='flex'>
                <span className='input_label'>Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="input_description input_bottom"
                  />
              </label>
              <div className="add_imgs_spot_form flex">
                <div className="add_imgs_spot_head">Upload Images</div>
                <label>
                  <span>Preview Image:</span>
                  <input className="input_file" type="file" onChange={(e) => setPreviewImage(e.target.files[0])} required/>
                </label>
                <label>
                  <span >Other Images:</span>
                  <input className="input_file" type="file" onChange={(e) => setotherImgUrls(e.target.files)} multiple/>
                </label>
              </div>
              <button type="submit" className="create_btn">Create Listing</button>
            </form>
        </div>
      </>
    )
}

export default CreateSpotForm
