import { createStackNavigator } from 'react-navigation-stack';
import { ProductsOverviewScreen } from './../screens/shop/ProductsOverviewScreen';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';


const ProductNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? Colors.contrastPrimary : Colors.primary
    }
});

export default createAppContainer(ProductNavigator);