import { useState, useRef, useEffect } from "react"
import { View, Image } from "@tarojs/components"
import Taro, { useReady } from '@tarojs/taro'
import BasePage from "../../components/basePage"
import styles from './index.module.less'

const Index = () => {
  const [playAnimation, setPlayAnimation] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 })
  const aniRef = useRef<any>(null)
  console.log(startPosition, endPosition)

  const animationStyle = {
    position: 'fixed',
    left: startPosition.x,
    top: startPosition.y,
    animationPlayState: playAnimation ? 'running' : 'paused'
  }

  useReady(() => {
    // 按需加载组件在useReady不一定所有dom渲染完成,所以需要在nextTick中执行 https://taro.redwoodjs.cn/docs/next/vue-page/
    Taro.nextTick(() => { 
      const query = Taro.createSelectorQuery()
      query.select('#targetDom').boundingClientRect(function(rect) {
        setEndPosition({ x: rect.top, y: rect.left })
      }).exec()
    })
  })

  useEffect(() => {
    //监听动画结束
    aniRef.current?.addEventListener('animationend', () => {
      setPlayAnimation(false)
    }) 
  }, [])
 
  return <BasePage className={styles.pageWrapper} >
    {/* <View style={{ height: '30px', width: '30px', backgroundColor: 'red', position: 'fixed', top: 198, left: Taro.pxTransform(11) }}></View> */}
    <View>basePage test</View>
    <View 
      className={styles.imageWrapper}
      onClick={(e) => {
        setStartPosition({ x: e.detail.x, y: e.detail.y })
        setPlayAnimation(!playAnimation)
      }}
    >
      <View ref={aniRef} 
      // @ts-ignore
        style={playAnimation ? animationStyle : undefined} 
        className={playAnimation ? styles.pointWrapper : styles.pointWrapperNotActive}
      >
        <Image
          // @ts-ignore
          style={playAnimation ? animationStyle : undefined} 
          className={playAnimation ? styles.pointImage : styles.pointWrapperNotActive}
          src='https://fulu-tuike.oss-cn-hangzhou.aliyuncs.com/01b528774850b55e/locallife/picture/950a675628ac9a20.png'
        ></Image>
      </View>
      {/* <View className={styles.pointImage}></View> */}
    </View>
    <View 
      id='targetDom' 
      className={styles.targetArea}
    >TGT area</View>
  </BasePage>
}
 
export default Index