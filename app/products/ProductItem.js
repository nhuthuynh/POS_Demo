// @flow

import React from 'react'
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, Text, Animated } from 'react-native'
import { stylesDefault, normalize } from '../styles/stylesDefault'
import createStyles from '../styles/createStyles'

export default function ProductItem (props) {
    return (
        <TouchableWithoutFeedback onPress={() => { props.openProduct(props) }}>
        <View style={props.style}>
            <View style={ styles.imageContainer }>
                <Image style={ styles.image } source={{uri: props.image_url}}/>
            </View>
            <View style={ styles.productNameLine }>
                <Text style={ styles.productNameText }>{ props.product_name }</Text>
            </View>
            <View style={ styles.productDescLine }>
                <View style={ styles.productPriceLine }>
                    <Text style={styles.productPriceTxt}>{`$ ${props.price}`}</Text>
                </View>
                <TouchableOpacity onPress={()=>props.addToOrder(props.index)}>
                    <View style={stylesDefault.primaryButton}>
                        <Text style={stylesDefault.buttonText}>Add to Order</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = createStyles({
    imageContainer: {
        flex: 1,
        margin: 5,
        padding: 5,
        marginBottom: 5,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        overflow: 'visible'
    },
    productNameLine: {
        marginVertical: 5,
        alignItems:'center',
        justifyContent: 'center'
    },
    productNameText: {
        color: '#000',
        fontSize: normalize(7)
    },
    productDescLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    productPriceLine: {
        borderColor: '#000',
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    productPriceTxt: {
        fontSize: normalize(7)
    }
})
