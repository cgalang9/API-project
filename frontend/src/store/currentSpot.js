import { csrfFetch } from "./csrf"


//get spot detail by id
const GET_SPOT = 'spots/GET_SPOT'
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

//Add image to spot by spot id
const ADD_SPOT_IMG = 'spots/ADD_SPOT_IMG'
const addSpotImg = (spot) => {
    return { type: ADD_SPOT_IMG, spot }
}

export const addSpotImgThunk = (spotId, url) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images` , {
        method: 'POST',
        body: JSON.stringify({
            url,
            preview: false
        })
    })

    if(response.ok) {
        const img = await response.json()
        dispatch(addSpotImg(img))
        return img
    }

}


export const currentSpotReducer = (state = null, action) => {
    switch(action.type) {
        case GET_SPOT:
            const stateGetSpot = {...action.spot}
            return stateGetSpot
        case ADD_SPOT_IMG:
            return state
        default:
            return state
    }
}
