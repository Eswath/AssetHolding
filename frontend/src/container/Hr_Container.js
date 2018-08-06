import Hr from '../component/Hr'
import { hr,toggleModal,assetDataCall,addAssetDataCall,pushToHome,updateAssetDataCall,filterData,getCountry,deleteAsset,emptyState} from "../action/Action";
import { connect } from 'react-redux'


const assets_prop = (assets,filter_term) => {
        // console.log(assets)
    if(assets===undefined)return []
        let searchTerm = new RegExp(filter_term,'i')
        let arrOfObj = Object.values(assets)
    // console.log(arrOfObj)
        arrOfObj = arrOfObj.filter(a=>a.name.match(searchTerm))
        return arrOfObj
}

const country_prop = (countries) =>{
    // console.log(countries.length)
    if(countries===undefined)return []
    else if(countries.length < 15) {
        return countries
    }
    else{
        return []
    }
}


const mapStatetoProps = (state) => {
    return{
        hr: state.toggle_reducer.hr,
        open: state.toggle_reducer.open,
        asset_prop: assets_prop(state.assetsById,state.toggle_reducer.filterTerm),
        countries: country_prop(state.toggle_reducer.countries),
        fetching:state.toggle_reducer.fetching,
        error:state.toggle_reducer.error
        // obj:state.toggle_reducer[54]
        // asset_prop:state.toggle_reducer.assets
    }

}
const mapDispatchtoProps = (dispatch) => {
    return{
        getHr: () => dispatch(hr()),
        toggleModal: () => dispatch(toggleModal()),
        assetDataCall: () =>dispatch(assetDataCall()),
        addAssetDataCall: (data) => dispatch(addAssetDataCall(data)),
        pushToHome: ()=>dispatch(pushToHome()),
        updateAssetDataCall: (data)=>dispatch(updateAssetDataCall(data)),
        filterData: (data)=>dispatch(filterData(data)),
        getCountry: (data)=>dispatch(getCountry(data)),
        deleteAsset: (data)=>dispatch(deleteAsset(data)),
        emptyState: ()=>dispatch(emptyState())
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Hr)