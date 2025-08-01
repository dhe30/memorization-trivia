import type { PropsWithChildren } from 'react'
// import type Question from "@/context/TriviaType";

export default function Liquid({
    children
}: PropsWithChildren) {
  return (
    <>
      <div className="glassBtn text-2xl flex flex-row items-center justify-center text-white callunasans-regualar m-0 p-0 soft-text'">
        {/* <div className="absolute w-full h-full selector"></div> */}
        {children}
      </div>
      <svg style={{ display: 'none' }}>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="0.02" result="blur" />
            <feDisplacementMap in="SourceGraphic" in2="blur" scale="77" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="btn-glass" primitiveUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
  <feImage
  x="0%" y="0%" width="100%" height="100%"
  preserveAspectRatio="none"
  result="map"
  href="data:image/svg+xml;utf8,
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <defs>
        <!-- Radial base gradient -->
        <radialGradient id='rad' cx='50%' cy='50%' r='70%'>
          <stop offset='0%' stop-color='black'/>
          <stop offset='25%' stop-color='orange'/>
          <stop offset='50%' stop-color='red'/>
          <stop offset='75%' stop-color='lime'/>
          <stop offset='100%' stop-color='blue'/>
        </radialGradient>
        <!-- Overlay a diagonal linear gradient for extra variation -->
        <linearGradient id='lin' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='white' stop-opacity='0.5'/>
          <stop offset='100%' stop-color='black' stop-opacity='0.5'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(%23rad)'/>
      <rect width='100%' height='100%' fill='url(%23lin)'/>
    </svg>" />
  
  <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur" />
  
  <feDisplacementMap in="blur" in2="map" scale="0.5"
    xChannelSelector="R" yChannelSelector="G" />
</filter>

    </svg>
    </>
  )
}
