/* @flow */

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import ProductScreen from './products/ProductScreen'
import ProductDetailScreen from './products/ProductDetailScreen'
import { stylesDefault } from './styles/stylesDefault'

// console.disableYellowBox = true
// console.error = error => error.apply
// NativeModules.ExceptionsManager = null
const MainStack = StackNavigator({
    Product: {
        screen: ProductScreen
    }
}, {
    initialRouteName: 'Product'
})

const RootStack = StackNavigator({
    Main: {
        screen: MainStack
    },
    ProductDetailModal: {
        screen: ProductDetailScreen
    }
}, {
    mode: 'modal',
    headerMode: 'none'
})

export default class App extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Provider store={configureStore()}>
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <RootStack/>
                </View>
            </Provider>
        )
    }
}
