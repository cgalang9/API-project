import { csrfFetch } from "./csrf"


//get spot detail by id
const GET_ALL_REVIEWS_CURR = 'reviews/GET_ALL_REVIEWS_CURR'
export const getAllReviewsCurr = (reviews) => {
    return { type: GET_ALL_REVIEWS_CURR, reviews }
}


export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok) {
        const reviews = await response.json()
        dispatch(getAllReviewsCurr(reviews))
        return reviews
    }
}

export const currentSpotReviewsReducer = (state = null, action) => {
    switch(action.type) {
        case GET_ALL_REVIEWS_CURR:
            const reviewsArr = action.reviews['Reviews']
            console.log(reviewsArr)
            const reviewsObj = {}
            reviewsArr.forEach(review => {
                reviewsObj[review.id] = review
            });
            return reviewsObj
        default:
            return state
    }
}
