import './App.css'

import Header from './components/custom/Header'
import Hero from './components/custom/Hero'

import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <>
    <Header/>
  <div
  className="bg-center bg-no-repeat bg-cover w-screen h-[90.7vh] md:h-[90.7vh] lg:h-[90.7vh] "
  style={{
    backgroundImage: "url('/Hero.jpg')",
  }}
>
<Hero/>
    </div>
    
      
    
    </>
  )
}


export default App
