import React from 'react'

const BaseLogo: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.9581 48C37.2361 48 48 37.2548 48 24C48 10.7452 37.2361 0 23.9581 0C11.3608 0 1.02636 9.67183 0 21.9826H31.7778V26.0174H1.72594e-07C1.02636 38.3282 11.3608 48 23.9581 48Z"
        fill="white"
      />
    </svg>
  )
}

export default BaseLogo
