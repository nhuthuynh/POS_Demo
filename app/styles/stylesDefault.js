// @flow

'use strict'

import { Dimensions, Platform } from 'react-native'
import createStyles from './createStyles'

const { width, height } = Dimensions.get('window')

export const normalize = (size: number): number => {
    return Math.round(scale * size);
}

export const TOP_NAV_HEIGHT = 45;

export const COLORS = {
    primary: '#f68a1f',
    secondary: '#f5b779',
    third: '#ffe9d3',
    borderColor: '#d8d8d8',
    primaryTextColor: '#fff',
    buttonLinkTextColor: '#a2a2a2',
    placeholderTextColor: '#cecece'
}

const scale = width / 375;

export const stylesDefault = createStyles({
    normalize,
    headingStyle: {
        fontSize: normalize(20),
        lineHeight: normalize(24),
        letterSpacing: -1,
        paddingVertical: 10,
        textAlign: 'center'
    },
    paragraphStyle: {
        fontSize: normalize(16),
        lineHeight: normalize(20)
    },
    header: {
        height: TOP_NAV_HEIGHT,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    titleScreen: {
        color: COLORS.primaryTextColor,
        flex: 1,
        fontSize: normalize(14),
        lineHeight: normalize(18),
        textAlign: 'center',
        marginHorizontal: 10
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        marginRight: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: normalize(8),
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
})
