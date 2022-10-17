
import { csrfFetch } from "./csrf"


//get spot detail by id
const GET_SPOT = 'spots/GET_SPOT'
const getSpot = (spot) => {
    return { type: GET_SPOT, spot }
}

export const getSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    console.log(response)
    if(response.ok) {
        const spot = await response.json()
        dispatch(getSpot(spot))
        return spot
    }

}


export const currentSpotReducer = (state = null, action) => {
    switch(action.type) {
        case GET_SPOT:
            const stateGetSpot = {...action.spot}
            return stateGetSpot
        default:
            return state
    }
}
