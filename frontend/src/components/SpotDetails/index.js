import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getSpotThunk } from '../../store/currentSpot'
import CreateBookingTile from '../CreateBookingTile'
import Reviews from '../Reviews'
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getSpotThunk(spotId))
            .catch((res) => history.push('/404'))
    }, [dispatch, spotId, history])

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
            <div className='spot_details_container top'>

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

                <div className='sub_img_container'>

                    <div className='description_container'>

                        <div className='description_container_section1'>
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

                        <div className='description_container_section2'>
                            <div className='section2_item'>
                                <div className='section2_item_icon'><i class="fas fa-desktop"></i></div>
                                <div className='section2_text'>
                                    <div className='section2_text_top'>Dedicated workspace</div>
                                    <div className='section2_text_bottom'>A common area with wifi that’s well-suited for working.</div>
                                </div>
                            </div>
                            <div className='section2_item'>
                                <div className='section2_item_icon'><i class="far fa-calendar-check"></i></div>
                                <div className='section2_text'>
                                    <div className='section2_text_top'>Self check-in</div>
                                    <div className='section2_text_bottom'>Check yourself in with the smartlock.</div>
                                </div>
                            </div>
                            <div className='section2_item'>
                                <div className='section2_item_icon'><i class="fa-regular fa-calendar"></i></div>
                                <div className='section2_text'>Free cancellation before Nov 25.</div>
                            </div>
                        </div>

                        <div className='description_container_section3'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet mauris vel massa tempor eleifend id ac lacus. Sed eu dictum urna, sit amet posuere nisi. Vestibulum lacinia vitae urna et rhoncus. Quisque pellentesque mollis nunc at tristique. Praesent eu dui tincidunt, ultrices ipsum lacinia, sagittis ex. Nam nec massa dignissim, facilisis sapien nec, tempor purus. Cras in suscipit felis, nec facilisis mi. Donec sollicitudin nisl sit amet nibh pretium, consequat viverra mi eleifend. Pellentesque eget venenatis nunc, nec tristique ex. Phasellus congue non risus eget ultricies. Fusce sodales ex ut ex semper consectetur. Ut vel fringilla augue. Nullam eleifend enim ac ligula mattis, sed pretium lectus consequat. Donec vestibulum diam varius ex commodo mattis. Praesent malesuada lectus et orci mattis dapibus non ac sapien.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet mauris vel massa tempor eleifend id ac lacus. Sed eu dictum urna, sit amet posuere nisi. Vestibulum lacinia vitae urna et rhoncus. Quisque pellentesque mollis nunc at tristique. Praesent eu dui tincidunt, ultrices ipsum lacinia, sagittis ex. Nam nec massa dignissim, facilisis sapien nec, tempor purus. Cras in suscipit felis, nec facilisis mi. Donec sollicitudin nisl sit amet nibh pretium, consequat viverra mi eleifend. Pellentesque eget venenatis nunc, nec tristique ex. Phasellus congue non risus eget ultricies. Fusce sodales ex ut ex semper consectetur. Ut vel fringilla augue. Nullam eleifend enim ac ligula mattis, sed pretium lectus consequat. Donec vestibulum diam varius ex commodo mattis. Praesent malesuada lectus et orci mattis dapibus non ac sapien.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet mauris vel massa tempor eleifend id ac lacus. Sed eu dictum urna, sit amet posuere nisi. Vestibulum lacinia vitae urna et rhoncus. Quisque pellentesque mollis nunc at tristique. Praesent eu dui tincidunt, ultrices ipsum lacinia, sagittis ex. Nam nec massa dignissim, facilisis sapien nec, tempor purus. Cras in suscipit felis, nec facilisis mi. Donec sollicitudin nisl sit amet nibh pretium, consequat viverra mi eleifend. Pellentesque eget venenatis nunc, nec tristique ex. Phasellus congue non risus eget ultricies. Fusce sodales ex ut ex semper consectetur. Ut vel fringilla augue. Nullam eleifend enim ac ligula mattis, sed pretium lectus consequat. Donec vestibulum diam varius ex commodo mattis. Praesent malesuada lectus et orci mattis dapibus non ac sapien.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet mauris vel massa tempor eleifend id ac lacus. Sed eu dictum urna, sit amet posuere nisi. Vestibulum lacinia vitae urna et rhoncus. Quisque pellentesque mollis nunc at tristique. Praesent eu dui tincidunt, ultrices ipsum lacinia, sagittis ex. Nam nec massa dignissim, facilisis sapien nec, tempor purus. Cras in suscipit felis, nec facilisis mi. Donec sollicitudin nisl sit amet nibh pretium, consequat viverra mi eleifend. Pellentesque eget venenatis nunc, nec tristique ex. Phasellus congue non risus eget ultricies. Fusce sodales ex ut ex semper consectetur. Ut vel fringilla augue. Nullam eleifend enim ac ligula mattis, sed pretium lectus consequat. Donec vestibulum diam varius ex commodo mattis. Praesent malesuada lectus et orci mattis dapibus non ac sapien.
                        </div>
                    </div>

                    <div className='create_bookings_container'>
                        <CreateBookingTile spot={spot} />
                    </div>
                </div>


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
