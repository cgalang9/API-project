import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import AWS, { ConnectContactLens } from 'aws-sdk'
import { addSpotImgThunk } from "../../store/currentSpot";
import './AddSpotImgForm.css'

function AddSpotImgForm() {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const [img, setImg] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [imgUploaded, setImgUploaded] = useState(null)
  const [errors, setErrors] = useState([])

  const uploadPrevImg = async(e) => {
    e.preventDefault();

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
    })

    var upload = new AWS.S3.ManagedUpload({
      params: {
        Body: img,
        Bucket: 'thebnb',
        Key: `${Math.floor(Math.random() * 1000000)}` + img.name
      }
    });

    var promise = upload.promise();
    setImgUploaded('Uploading...')
    await promise.then(
      function(data) {
        alert("Successfully uploaded photo.");
        setImageUrl(data.Location);
        setImgUploaded('Upload Complete')
      },
      function(err) {
        setImgUploaded('Error')
        return alert("There was an error uploading your photo: ", err.message);
      }
    )
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if(imgUploaded === 'Uploading...') return alert('Please wait for images to finish uploading before submitting')
    if(imgUploaded === 'Error') return alert('There was an error uploading your preview image. Please upload again.')


    dispatch(addSpotImgThunk(spotId, imageUrl))
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
        <div className='add_spot_img_container flex top'>
            <form className='add_spot_imgform_container flex' onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className="input_top">
                      <div className="add_img_spot_head" >Upload Your Image</div>
                      <input className="input_file" id="add_img_form_input" type="file" onChange={(e) => setImg(e.target.files[0])} required accept="image/*"/>
                      {img && (
                        <button type="button" className="upload_img" onClick={uploadPrevImg}>Upload Image</button>
                      )}
                      <div className="upload_prog">{imgUploaded}</div>
                </label>
                <button type="submit" className="create_btn">Submit</button>
            </form>
        </div>
      </>
    )
}

export default AddSpotImgForm
