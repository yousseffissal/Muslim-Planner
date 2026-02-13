import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">

      {/* Navbar */}
      <div className="h-16 fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Layout */}
      <div className="flex pt-16 h-full">

        {/* Sidebar */}
        <div className="w-64 h-[calc(100vh-64px)] fixed left-0 top-16">
          <Sidebar />
        </div>

        {/* Content Area */}
        <div className="md:ml-64 flex-1 h-[calc(100vh-64px)]">
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default App
