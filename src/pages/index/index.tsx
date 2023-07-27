import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import FlyPoint from '../flypoint/index'
import './index.less'

export default class Index extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <FlyPoint />
      </View>
    )
  }
}
