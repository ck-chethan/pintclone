import UserButton from '../userButton/UserButton'
import Image from '../image/Image'
import './topBar.css'

const TopBar: React.FC = () => {
  return (
    <div className="topBar">
      {/* Search */}
      <div className="search">
        <Image alt="TopBar" className="" path={'/general/search.svg'} />
        <input type="text" placeholder="Search" />
      </div>
      <UserButton />
    </div>
  )
}

export default TopBar
