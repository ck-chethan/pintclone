import { Link } from 'react-router'
import Image from '../image/Image'
import './LeftBar.css'

const LeftBar: React.FC = () => {
  return (
    <div className="leftBar">
      <div className="menuIcons">
        <Link to="/" className="menuIcon">
          <Image path="/general/logo.png" alt="logo" className="logo" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/home.svg" alt="home" />
        </Link>
        <Link to="/create" className="menuIcon">
          <Image path="/general/create.svg" alt="create" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/updates.svg" alt="updates" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/messages.svg" alt="updates" />
        </Link>
      </div>
      <Link to="/" className="menuIcon">
        <Image path="/general/settings.svg" alt="settings" />
      </Link>
    </div>
  )
}

export default LeftBar
