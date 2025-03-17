import React from 'react'
import './searchPage.css'
import Gallery from '../../components/gallery/Gallery'
import { useSearchParams } from 'react-router'

const SearchPage: React.FC = () => {
  const [searchParms, setSearchParams] = useSearchParams()
  const search = searchParms.get('search') || ''
  const boardId = searchParms.get('boardId') || ''
  return <Gallery search={search} boardId={boardId} />
}

export default SearchPage
