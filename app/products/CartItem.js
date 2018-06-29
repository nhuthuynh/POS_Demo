// @flow

import React from 'react'
import { View, Text } from 'react-native'
import createStyles from '../styles/createStyles'
import { normalize } from '../styles/stylesDefault'

export default function CartItem (props) {
    return (
        <View style={styles.cartRow}>
            <View style={styles.columnDesc}>
                <Text style={styles.txt}>{props.product_name}</Text>
            </View>
            <View style={styles.columnPrice}>
                <Text style={styles.txt}>{`$ ${props.price}`}</Text>
            </View>
        </View>
    )
}

const styles = createStyles({
    cartRow: {
        flexDirection: 'row',
    },
    columnDesc: {
        flex: 3
    },
    columnPrice: {
        flex: 1
    },
    txt: {
        fontSize: normalize(7),
        color: '#000'
    }
})
