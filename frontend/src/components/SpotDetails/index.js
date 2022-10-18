import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getSpotThunk } from '../../store/currentSpot'
import Reviews from '../Reviews'
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
            .catch((res) => history.push('/404'))
    }, [dispatch, spotId])

    const spot = useSelector(state => state.currentSpot)
    const sessionUser = useSelector(state => state.session.user);
    //show edit link only if current user is owner
    let isOwner = false
    if (sessionUser && spot && sessionUser.id === spot.ownerId && isOwner === false) {
        isOwner = (true)

    }

    let prevImgUrl = ''
    let otherImgsArr = []
    if(spot && spot.SpotImages) {
        spot.SpotImages.forEach(img => {
            if(img.preview === true) prevImgUrl = img.url
            if(img.preview === false) {
                otherImgsArr.push(img.url)
            }
        });
        while (otherImgsArr.length < 4) {
            otherImgsArr.push(' ')
        }
    }

    return(
        <div className='spot_details_page'>
        {spot && spot.SpotImages && (
            <div className='spot_details_container'>

                <div className='details_head'>{spot.name}</div>
                <div className='details_subheader'>
                    <div><i className="fa-sharp fa-solid fa-star"/> {(spot.avgStarRating && spot.avgStarRating.toFixed(2)) || (spot.numReviews > 0 && "0.00") || "New"}</div>
                    <div style={{ fontSize: 2 }}><i className="fa-solid fa-circle"/></div>
                    <div className='underline'>{spot.numReviews} reviews</div>
                    <div style={{ fontSize: 2 }}><i className="fa-solid fa-circle"/></div>
                    <div className='underline'>{spot.city}, {spot.state}, {spot.country}</div>
                </div>

                <div id='details_img_container'>
                    <img
                        src={prevImgUrl}
                        alt="spot"
                        className='main_spot_img'
                        onError={e => {
                            e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                            e.onerror = null
                        }}
                    />
                    <div className='other_imgs_container'>
                        <div id='imgs_row_1'>
                            <img
                                src={otherImgsArr[0]}
                                alt="spot"
                                className='other_spot_img'
                                onError={e => {
                                    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                    e.onerror = null
                                }}
                            />
                            <img
                                src={otherImgsArr[1]}
                                alt="spot"
                                className='other_spot_img top_right'
                                onError={e => {
                                    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                    e.onerror = null
                                }}
                            />
                        </div>
                        <div id='imgs_row_2'>
                            <img
                                src={otherImgsArr[2]}
                                alt="spot"
                                className='other_spot_img'
                                onError={e => {
                                    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                    e.onerror = null
                                }}
                            />
                            <img
                                src={otherImgsArr[3]}
                                alt="spot"
                                className='other_spot_img bottom_right'
                                onError={e => {
                                    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                    e.onerror = null
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className='description_container'>
                    <div className='description_head_text'>
                        <div className='description_head_title'>
                            {spot.description}
                            {isOwner && (
                                <span>(<NavLink to={`/spots/${spotId}/edit`}>Edit/Delete Listing</NavLink>)</span>
                            )}
                        </div>
                        <div className='description_head_subtitle'>
                            4 guests <span style={{ fontSize: 3 }}><i className="fa-solid fa-circle"/></span>
                            2 bedrooms <span style={{ fontSize: 3 }}><i className="fa-solid fa-circle"/></span>
                            3 beds <span style={{ fontSize: 3 }}><i className="fa-solid fa-circle"/></span>
                            1 bath
                        </div>
                    </div>
                    <div className='description_user_icon'>
                        <i className="fa-solid fa-circle-user" />
                    </div>
                </div>
                <hr />
                <div className='reviews_container'>
                    <div className='reviews_header'>
                        <div className='reviews_stars'>
                            <span style={{ fontSize: 12 }}><i className="fa-sharp fa-solid fa-star"/></span>
                            {(spot.avgStarRating && spot.avgStarRating.toFixed(2)) || (spot.numReviews > 0 && "0.00") || "New"}
                        </div>
                        <div style={{ fontSize: 3 }}><i className="fa-solid fa-circle"/></div>
                        <div>{spot.numReviews} reviews</div>
                    </div>
                    <Reviews />
                </div>
            </div>
        )}
        </div>
    )
}

export default SpotDetails
