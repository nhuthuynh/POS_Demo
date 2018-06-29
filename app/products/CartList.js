//@flow

'use strict'

import React from 'react'
import { FlatList, View, Text } from 'react-native'
import createStyles from '../styles/createStyles'
import CartItem from './CartItem'
import { normalize } from '../styles/stylesDefault'

export default class CartList extends React.Component {
    constructor() {
        super()
    }

    _renderHeader = () => {
        return <View style={styles.cartHeader}>
            <Text style={styles.columnDesc}>Description</Text>
            <Text style={styles.columnPrice}>Price</Text>
        </View>
    }

    _renderItem = ({ item, index }) => {
        return <CartItem {...item} />
    }

    render () {
        return (
            <View style={{ flex: 1 }} >
                <FlatList
                    data={this.props.data}
                    ListHeaderComponent={this._renderHeader}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.product_id+""}
                    />
            </View>
        )
    }
}

const styles = createStyles({
    cartHeader: {
        flexDirection: 'row'
    },
    columnDesc: {
        flex: 3,
        color: '#000',
        fontSize: normalize(10)
    },
    columnPrice: {
        flex: 1,
        color: '#000',
        fontSize: normalize(10)
    },
})
