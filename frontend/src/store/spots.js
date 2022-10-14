import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'

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
        default:
            return state
    }
}
