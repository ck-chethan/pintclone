import { Item } from '../../utils/interface'
import { Link } from 'react-router'
import Image from '../image/Image'
import './galleryItem.css'

interface GalleryItemProps {
  item: Item
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item }) => {
  const optimixedHeight = Math.ceil(372 * item.height) / item.width
  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <Image
        alt="Image"
        className=""
        h={optimixedHeight.toString()}
        src={item.media}
        w="372"
        key={item._id}
      />
      <Link to={`/pin/${item._id}`} className="overlay" />
      <button className="saveButton">Save</button>
      <div className="overlayButtons">
        <button>
          <Image path="/general/share.svg" alt="share" />
        </button>
        <button>
          <Image path="/general/more.svg" alt="more" />
        </button>
      </div>
    </div>
  )
}

export default GalleryItem
