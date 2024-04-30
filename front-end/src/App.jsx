import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import NavBar from './NavBar'
import Message from './Message'
import NewMessage from './NewMessage'
import CreateLobby from './CreateLobby'
import DisplayLobbies from './DisplayLobbies'

function App() {
  return (
    <Router>
    <NavBar/>
    <Routes>
      <Route path='/' element={<h1>Welcome to Lokerroom blablablablabla</h1>}/>
      <Route path='/api/auth/register' element={<div className="main">
      <Register/> </div>}/>

      <Route path='/api/auth/login' element={<div className="main">
      <Login/> </div>}/>

      <Route path='/api/messages/new' element={<div className='main'>
        <Message/>
        <NewMessage/></div>}/>
      
      <Route path='/api/lobby' element={<div className='main'>
        <CreateLobby/>
        <DisplayLobbies/>
      </div>}/>
    </Routes>
    
    
    
    </Router>
  )
}

export default App
