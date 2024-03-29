import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import  './index.less'

const Header = ({
  headerHeight = '100px',
  onCenterClick,
  onLeftClick,
  title,
  leftIcon = '',
  renderLeft,
  renderRight,
  renderCenter,
  backgroundColor = '#fff',
  textAlign,
  color = '#333',
  zIndex = 14
}: {
  headerHeight?:string
    onCenterClick?: any,
    onLeftClick?: any,
    title?: string,
    leftIcon?: string,
    renderLeft?: any,
    renderRight?: any,
    renderCenter?: any,
    backgroundColor?: string,
    textAlign?: string,
    color?: string,
    zIndex?: number

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

  const emptyFunction = () => { }
  const _onCenterClick = onCenterClick || emptyFunction

  const _onLeftClick = () => {
    if (onLeftClick) {
      onLeftClick()
    } else if (Taro.getCurrentPages().length === 1) { //如果当前页面是首页
      // 首页路由back留白
    } else { //否则路由back
      Taro.navigateBack()
    }
  }

  return (
    <View className='pageHeader' style={{ zIndex, backgroundColor }}>
      <View style={{ width: '100%', height: headerHeight }} >
        <View className='content' style={{ height: headerHeight, width: '100%' }}>
          {renderLeft ? (
            <View className='left'>{renderLeft()}</View>
          ) : (
            <View className='left' onClick={_onLeftClick}>
              <Image style={{ height: '20px', width: '20px' }} src={leftIcon} />
            </View>
          )}
          <View className='centerHeight' />
          {renderCenter ? (
            <View
              className='center'
              onClick={_onCenterClick}
              style={{ justifyContent: textAlign }}
            >
              {renderCenter()}
            </View>
          ) : (
            <View
              className='center'
              onClick={_onCenterClick}
              style={{
                justifyContent: textAlign
              }}
            >
              {!!title && (
                <Text className='title' style={{ color }}>
                  {title}
                </Text>
              )}
            </View>
          )}
          {renderRight && <View className='right'>{renderRight()}</View>}
          <View className='rightHeight' style={{ width: `${rect.width + 10}px` }} />
        </View>
      </View>
    </View>)
}

export default Header