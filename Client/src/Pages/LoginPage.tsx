import BasicHeader from '../components/Headers/BasicHeader'
import Footer from '../components/Footer/Footer'
import LoginSection from '../components/Auth/LoginSection'

function LoginPage() {
  return (
    
    <div className='pl-20 pt-10 pr-20'>
      <div className="h-full ">
        <BasicHeader />
        <LoginSection />
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage