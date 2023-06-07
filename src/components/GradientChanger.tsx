// file-name: src\components\GradientChanger.tsx

import * as React from 'react'
import { cubicCoordinates, stepsCoordinates } from 'easing-coordinates'
import { useSpring, animated, to as interpolate, createInterpolator } from '@react-spring/web'
import { useControls, Leva } from 'leva' // Import the `folder` function

import styles from './styles.module.css'

type EasingFunction = 'ease-in-out' | 'ease-out' | 'ease-in' | 'ease' | 'linear';

const easeMap: Record<EasingFunction, { x1: number, y1: number, x2: number, y2: number }> = {
  'ease-in-out': { x1: 0.42, y1: 0, x2: 0.58, y2: 1 },
  'ease-out': { x1: 0, y1: 0, x2: 0.58, y2: 1 },
  'ease-in': { x1: 0.42, y1: 0, x2: 1, y2: 1 },
  ease: { x1: 0.25, y1: 0.1, x2: 0.25, y2: 1 },
  linear: { x1: 0.25, y1: 0.25, x2: 0.75, y2: 0.75 },
}

const GradientChanger = () => {
  
    const { from, mid, to, angle, stops, easeCustom, easing } = useControls('changeGradient', { // Group controls under the 'changeGradient' folder
        from: '#ff714a',
        mid: '#fe6b8b',
        to: '#ffd43d',
        angle: {
          value: 45,
          min: 0,
          max: 360,
        },
        stops: {
          value: 5,
          max: 100,
          min: 2,
        },
        easing: {
          value: 'linear',
          options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'steps'],
        },
        easeCustom: '',
      })
    
      const { colorFrom, colorMid, colorTo } = useSpring({
        colorFrom: from,
        colorMid: mid,
        colorTo: to,
      })
    
      const coordinates = React.useMemo(() => {
        let coordinates
        const customBezier = easeCustom.split(',').map(Number)
        if (customBezier.length <= 1) {
          if (easing === 'steps') {
            coordinates = stepsCoordinates(stops, 'skip-none')
          } else {
            const { x1, y1, x2, y2 } = easeMap[easing as EasingFunction]  // <- assert easing as EasingFunction
            coordinates = cubicCoordinates(x1, y1, x2, y2, stops)
          }
        } else {
          coordinates = cubicCoordinates(customBezier[0], customBezier[1], customBezier[2], customBezier[3], stops)
        }
      
        return coordinates
      }, [easing, easeCustom, stops])
    
      const allStops = interpolate([colorFrom, colorMid, colorTo], (from, mid, to) => {
        const blend = createInterpolator({ range: [0, 0.5, 1], output: [from, mid, to] })
    
        return coordinates.map(({ x, y }) => {
          const color = blend(y)
    
          return `${color} ${x * 100}%`
        })
      })

      return (
        <>
          <animated.div
            className={styles.container}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundImage: allStops.to((...args) => `linear-gradient(${angle}deg, ${args.join(', ')})`),
            }}
          />
          <Leva
            //theme={} // you can pass a custom theme (see the styling section)
            //fill // default = false,  true makes the pane fill the parent dom node it's rendered in
            //flat // default = false,  true removes border radius and shadow
            //oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
            //hideTitleBar // default = false, hides the GUI header
            collapsed={true} // default = false, when true the GUI is collpased
            //hidden // default = false, when true the GUI is hidden
          />
        </>

      )    
}

export default GradientChanger;
