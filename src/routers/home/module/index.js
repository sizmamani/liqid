import request from "../../../services/request"

const history = window.location.pathname && window.location.pathname.split("/")
const FETCH_DATA = "FETCH_DATA"
const UPDATE_INPUT_DATA = "UPDATE_INPUT_DATA"
const UPDATE_CHECKBOX_DATA = "UPDATE_CHECKBOX_DATA"
const UPDATE_STEP = "UPDATE_STEP"
const SUBMIT_DATA = "SUBMIT_DATA"
const FORM_DATA = "FORM_DATA"
const STEP = "STEP"
export function updateStep(payload) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_STEP,
            payload
        });
    }
}

export function fetchData() {
    const cachedData = localStorage.getItem(FORM_DATA)
    return (dispatch) => {
        if (cachedData) {
            dispatch({
                type: FETCH_DATA,
                payload : JSON.parse(cachedData)
            })
        } else {
            request.get('/mock.json', (res) =>{
                dispatch({
                    type: FETCH_DATA,
                    payload : res.data
                });
                localStorage.setItem(FORM_DATA, JSON.stringify(res.data))
            })
        }
    };
}

export function updateInputData(payload){
    return (dispatch) => {
        dispatch({
            type: UPDATE_INPUT_DATA,
            payload
        })
    }
}

export function submitData(payload){
    return (dispatch) => {
        dispatch({
            type: SUBMIT_DATA,
            payload
        })
    }
}

export function updateCheckboxData(payload){
    return (dispatch) => {
        dispatch({
            type: UPDATE_CHECKBOX_DATA,
            payload
        })
    }
}



const ACTION_HANDLERS = {
    FETCH_DATA: handleFetchData,
    UPDATE_INPUT_DATA: handleUpdateInputData,
    UPDATE_CHECKBOX_DATA: handleUpdateCheckboxData,
    UPDATE_STEP: handleUpdateStep,
    SUBMIT_DATA: handleSubmitData
}

function handleUpdateStep(state, action) {
    localStorage.setItem(STEP, action.payload)
    return {
        ...state, step: action.payload
    }
}

function handleUpdateInputData(state, action) {
    let { dynamicInfo } = state
    let temp = Object.assign([], dynamicInfo)
    temp && temp.map(o=>{
        if (o._id === action.payload.key) {
            o.value = action.payload.value
        }
    })
    localStorage.setItem(FORM_DATA, JSON.stringify(temp))
    return {
        ...state, dynamicInfo: temp
    }
}

function handleSubmitData(state, action) {
    let { dynamicInfo } = state
    let temp = Object.assign([], dynamicInfo)
    temp && temp.map(o=>{
        if (o._id === action.payload.key) {
            o.submittedValue = action.payload.value
        }
    })
    return {
        ...state, dynamicInfo: temp
    }
}

function handleUpdateCheckboxData(state, action) {
    let { dynamicInfo } = state
    let temp = Object.assign([], dynamicInfo)
    temp && temp.map(o=>{
        if (o._id === action.payload.key) {
            if (o.value && o.value.length > 0){
                var index = o.value.indexOf(action.payload.value);
                if (index > -1) {
                    o.value.splice(index, 1);
                } else {
                    o.value.push(action.payload.value)
                }
            } else {
                o.value = []
                o.value.push(action.payload.value)
            }
        }
    })
    localStorage.setItem(FORM_DATA, JSON.stringify(temp))
    return {
        ...state, dynamicInfo: temp
    }
}

function handleFetchData(state, action){
    return {
        ...state, dynamicInfo: action.payload
    }
}


const initialState = {
  dynamicInfo: [],
  step: history && history.length > 0 && Number(history[1]) || Number(localStorage.getItem(STEP) || 0)
};
export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
