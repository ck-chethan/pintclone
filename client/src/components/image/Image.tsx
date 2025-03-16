import { IKImage } from 'imagekitio-react'

interface ImageProps {
  path: string
  alt?: string
  className?: string
  w?: string
  h?: string
  onClickHandler?: () => void
}

const Image = ({ path, alt, className, w, h, onClickHandler }: ImageProps) => {
  return (
    <IKImage
      className={className}
      urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
      path={path}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      onClick={onClickHandler}
    />
  )
}

export default Image
