// @flow

import React from 'react'
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, Text, Animated, Alert } from 'react-native'
import { stylesDefault, COLORS, normalize } from '../styles/stylesDefault'
import { connect, dispatch } from 'react-redux'
import createStyles from '../styles/createStyles'
import { addProduct } from '../actions/productActions'


class ProductDetailScreen extends React.Component {
    constructor() {
        super()
    }

    returnListScreen = () => {
        this.props.navigation.goBack()
    }

    addProduct = () => {
        let props = this.props.navigation.state.params
        this.props.addProduct(props).then(() => {
            Alert.alert('', `Product ${props.product_name} is added!`, [{text: 'OK'}])
        }, ()=>{
            Alert.alert('', `Add product ${props.product_name} failed!`, [{text: 'OK'}])
        })
    }

    render() {
        let props = this.props.navigation.state.params
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={ styles.imageContainer }>
                    <Image style={ styles.image } source={{uri: props.image_url}}/>
                </View>
                <View style={styles.productNameLine}>
                    <Text style={styles.productNameText}>{ props.product_name }</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                    <View style={styles.productPriceLine}>
                        <Text style={styles.productPriceTxt}>{`$ ${props.price}`}</Text>
                    </View>
                    <TouchableOpacity onPress={()=> this.addProduct(props.index)}>
                        <View style={stylesDefault.primaryButton}>
                            <Text style={stylesDefault.buttonText}>Add to Order</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.returnListScreen()}>
                        <View style={stylesDefault.primaryButton}>
                            <Text style={stylesDefault.buttonText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = createStyles({
    imageContainer: {
        flex: 1,
        margin: 10,
        padding: 50
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

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product) => dispatch(addProduct(product))
    }
}

export default connect(null, mapDispatchToProps)(ProductDetailScreen)
