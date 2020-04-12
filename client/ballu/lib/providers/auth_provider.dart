import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/widgets.dart';

import 'package:shared_preferences/shared_preferences.dart';
import '../models/http_exception.dart';

class AuthProvider with ChangeNotifier {
  String _token;
  DateTime _expiryDate;
  String _userId;
  Timer _authTimer;

  bool get isAuthentic {
    return token != null;
  }

  String get token {
    if (_expiryDate != null &&
        _expiryDate.isAfter(DateTime.now()) &&
        _token != null) {
      return _token;
    }
    return null;
  }

  String get userId {
    return _userId;
  }

  Future<void> signup(String email, String password) async {
    final url = 'http://192.168.1.16:3000/ballu/register';
    try {
      final response = await http.post(
        url,
        body: {'email': email, 'password': password},
      );
      if (response.statusCode == 200) {
        final responseBody = json.decode(response.body);
        _token = responseBody['result']['token'];
        _userId = responseBody['result']['user']['_id'];
        _expiryDate = DateTime.now().add(Duration(seconds: 300));
        _autoLogout();
        _token = 'j';
        notifyListeners();

        final prefs = await SharedPreferences.getInstance();

        final userData = json.encode({
          'token': _token,
          'userId': _userId,
          'expiryDate': _expiryDate.toIso8601String(),
        });
        prefs.setString('userData', userData);
      } else {
        throw HttpException(response.body);
      }
    } catch (error) {
      print(error);
      throw error;
    }
  }

  Future<void> login(String email, String password) async {
    final url = 'http://192.168.1.16:3000/ballu/login';
    try {
      final response = await http.post(
        url,
        body: {'email': email, 'password': password},
      );
      if (response.statusCode == 200) {
        final responseBody = json.decode(response.body);
        _token = responseBody['result']['token'];
        _userId = responseBody['result']['user']['_id'];
        _expiryDate = DateTime.now().add(Duration(seconds: 300));
        notifyListeners();

        _autoLogout();

        final prefs = await SharedPreferences.getInstance();

        final userData = json.encode({
          'token': _token,
          'userId': _userId,
          'expiryDate': _expiryDate.toIso8601String(),
        });
        prefs.setString('userData', userData);
      } else {
        throw HttpException(response.body);
      }
    } catch (error) {
      throw error;
    }
  }

  void _autoLogout() {
    if (_authTimer != null) {
      _authTimer.cancel();
    }
    final time = _expiryDate.difference(DateTime.now()).inSeconds;
    _authTimer = Timer(Duration(seconds: time), () => login);
  }

  Future<void> logout() async {
    _userId = null;
    _token = null;
    _expiryDate = null;
    if (_authTimer != null) {
      _authTimer.cancel();
      _authTimer = null;
    }
    notifyListeners();

    final prefs = await SharedPreferences.getInstance();
    prefs.clear();
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
}