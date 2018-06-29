//@flow

'use strict'

import React from 'react'
import { View, Text, Dimensions, ActivityIndicator} from 'react-native'
import { connect, dispatch } from 'react-redux'
import createStyles from '../styles/createStyles'
import { TOP_NAV_HEIGHT } from '../styles/stylesDefault'
import { loadAddedProducts } from '../actions/productActions'
import { ADDED_PRODUCTS_SECTION_HEADER } from '../constants'

class AddedProductScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    _intervalLoadProductsId: IntervalID
    constructor () {
        super()
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('didBlur', ()=>{
            if(this._intervalLoadProductsId) {
                this._intervalLoadProductsId = clearInterval(this._intervalLoadProductsId)
            }
        })
        this.props.navigation.addListener('didFocus', ()=>{
            this.loadProductsInIntervalTime()
        })

        this.loadProductsInIntervalTime()

    }

    loadProductsInIntervalTime () {
        if(!this._intervalLoadProductsId) {
            this,loadAddedProducts()
            this._intervalLoadProductsId = setInterval(() => this.loadAddedProducts(), 3000)
        }
    }

    loadAddedProducts () {
        this.props.loadAddedProducts()
            .then(() => {
                if(this.props.addedProducts && this.props.addedProducts.lines.length === 1)
                    this.props.navigation.navigate('Product')
                this.setState({
                    isLoading: false
                })
            })
    }

    _renderItem = () => this.props.addedProducts && this.props.addedProducts.lines ?
        this.props.addedProducts.lines.map((item, index) =>
            <View style={styles.row} key={index}>
                <View style={styles.fixedWidthColumn}><Text style={styles.txt}>{item.product_id}</Text></View>
                <View style={styles.column}><Text style={styles.txt}>{item.product_name}</Text></View>
                <View style={styles.fixedWidthColumn}><Text style={styles.txt}>{`$ ${item.price}`}</Text></View>
            </View>)
            : []
    _keyExtractor = (item, index) => index

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.fixedWidthColumn}>
                        <Text style={styles.headerText}>SKU</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.headerText}>DESCRIPTION</Text>
                    </View>
                    <View style={styles.fixedWidthColumn}>
                        <Text style={styles.headerText}>PRICE</Text>
                    </View>
                </View>
                {
                    this.state.isLoading ? <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#333" /></View> : <View style={{ flex: 1 }}>{ this._renderItem() }</View>
                }
                <View style={[styles.row, styles.footer]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, padding: 5 }}>
                        <Text style={{color: '#333', fontSize: 22, fontWeight: 'bold'}}>Total: </Text>
                        <Text style={{color: '#333', fontSize: 14, marginTop: 8 }}>{`$ ${this.props.addedProducts.total || '0.0'}`}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const { width, height } = Dimensions.get('window')

const styles = createStyles({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        marginTop: 5
    },
    headerText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    txt: {
        color: '#000'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
        padding: 5
    },
    fixedWidthColumn: {
        width: width / 6
    },
    column: {
        flex: 1
    },
    footer: {
        backgroundColor: '#000',
        height: 50,
        padding: 5,
        margin: 0
    }
})

const mapStateToProps = (state) => {
    return { addedProducts: state.productReducer.addedProducts || {} }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadAddedProducts: () => dispatch(loadAddedProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddedProductScreen)
