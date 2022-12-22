import { csrfFetch } from "./csrf";

//get spot detail by id
const GET_SPOT = "spots/GET_SPOT";
const getSpot = (spot) => {
  return { type: GET_SPOT, spot };
};

export const getSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
    return spot;
  }
};

//Add image to spot by spot id
const ADD_SPOT_IMG = "spots/ADD_SPOT_IMG";
const addSpotImg = (spot) => {
  return { type: ADD_SPOT_IMG, spot };
};

export const addSpotImgThunk = (spotId, imgUrl) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify({
      url: imgUrl,
      preview: false,
    }),
  });

  if (response.ok) {
    const img = await response.json();
    dispatch(addSpotImg(img));
    return img;
  }
};

//Clear spot
const CLEAR_SPOT = "spots/CLEAR_SPOT";
export const clearSpot = () => {
  return { type: CLEAR_SPOT };
};

export const currentSpotReducer = (state = null, action) => {
  switch (action.type) {
    case GET_SPOT:
      const stateGetSpot = { ...action.spot };
      return stateGetSpot;
    case ADD_SPOT_IMG:
      return state;
    case CLEAR_SPOT:
      return null;
    default:
      return state;
  }
};
