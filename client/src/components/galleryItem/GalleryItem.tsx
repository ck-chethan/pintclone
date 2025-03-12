import React from 'react'
import { Item } from '../../utils/interface'
import './galleryItem.css'

interface GalleryItemProps {
  item: Item
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item }) => {
  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <img src={item.media} alt="" />
    </div>
  )
}

export default GalleryItem
