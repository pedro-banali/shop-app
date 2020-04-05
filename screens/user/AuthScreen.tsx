import React, { FC } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Button } from 'react-native';
import { Card } from '../../components/UI/Card';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import { NavigationParams, NavigationNavigatorProps } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {}

export const AuthScreen: FC<Props & NavigationParams> &
  NavigationNavigatorProps = (props) => {
  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient
        style={styles.gradient}
        colors={[Colors.primary, Colors.contrastPrimary]}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id='email'
              label='E-mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid email address.'
              onInputChange={() => {}}
              initialValue=''
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorText='Please enter a password.'
              onInputChange={() => {}}
              initialValue=''
            />
            <View style={styles.buttonContainer}>
              <Button title='Login' color={Colors.green} onPress={() => {}} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title='Switch to Sign up'
                color={Colors.mildBrown}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 24,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});
