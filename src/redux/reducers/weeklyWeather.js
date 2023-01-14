const initialState = {
    data: [
        {
        temp: "",
        date: "",
        code: ""
        }
    ]
}

const GET_WEEKLY_DATES = "GET_WEEKLY_DATES"
const GET_WEEKLY_FORECAST = "GET_WEEKLY_FORECAST";

const weeklyReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_WEEKLY_FORECAST:
            return {
                ...state, data: action.payload
            }

        default:
            return state;
    }
}

export default weeklyReducer;
export {GET_WEEKLY_FORECAST, GET_WEEKLY_DATES};