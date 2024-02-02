import React from 'react'
import './App.css'
import './index.css'
import {Navbar,Cta,Brand} from './Components'
import {Blog,Feature,Footer,Header,Possiblity,Whatgpt3} from './Containers'
const App = () => {
  return (
    <div className='App'>
      <div className='gradient__bg'>
        <Navbar/>
        <Header/>
      </div>
      <Brand/>
      <Whatgpt3/>
      <Feature/>
      <Possiblity/>
      <Cta/>
      <Blog/>
      <Footer/>
    </div>
  )
}

export default App
