import UserButton from '../userButton/UserButton'
import Image from '../image/Image'
import './topBar.css'
import { useNavigate } from 'react-router'

const TopBar: React.FC = () => {
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    navigate(`/search?search=${(form[0] as HTMLInputElement).value}`)
  }
  return (
    <div className="topBar">
      {/* Search */}
      <form onSubmit={handleSubmit} className="search" key="topBarSearch">
        <Image alt="TopBar" className="" path={'/general/search.svg'} />
        <input type="text" placeholder="Search" />
      </form>
      <UserButton />
    </div>
  )
}

export default TopBar
