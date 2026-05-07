import React, { useRef } from 'react'
import Navbar from '../Components/Navbar'
import Body from '../Components/Body'
import Body2 from '../Components/Body2'
import Guide from '../Components/Guide'
import Footer from '../Components/Footer'

function LandingPage() {
  const guideRef = useRef(null)

  const scrollToGuide = () => {
    guideRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <Navbar onGuideClick={scrollToGuide} />
      <Body />
      <Body2 />
      <div ref={guideRef}>
        <Guide />
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage