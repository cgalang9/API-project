import { csrfFetch } from "./csrf"

//Get all Reviews by a Spot's id
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS'
export const getAllReviews = (reviews) => {
    return { type: GET_ALL_REVIEWS, reviews }
}

export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok) {
        const reviews = await response.json()
        dispatch(getAllReviews(reviews))
        return reviews
    }
}

const initialState = {}

export const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_REVIEWS:
            const stateGetAllReviews = { ...action.reviews }
            return stateGetAllReviews
        default:
            return state
    }
}
