// @flow

import React from 'react'
import { View, Text, Alert } from 'react-native'
import { connect, dispatch } from 'react-redux'
import CartList from './CartList'
import ProductList from './ProductList'
import ProductItem from './ProductItem'
import { stylesDefault, normalize, COLORS } from '../styles/stylesDefault'
import createStyles from '../styles/createStyles'
import { loadProducts, addProduct, loadAddedProducts } from '../actions/productActions'

class ProductScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super()
    }

    _intervalLoadProductsId: IntervalID

    addProduct = (index) => {
        this.props.addProduct(this.props.products[index]).then(()=>{
            Alert.alert('', `Product ${this.props.products[index].product_name} is added!`, [{text: 'OK'}])
        }, ()=>{
            Alert.alert('', `Add product ${this.props.products[index].product_name} failed!`, [{text: 'OK'}])
        })
    }

    componentDidMount() {
        this.loadCartInIntervalTime()
    }

    loadCartInIntervalTime () {
        if(!this._intervalLoadProductsId) {
            //this.loadCart()
            //this.props.loadProducts()
            this._intervalLoadProductsId = setInterval(() => this.loadCart(), 2000)
        }
    }

    loadCart = () => this.props.loadCart()
        .then(() => this.props.loadProducts())

    openProduct = (item) => {
        this.props.navigation.navigate('ProductDetailModal', {...item})
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.cartContainer}>
                    <Text style={[styles.title, styles.noBackgroundColor]}>Your cart</Text>
                    <CartList data={this.props.cart} />
                </View>
                <View style={styles.recommendedProductContainer}>
                    <Text style={styles.title}>Recommended for you</Text>
                    <View style={styles.recommendedProductList}>
                        <ProductList data={this.props.products} addToOrder={this.addProduct} openProduct={this.openProduct} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = createStyles({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    title: {
        backgroundColor: COLORS.primary,
        fontSize: normalize(14),
        fontWeight: 'normal',
        color: COLORS.primaryTextColor,
        textAlign: 'center',
        padding: 5
    },
    noBackgroundColor: {
        backgroundColor: '#fff',
        color: '#000'
    },
    cartContainer: {
        marginRight: 10,
        flex: 1,
        flexDirection: 'column'
    },
    cartList: {

    },
    cart: {
        flex: 1
    },
    loadingContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    recommendedProductContainer: {
        flex: 2,
    },
    recommendedProductList: {
        flex: 1,
        position: 'relative'
    }
})

const mapStateToProps = (state) => {
    return {
        cart: state.productReducer.addedProducts || [],
        products: state.productReducer.products
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadCart: () => dispatch(loadAddedProducts()),
        loadProducts: () => dispatch(loadProducts()),
        addProduct: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen)
