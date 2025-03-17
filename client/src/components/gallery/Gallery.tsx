import React from 'react'
import './gallery.css'
import GalleryItem from '../galleryItem/GalleryItem'
import { Item } from '../../utils/interface'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import apiRequest from '../../utils/apiRequest'

interface GalleryProps {
  search?: string
  userId?: string
  boardId?: string
}

interface FetchPinsProps {
  pageParam: number
  limit: number
  search: string
  userId: string
  boardId: string
}

const fetchPins = async ({
  pageParam,
  limit,
  search,
  userId,
  boardId,
}: FetchPinsProps) => {
  const formattedLimit = limit || 21
  const formattedPageParam = pageParam || 0
  const formattedSearch = search ? `&search=${search}` : ''
  const formattedUserId = userId ? `&userId=${userId}` : ''
  const formattedBoardId = boardId ? `&boardId=${boardId}` : ''
  const response = await apiRequest.get(
    `/pins?limit=${limit}&cursor=${pageParam}${formattedSearch}${formattedUserId}${formattedBoardId}`
  )
  return response.data
}

const Gallery: React.FC<GalleryProps> = ({
  search = '',
  userId = '',
  boardId = '',
}: GalleryProps) => {
  const LIMIT = 21
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['pins', search, userId],
    queryFn: ({ pageParam = 0 }) =>
      fetchPins({ pageParam, limit: LIMIT, search, userId, boardId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })
  if (status === 'pending') return <div>Loading...</div>
  if (status === 'error') return <div>Error</div>

  const allPins = data?.pages.map((page) => page.pins).flat()
  console.log('allPins', allPins)

  return (
    <InfiniteScroll
      dataLength={allPins?.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more pins...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="gallery">
        {allPins?.map((item: Item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  )
}

export default Gallery
