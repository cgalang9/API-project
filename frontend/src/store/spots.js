import { csrfFetch } from "./csrf"

//get all spots
const GET_SPOT = 'spots/GET_SPOTS'
const getAllSpots = (spots) => {
    return { type: GET_ALL_SPOTS, spots }
}
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if(response.ok) {
        const data = await response.json()
        dispatch(getAllSpots(data))
        return data
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
        const data = await response.json()
        dispatch(getSpot(data))
        return data
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
        default:
            return state
    }
}
