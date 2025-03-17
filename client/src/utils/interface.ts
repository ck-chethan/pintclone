export interface Item {
  _id: number
  media: string
  width: number
  height: number
}

export type ItemsProps = Item[]

export interface BoardType {
  _id: number
  title: string
  firstPin: Item
  pinCount: number
  createdAt: string
}

export interface UserType {
  _id: number
  displayName: string
  username: string
  img: string
}

export interface CommentType {
  _id: number
  description: string
  user: UserType
  createdAt: string
}
