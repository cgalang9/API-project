import { csrfFetch } from "./csrf"

//get all spots
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const getAllSpots = (spots) => {
    return { type: GET_ALL_SPOTS, spots }
}

export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if(response.ok) {
        const spots = await response.json()
        dispatch(getAllSpots(spots))
        return spots
    }
}
//create spot
const CREATE_SPOT = 'spots/CREATE_SPOT'
const createSpot = (spot) => {
    return { type: CREATE_SPOT, spot}
}

export const createSpotThunk = (spot, previewImageUrl, otherImgUrl) => async (dispatch) => {
    const { name, price, address, city, state, country, description } = spot
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            name,
            price,
            address,
            city,
            state,
            country,
            description,
            //lat and lng given random numbers betwenn -100 and 100 for now
            //eventually I will need to implement a fetch to a geolaction API that converts address to lat and lng
            lat: ( (Math.random() * 100) - (Math.random() * 100) ),
            lng: ( (Math.random() * 100) - (Math.random() * 100) )
        }),
    })

    if(response.ok) {
        const spot = await response.json()

        const responseImg = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url: previewImageUrl,
                preview: true
            }),
        })

        if(responseImg.ok) {
            otherImgUrl.forEach(async imgUrl => {
                await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: 'POST',
                    body: JSON.stringify({
                        url: imgUrl,
                        preview: false
                    }),
                })
            })

            const img = await responseImg.json()
            spot['previewImage'] = img.url
            dispatch(createSpot(spot))
            return spot

        }

    }
}

//edit spot
const EDIT_SPOT = 'spots/EDIT_SPOT'
const editSpot = (spot) => {
    return { type: EDIT_SPOT, spot }
}
export const editSpotThunk = (spot, spotId) => async (dispatch) => {
    const { name, price, address, city, state, country, description } = spot
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            price,
            address,
            city,
            state,
            country,
            description,
            //lat and lng given random numbers betwenn -100 and 100 for now
            //eventually I will need to implement a fetch to a geolaction API that converts address to lat and lng
            lat: ( (Math.random() * 100) - (Math.random() * 100) ),
            lng: ( (Math.random() * 100) - (Math.random() * 100) )
        }),
    })

    if(response.ok) {
        const spot = await response.json()
        dispatch(editSpot(spot))
        return spot
    }
}

//delete spot
const DELETE_SPOT = 'spot/DELETE_SPOT'
export const deleteSpot = (spotId) => {
    return { type: DELETE_SPOT, spotId}
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        dispatch(deleteSpot(spotId))
    }

    const data = await response.json()
    return data
}


const initialState = {}

export const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_SPOTS:
            const spotsArr = action.spots['Spots']
            const spotsObj = {}
            spotsArr.forEach(spot => {
                spotsObj[spot.id] = spot
            });
            const newStateGetAll = Object.assign({ ...state }, {...spotsObj})
            return newStateGetAll
        case CREATE_SPOT:
            const stateCreateSpot = {...state}
            stateCreateSpot[action.spot.id] = action.spot
            return stateCreateSpot
        case EDIT_SPOT:
            const stateEditSpot = {...state}
            stateEditSpot[action.spot.id] = action.spot
            return stateEditSpot
        case DELETE_SPOT:
            const stateDelete = {...state}
            const id = action.spotId
            delete stateDelete[id]
            return {...stateDelete}
        default:
            return state
    }
}
