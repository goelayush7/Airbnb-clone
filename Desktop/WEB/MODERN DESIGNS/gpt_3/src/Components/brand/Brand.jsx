import React from 'react'
import './Brand.css'
import {google,atlassian,slack,shopify,dropbox} from './import.js'
const Brand = () => {
  return (
    <div className='gpt3__brands'>
     <img src={google} alt="google" />
     <img src={atlassian} alt="atlassian" />
     <img src={slack} alt="slack" />
     <img src={shopify} alt="shopify" />
     <img src={dropbox} alt="dropbox" />
    </div>
  )
}

export default Brand
