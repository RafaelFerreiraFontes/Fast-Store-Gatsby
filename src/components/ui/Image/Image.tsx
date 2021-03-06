import { forwardRef, memo } from 'react'
import { Helmet } from 'react-helmet-async'

import { useImage } from './useImage'
import type { ImageOptions } from './useImage'

interface Props extends ImageOptions {
  preload?: boolean
}

const Image = forwardRef<HTMLImageElement, Props>(
  ({ preload = false, ...otherProps }, ref) => {
    const imgProps = useImage(otherProps)
    const { src, sizes = '100vw', srcSet } = imgProps

    return (
      <>
        {preload && (
          <Helmet
            link={[
              {
                as: 'image',
                rel: 'preload',
                href: src,
                imagesrcset: srcSet,
                imagesizes: sizes,
              } as any,
            ]}
          />
        )}
        <img ref={ref} data-store-image {...imgProps} alt={imgProps.alt} />
      </>
    )
  }
)

Image.displayName = 'Image'
export default memo(Image)
