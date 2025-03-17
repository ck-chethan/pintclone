export interface Item {
  _id: string
  media: string
  width: number
  height: number
}

export type ItemsProps = Item[]

export interface BoardType {
  _id: string
  title: string
  firstPin: Item
  pinCount: number
  createdAt: string
}

export interface UserType {
  _id: string
  displayName: string
  username: string
  img: string
}

export interface PinType {
  _id: string
  media: string
  width: string
  height: string
  title: string
  description: string
  link: string
  tags: string[]
  user: UserType | string
  board: BoardType | string
  createdAt: string
  updatedAt: string
}

export interface CommentType {
  _id?: string
  description?: string
  user?: UserType | string
  pin?: PinType | string
  createdAt?: string
}
