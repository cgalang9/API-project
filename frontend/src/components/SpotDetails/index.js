import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getSpotThunk } from '../../store/currentSpot'
import Reviews from '../Reviews'
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
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
                    <div><i className="fa-sharp fa-solid fa-star"/> {spot.avgStarRating.toFixed(2)}</div>
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
                        {/* {spot.SpotImages && (
                            spot.SpotImages.map(img => (
                                <img
                                    key={img.id}
                                    src={img.url}
                                    alt="spot"
                                    className='other_spot_img'
                                    onError={e => {
                                        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                        e.onerror = null
                                    }}
                                />
                            ))
                        )} */}
                    </div>
                </div>
                <div>{spot.description}</div>
                {isOwner && (
                    <div>(<NavLink to={`/spots/${spotId}/edit`}>Edit/Delete Listing</NavLink>)</div>
                )}
                <div>${spot.price}</div>
                <div className='reviews_header'>
                    <div><i className="fa-sharp fa-solid fa-star"/>{spot.avgStarRating}</div>
                    <div style={{ fontSize: 3 }}><i className="fa-solid fa-circle"/></div>
                    <div>{spot.numReviews} reviews</div>
                </div>
                <Reviews />
            </div>
        )}
        </div>
    )
}

export default SpotDetails
