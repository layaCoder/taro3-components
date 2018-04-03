import {View} from '@tarojs/components'
import './index.less'

const Index = (props) => {
    return <View className='footerArea'>{props.children}</View>;
}
 
export default Index;