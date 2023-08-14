import { ScrollView, View } from "@tarojs/components"
import classNames from "classnames"
import Header from "./header"
import SwiperHeader from "./header/swiperHeader"
import Footer from './footer'
import './index.less'
// import styles from "./index.module.less"

const BasePage = ({ 
  style, //page的style
  className, //page的className
  contentClassName, //children的className
  children,
  useCustomHeader = false,
  useSwiperHeader = false,
  useCustomFooter = false,
  headerLeftClick,
  headerCenterClick,
  title,
  leftIcon,
  renderCustomHeaderLeft,
  renderCustomHeaderCenter,
  renderCustomHeaderRight,
  headerBackgroundColor,
  headerTextAlign,
  headerTextColor,
  headerZindex,
  headerHeight,
  renderFooter,
  swiperHeaderData,
  disableScroll = true
}: {
    style?: any
    className?: string
    contentClassName?:any
    children?: any
    useCustomHeader?:boolean
    useSwiperHeader?:boolean
    useCustomFooter?:boolean
    headerLeftClick?:any
    headerCenterClick?:any
    title?:string
    leftIcon?:string
    renderCustomHeaderLeft?:any
    renderCustomHeaderCenter?:any
    renderCustomHeaderRight?:any
    headerBackgroundColor?:any
    headerTextAlign?:string
    headerTextColor?:string
    headerZindex?:number
    headerHeight?:string
    renderFooter?:any
    swiperHeaderData?:HeaderData.SwiperItem[]
    disableScroll?:boolean
}) => {
  // return <View style={style} className={className || styles.page_body}>
  return <View style={style} className={classNames('page_body', className)}>
    {/* 使用自定义header，需要在config中去除小程序原生header */}
    {useCustomHeader ? <Header 
      onCenterClick={headerLeftClick} 
      onLeftClick={headerCenterClick}
      title={title}
      leftIcon={leftIcon}
      renderLeft={renderCustomHeaderLeft}
      renderRight={renderCustomHeaderRight}
      renderCenter={renderCustomHeaderCenter}
      backgroundColor={headerBackgroundColor}
      textAlign={headerTextAlign}
      color={headerTextColor}
      zIndex={headerZindex}
      headerHeight={headerHeight}
    /> : null}
    {useSwiperHeader ? <SwiperHeader headerHeight={headerHeight} swiperData={swiperHeaderData} leftIcon={leftIcon} /> : null}
    {disableScroll ? <View className={contentClassName}>
      {children}
    </View> 
      : <ScrollView scrollY scrollWithAnimation className={contentClassName} lowerThreshold={20} upperThreshold={20} >
        {children}
      </ScrollView>
      }
      {!useCustomFooter&&<Footer>{renderFooter}</Footer>}
  </View>
}

export default BasePage