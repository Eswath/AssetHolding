import React from 'react';

  const checkAssets =(value,assets)=> {
    console.log(assets)
    let assets_arr = Object.assign(assets)
    const result = assets_arr.find(a => a.name === value)
    if (result !== undefined) return ("Already Exists")
    return undefined
}
