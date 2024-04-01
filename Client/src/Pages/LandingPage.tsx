import React from 'react'
import BasicHeader from '../components/Headers/BasicHeader'
import Landing from '../components/common/Landing'
import Footer from "../components/Footer/Footer"

function LandingPage() {
  return (
    <div>
        <div>
            <BasicHeader/>
        </div>
            <Landing/>
            <Footer/>
    </div>
  )
}

export default LandingPage