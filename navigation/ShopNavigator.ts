import { CartScreen } from './../screens/shop/CartScreen';
import { TitleText } from './../../foodFinder/components/TitleText';
import { ProductDetailScreen } from './../screens/shop/ProductDetailScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { ProductsOverviewScreen } from './../screens/shop/ProductsOverviewScreen';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';


const ProductNavigator = createStackNavigator({
    ProductsOverview: {
        screen: ProductsOverviewScreen,
        navigationOptions: {
            headerTitle: 'All Products'
        }
    },
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans',
        },
        headerTintColor: Platform.OS === 'android' ? Colors.contrastPrimary : Colors.primary
    }
});

export default createAppContainer(ProductNavigator);