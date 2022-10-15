import { csrfFetch } from "./csrf"

//get all spots
const GET_SPOT = 'spots/GET_SPOTS'
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

//get spot detail by id
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const getSpot = (spot) => {
    return { type: GET_SPOT, spot }
}

export const getSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const spot = await response.json()
        dispatch(getSpot(spot))
        return spot
    }
}

//create spot
const CREATE_SPOT = 'spots/CREATE_SPOT'
const createSpot = (spot) => {
    return { type: CREATE_SPOT, spot}
}

export const createSpotThunk = (spot) => async (dispatch) => {
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
        console.log(spot)
        dispatch(createSpot(spot))
        return spot
    }
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
        case GET_SPOT:
            const stateGetSpot = {...state}
            stateGetSpot["spots"] = action.spot
            return stateGetSpot
        case CREATE_SPOT:
            const stateCreateSpot = {...state}
            stateCreateSpot[action.spot.id] = action.spot
            return stateCreateSpot
        default:
            return state
    }
}
