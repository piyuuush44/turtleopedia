import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

class HomeProvider with ChangeNotifier {
  String _token;

  void setToken(String token) {
    _token = token;
    print(_token);
  }
}
