import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import './index.less'
// import iconBack from '../../../assets/navBack.png'

const SwiperHeader = ({
  headerHeight,
  zIndex,
  leftIcon = '',
  swiperData
}:{
    headerHeight?:string
    zIndex?:number
    leftIcon?:string
    swiperData?:HeaderData.SwiperItem[]
}) => {
  let rect
  try {
    rect = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null
    if (rect === null) {
      throw new Error('getMenuButtonBoundingClientRect error')
    }
    // 取值为0的情况  有可能width不为0 top为0的情况
    if (!rect.width || !rect.top || !rect.left || !rect.height) {
      throw new Error('getMenuButtonBoundingClientRect error')
    }
  } catch (error) {
    rect = { width: 82 }
  }

  return <View className='pageHeader' style={{ zIndex }}>
    <View 
      style={{ position: 'fixed', top: rect.top }}
      className='backImgWrapper'
    >
      <Image className='backImg' src={leftIcon} />
    </View>
    <View style={{ width: '750rpx', height: headerHeight }} >
      <Swiper
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical={false}
        circular
        indicatorDots
        autoplay
      >
        {swiperData?.map((it, idx) => {
          return <SwiperItem key={idx + 1} >
            <View className='swiperItem' onClick={() => {
              // 
            }}
            >
              <Image style={{ height: '100%', width: '750rpx' }} src={it.img}></Image>
            </View>
          </SwiperItem>
        })}

      </Swiper>
    </View>
  </View>
}

export default SwiperHeader