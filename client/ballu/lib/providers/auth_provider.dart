import 'dart:async';
import 'dart:convert';
import 'dart:html';

import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../models/http_exception.dart';

class AuthProvider with ChangeNotifier {
  String _token;
  DateTime _expiryDate;
  String _userId;
  Timer _authTimer;

  bool get isAuthentic {
    return token != null;
  }

  String get userId {
    return _userId;
  }

  String get token {
    if (_expiryDate != null &&
        _expiryDate.isAfter(DateTime.now()) &&
        _token != null) {
      return _token;
    }
    return null;
  }

  Future<void> _authenticate(
      String email, String password, String urlParam) async {
    final url =
        'https://identitytoolkit.googleapis.com/v1/accounts:$urlParam?key=AIzaSyDdaMB59wCz4fqZIoC8r7LhzL3O6h2YQIU';
    try {
      final response = await http.post(url,
          body: json.encode({
            'email': email,
            'password': password,
          }));
      final responseBody = json.decode(response.body);
      if (responseBody['error'] != null) {
        throw HttpException(responseBody['error']['message']);
      }
      _token = responseBody['idToken'];
      _userId = responseBody['localId'];
      _expiryDate = DateTime.now().add(Duration(seconds: 300));
      _autoLogout();

      final prefs = await SharedPreferences.getInstance();

      final userData = json.encode({
        'token': token,
        'userId': userId,
        'expiryDate': _expiryDate.toIso8601String(),
      });
      prefs.setString('userData', userData);

      notifyListeners();
    } catch (error) {
      throw error;
    }
  }

  Future<void> login(String email, String password) async {
    final url = 'signup url';
    try {
      final response = await http.post(
        url,
        body: {'email': email, 'passowrd': password},
      );
      if (response.statusCode == 200) {
        final responseBody = json.decode(response.body);
        _token = responseBody['idToken'];
        _userId = responseBody['localId'];
        _expiryDate = DateTime.now().add(Duration(seconds: 300));
        _autoLogout();

        final prefs = await SharedPreferences.getInstance();

        final userData = json.encode({
          'token': token,
          'userId': userId,
          'expiryDate': _expiryDate.toIso8601String(),
        });
        prefs.setString('userData', userData);

        notifyListeners();
      }else{
        throw HttpException(response.body);
      }
    } catch (error) {
      throw error;
    }
  }

  Future<void> signup(String email, String password) async {
    return _authenticate(email, password, 'signUp');
  }

  Future<void> logout() async {
    _userId = null;
    _token = null;
    _expiryDate = null;
    if (_authTimer != null) {
      _authTimer.cancel();
      _authTimer = null;
    }
    final prefs = await SharedPreferences.getInstance();
    prefs.clear();
    notifyListeners();
  }

  Future<bool> tryAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey('userData')) {
      return false;
    }
    final extractedData =
        json.decode(prefs.getString('userData')) as Map<String, Object>;
    final expiryDate = DateTime.parse(extractedData['expiryDate']);
    if (expiryDate.isBefore(DateTime.now())) {
      return false;
    }
    _token = extractedData['token'];
    _userId = extractedData['userId'];
    _expiryDate = expiryDate;
    _autoLogout();
    notifyListeners();
    return true;
  }

  void _autoLogout() {
    if (_authTimer != null) {
      _authTimer.cancel();
    }
    final time = _expiryDate.difference(DateTime.now()).inSeconds;
    _authTimer = Timer(Duration(seconds: time), () => login);
  }
}
