import { CanvasForm, CanvasSpace } from 'pts'
import React, { useRef, createRef, useEffect } from 'react'
import {
  PtsCanvas,
  HandleAnimateFn,
  HandleActionFn,
  HandleStartFn
} from 'react-pts-canvas'
import './App.css'

/**
 * Brief example of passing refs down to pointsCanvas for access in parent component
 */
const App: React.FC = () => {
  let radius = 50
  const canvRef = createRef<HTMLCanvasElement>()
  let spaceRef: CanvasSpace
  let formRef: CanvasForm
  const canvasSize = useRef(100)

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' && canvRef.current) {
        canvRef.current.click()
      }
    })
  }, [])

  const handleStart: HandleStartFn = (_bound, space, form) => {
    spaceRef = space
    formRef = form
  }

  const handleAnimate: HandleAnimateFn = (space, form) => {
    form.point(space.pointer, radius, 'circle')
    if (radius > 20) radius--
  }

  const handleAction: HandleActionFn = (_space, _form, type) => {
    if (type === 'up') {
      radius += 20
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh'
      }}
    >
      <PtsCanvas
        background="#62e"
        name="quickstart-tester"
        onStart={handleStart}
        onAnimate={handleAnimate}
        onAction={handleAction}
        ref={canvRef}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          textAlign: 'center'
        }}
      >
        <button
          onClick={() => {
            const canvas = canvRef.current
            const ctx = canvas?.getContext('2d')
            if (canvas) {
              canvasSize.current -= 10
              canvas.setAttribute(
                'style',
                `
                width:${canvasSize.current}%;
                height:${canvasSize.current}%;
                margin: 0 auto;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                `
              )
            }
            if (ctx) {
              console.log('ctx', ctx)
            }

            console.log('canvas', canvRef.current)
          }}
        >
          Log / Shrink Canvas
        </button>
        <button
          onClick={() => {
            console.log('space', spaceRef)
          }}
        >
          Log Space
        </button>
        <button
          onClick={() => {
            console.log('form', formRef)
          }}
        >
          Log Form
        </button>
      </div>
    </div>
  )
}

export default App
