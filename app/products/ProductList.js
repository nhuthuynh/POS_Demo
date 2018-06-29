// @flow
import React from 'react'
import { FlatList , Dimensions } from 'react-native'
import ProductItem from './ProductItem'
import createStyles from '../styles/createStyles'
import { TOP_NAV_HEIGHT } from '../styles/stylesDefault'

export default class ProductList extends React.Component {
    constructor() {
        super()
    }
    _renderItem = ({item, index}) => <ProductItem style={styles.card} index={index} {...item} addToOrder={this.props.addToOrder} openProduct={this.props.openProduct} />
    _keyExtractor = (item, index) => index

    render () {
        return (
                <FlatList
                    horizontal={false}
                    numColumns={2}
                    contentContainerStyle={styles.listView}
                    keyExtractor={this._keyExtractor}
                    data={this.props.data}
                    renderItem={this._renderItem}
                    scrollEnabled={true}
                />
        )
    }
}
const { width, height } = Dimensions.get('window')

const styles = createStyles({
    listView: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    card: {
        width: (width / 3) - 10,
        height: ( width / 4 ) - TOP_NAV_HEIGHT,
        marginLeft: 10,
        padding: 5
    }
})
