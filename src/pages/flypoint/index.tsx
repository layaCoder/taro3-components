import { useState, useRef, useEffect } from "react"
import { View, Image, Button } from "@tarojs/components"
import Taro, { useReady } from '@tarojs/taro'
import BasePage from "../../components/basePage"
import './index.less'

const getDefAnimateStyle = () => ({
  transform: `scale(1)`,
  top: `0`,
  left: `0`
})

const Index = () => {
  // const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [tgtPosition, setTgtPosition] = useState({ x: 0, y: 0 })
  
  const [[animationStyle, animationStyleY, animationStyleX], setAnimationStyle] = useState(
    () => {
      const aStyle = getDefAnimateStyle()
      return [
        { ...aStyle, top: '0', left: '0' },
        { transform: `translateY(${aStyle.top})` },
        { transform: `translateX(${aStyle.left})` }
      ]
    }
   
  )

  const aniRef = useRef<any>(null)

  const aniControl = ({ animate = true, duration = 2000, delay = 300 } = {}) => {
    const aStyle = getDefAnimateStyle()
    if (animate) {
      const ams:string[] = []
      ams.push(`transform ${duration}ms cubic-bezier(0.45, 0.51, 0.7, 0.65) ${delay}ms`)
      // @ts-ignore
      aStyle.transition = ams.join(',')
    }
    setAnimationStyle([
      { ...aStyle, top: '0', left: '0' },
      {
        transform: `translateY(${tgtPosition.x}px)`,
        // @ts-ignore
        transition: aStyle.transition ? `transform ${duration}ms cubic-bezier(0.21, -0.9, 0.7, 0.3)` : ''
      },
      {
        transform: `translateX(${tgtPosition.y}px)`,
        // @ts-ignore
        transition: aStyle.transition ? `transform ${duration}ms` : ''
      }
    ])
  }
  useReady(() => {
    // 按需加载组件在useReady不一定所有dom渲染完成,所以需要在nextTick中执行 https://taro.redwoodjs.cn/docs/next/vue-page/
    Taro.nextTick(() => { 
      const query = Taro.createSelectorQuery()
      query.select('#targetDom').boundingClientRect(function(rect) {
        setTgtPosition({ x: rect.top, y: rect.left })
      }).exec()
    })
  })

  useEffect(() => {
    //监听动画结束
    aniRef.current?.addEventListener('transitionend', () => {
      console.log('animation end')
      aniControl({ animate: false })
    }) 
  }, [])
 
  console.log(animationStyle, animationStyleY, 544)
  return <BasePage className='pageWrapper' >
    <View>basePage test</View>
    <View 
      className='imageWrapper'
    >
      <View style={animationStyleX}>
        <View ref={aniRef} style={animationStyleY}>
          <View 
          // @ts-ignore
            style={animationStyle} 
            className='pointWrapper'
          >
          </View>
        </View>
      </View>
    </View>
    <View 
      id='targetDom' 
      className='targetArea'
    >TGT area</View>
    <Button
      onClick={() => {
        aniControl({ animate: true, duration: 2000, delay: 300 })
      }}
    >start</Button>
  </BasePage>
}
 
export default Index