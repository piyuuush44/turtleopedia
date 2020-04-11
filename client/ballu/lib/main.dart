//import 'package:flutter/material.dart';
//import 'package:provider/provider.dart';
//
//import './screens/home_screen.dart';
//import './screens/welcome_screen.dart';
//import './screens/login_screen.dart';
//import './screens/register_screen.dart';
//import './screens/splash_screen.dart';
//
//import './providers/auth_provider.dart';
//import './providers/home_provider.dart';
//
//void main() => runApp(MyApp());
//
//class MyApp extends StatelessWidget {
//  // This widget is the root of your application.
//  @override
//  Widget build(BuildContext context) {
//    print('on build');
//    return MultiProvider(
//      providers: [
//        ChangeNotifierProvider.value(value: AuthProvider()),
//        ChangeNotifierProxyProvider<AuthProvider, HomeProvider>(
//          create: (_) => HomeProvider(),
//          update: (_, authData, homeProvider) =>
//              homeProvider..setToken(authData.token),
//        )
//      ],
//      child: Consumer<AuthProvider>(
//        builder: (ctx, authData, _) => MaterialApp(
//          title: 'Ballu Expense Tracker',
//          theme: ThemeData(
//            primarySwatch: Colors.purple,
//            accentColor: Colors.deepOrange,
//          ),
//          home: authData.isAuth
//              ? HomeScreen()
//              : FutureBuilder(
//                  future: authData.tryAutoLogin(),
//                  builder: (ctx, authSnapshot) =>
//                      authSnapshot.connectionState == ConnectionState.waiting
//                          ? SplashScreen()
//                          : WelcomeScreen(),
//                ),
//          routes: {
//            HomeScreen.routeName: (ctx) => HomeScreen(),
//            LoginScreen.routeName: (ctx) => LoginScreen(),
//            RegisterScreen.routeName: (ctx) => RegisterScreen(),
//          },
//        ),
//      ),
//    );
//  }
//}

import 'package:flutter/material.dart';
import 'package:flutterapp/providers/auth_provider.dart';
import 'package:flutterapp/screens/home_screen.dart';
import 'package:flutterapp/screens/login_screen.dart';
import 'package:flutterapp/screens/welcome_screen.dart';
import 'package:provider/provider.dart';

import './screens/splash_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    print('inside build');
    return MultiProvider(
      providers: [
        ChangeNotifierProvider.value(
          value: AuthProvider(),
        ),
//        ChangeNotifierProxyProvider<Auth, Products>(
//          create: (ctx) => Products(),
//          update: (_, data, builder) => builder
//            ..setId(data.userId)
//            ..setToken(data.token),
//        ),
//        ChangeNotifierProvider.value(
//          value: Cart(),
//        ),
      ],
      child: Consumer<AuthProvider>(
        builder: (ctx, auth, _) => MaterialApp(
          title: 'MyShop',
          theme: ThemeData(
            primarySwatch: Colors.purple,
            accentColor: Colors.deepOrange,
            fontFamily: 'Lato',
          ),
          home: auth.isAuth
              ? WelcomeScreen()
              : FutureBuilder(
                  future: auth.tryAutoLogin(),
                  builder: (ctx, authResultSnapshot) =>
                      authResultSnapshot.connectionState ==
                              ConnectionState.waiting
                          ? SplashScreen()
                          : WelcomeScreen(),
                ),
          routes: {LoginScreen.routeName: (ctx) => LoginScreen()},
        ),
      ),
    );
  }
}
