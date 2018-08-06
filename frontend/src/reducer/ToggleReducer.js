
const initialState = {
    employee: '',
    hr: '',
    login: false,
    open: false,
    assets: {},
    filterTerm:'',
    countries:[],
    keys:[],
    fetching:false,
    error:false,
    errorMessage:'Invalid Username or Password'
}
function normalizer(data){
    const obj =data.reduce((a, c) => {
        a[c.id] = c
        return a
    }, {})
    return obj
}

export const assetsById = (state={},action) => {
    switch(action.type){
        case 'ASSET_DATA_CALL': {
            // const assetKey = action.data.map(asset => asset.id)
            return ( normalizer(action.data))
        }
        case 'ADD_ASSET_DATA_CALL_SUCCESS': {
            let newAssets = Object.values(state)
            newAssets=newAssets.concat(action.data)
            return (normalizer(newAssets))

        }
        case 'UPDATE_ASSET_DATA_SUCCESS':
            return{
                ...state,[action.id]:{
                    ...state[action.id],
                    count:action.data.count
                }
            }
        case 'DELETE_ASSET':{
            var _ = require('lodash');
            const key= action.data.id
            return (_.omit(state, key))
        }
        default: return state
    }
}

export const assetsKey = (state=[],action)=>{
    switch(action.type){
        case 'ASSET_DATA_CALL':{
            const assetKey = action.data.map(asset => asset.id)
            return(assetKey)
        }
        default: return state
    }
}



export const reducerFunc = (state=initialState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            return{
                ...state,
                errorMessage:'Invalid Username or Password'
            }
        case 'DELETE_STATE':
            return{
                login:false
            }
        case 'API_CALL':
            return{
                ...state,login:true,errorMessage:''

            }
        case 'FETCHING_COUNTRY':
            return{
                ...state,
                fetching:true
            }
        case 'FETCHING_ERROR':
            return{
                ...state,
                error:true
            }
        case 'COUNTRY_DATA':{
            return{...state,fetching:false, error:false,countries:action.data}
        }
        case 'TOGGLE_MODAL':
            return{
                ...state,
                open:!state.open
            }







        case 'FILTER_CALL':{

            return {...state,filterTerm:action.data}
        }

        default:
            return state
    }
}