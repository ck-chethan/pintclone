import React from 'react'
import { Item } from '../../utils/interface'
import './galleryItem.css'
import { Link } from 'react-router'
import { IKImage } from 'imagekitio-react'

interface GalleryItemProps {
  item: Item
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item }) => {
  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <IKImage
        urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
        path={item.media}
        transformation={[
          {
            width: '200',
            height: '300',
          },
        ]}
        alt="Test"
      />
      <Link to={`/pin/${item.id}`} className="overlay" />
      <button className="saveButton">Save</button>
      <div className="overlayButtons">
        <button>
          <img src="/general/share.svg" alt="" />
        </button>
        <button>
          <img src="/general/more.svg" alt="" />
        </button>
      </div>
    </div>
  )
}

export default GalleryItem
