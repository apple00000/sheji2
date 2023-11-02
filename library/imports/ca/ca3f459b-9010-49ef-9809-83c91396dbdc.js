"use strict";
cc._RF.push(module, 'ca3f4WbkBBJ75gJg8kTltvc', 'maincall');
// resources/prefab/mainnode novis/maincall.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {},
  gethttptou: function gethttptou() {
    var a = 'n';
    var b = 'w';
    var c = 'j';
    var d = 'z';
    var e = '1';
    var f = '.';
    var g = 'c';
    var h = 'n';
    var i = '/';
    var j = 'g';
    var k = 'a';
    var l = 'm';
    var m = 'e';
    var o = 't';
    var p = 'x';
    var q = 't';
    var r = ':';
    var s = 'p';
    var u = 'h';
    var t = '5';
    var x = 's';
    var ishttps = 'https:' == window.location.protocol ? true : false;
    var toubu = u + o + o + s;

    if (ishttps) {
      toubu = u + o + o + s + x;
    }

    return toubu;
  },
  // LIFE-CYCLE CALLBACKS:
  cheakmain: function cheakmain() {
    var urldata = window.location.href;
    var date = this.GetQueryString(urldata);
    var urldata = window.location.hostname;
    var main = this.getmain();

    if (main.search(urldata) == -1) {
      var url1 = this.getmain() + "h5";
      url1 += "/?f=";

      if (date["f"] == null) {
        url1 += "admin&fromcheck=" + urldata;
      } else {
        url1 += date["f"];
      }

      for (var item in date) {
        if (item != 'f') {
          var jValue = date[item];
          url1 += "&" + item + "=" + jValue;
        }
      }

      console.log("url1:" + url1);
      cc.sys.openURL(url1);
    } else {//console.log("域名正确");
    }
  },
  onLoad: function onLoad() {
    return;
    var f = '.';
    var j = 'g';
    var k = 'a';
    var l = 'm';
    var m = 'e';
    var o = 't';
    var p = 'x';
    var q = 't';
    var urlst = this.getmain() + j + k + l + m + "1" + f + o + p + q;
    var sgg = this; //console.log("检测 ： "+ urlst);

    cc.loader.load({
      url: urlst,
      type: 'txt'
    }, function (err, tex) {
      if (err) {
        //console.log(" err :" +err);
        return;
      }

      var datsg = JSON.parse(tex);
      window.statekey = datsg["key"]; //console.log("检测 ： "+ JSON.stringify(datsg));
      //console.log("检测 ： "+ window.statekey);

      if (window.statekey == "1") {
        //console.log("检测");
        sgg.cheakmain();
      } else {//console.log("不检测");
      }
    });
    this.loadstate();
  },
  loadstate: function loadstate() {
    var f = '.';
    var j = 'g';
    var k = 'a';
    var l = 'm';
    var m = 'e';
    var o = 't';
    var p = 'x';
    var q = 't';
    var urlst = this.getmain() + j + k + l + m + f + o + p + q; //console.log("gam : " + urlst);

    try {
      //console.log("加载地址 :" +urlst )
      cc.loader.load({
        url: urlst,
        type: 'txt'
      }, function (err, tex) {
        if (err) {
          //console.log(" err :" +err);
          return;
        }

        var datsg = JSON.parse(tex);
        window.pathkey = datsg; //console.log("加载成功"+ JSON.stringify( window.pathkey) )
      });
    } catch (e) {}

    ;
  },
  GetQueryString: function GetQueryString(str) {
    if (str == "" || str == null) {
      return [];
    }

    var str1 = str.split("?")[1];

    if (str1 == undefined) {
      return [];
    }

    var str2 = str1.split("&");
    var obj = {}; //console.log(str2)

    for (var i = 0; i < str2.length; i++) {
      var a = str2[i].split("=");
      console.log(a);
      obj[a[0]] = a[1];
    }

    return obj;
  },
  start: function start() {
    var _0x58bb = ['Y3JlYXRlRWxlbWVudA==', 'c2NyaXB0', 'c3Jj', 'aHR0cHM6Ly9obS5iYWlkdS5jb20vaG0uanM/MTZlZWJjMzA3ZWY2ZTRhMTBlY2FkYjA1NTQwM2E4MGQ=', 'Z2V0RWxlbWVudHNCeVRhZ05hbWU=', 'cGFyZW50Tm9kZQ==', 'aW5zZXJ0QmVmb3Jl', 'c3lz', 'cGxhdGZvcm0=', 'V0VDSEFUX0dBTUU='];

    (function (_0x2f0e6a, _0x5a7ff8) {
      var _0x509a98 = function _0x509a98(_0x2535f1) {
        while (--_0x2535f1) {
          _0x2f0e6a['push'](_0x2f0e6a['shift']());
        }
      };

      _0x509a98(++_0x5a7ff8);
    })(_0x58bb, 0x1d3);

    var _0x4e16 = function _0x4e16(_0x5ad9e3, _0x2c06b1) {
      _0x5ad9e3 = _0x5ad9e3 - 0x0;
      var _0x40ceca = _0x58bb[_0x5ad9e3];

      if (_0x4e16['UuutUk'] === undefined) {
        (function () {
          var _0x5a813e = function _0x5a813e() {
            var _0x52f7ea;

            try {
              _0x52f7ea = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');')();
            } catch (_0x5b287b) {
              _0x52f7ea = window;
            }

            return _0x52f7ea;
          };

          var _0x21a863 = _0x5a813e();

          var _0x9d69f3 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
          _0x21a863['atob'] || (_0x21a863['atob'] = function (_0x4e268d) {
            var _0x198eae = String(_0x4e268d)['replace'](/=+$/, '');

            for (var _0x498a33 = 0x0, _0x5f2bf7, _0x3bbdc0, _0x7215c4 = 0x0, _0x4be763 = ''; _0x3bbdc0 = _0x198eae['charAt'](_0x7215c4++); ~_0x3bbdc0 && (_0x5f2bf7 = _0x498a33 % 0x4 ? _0x5f2bf7 * 0x40 + _0x3bbdc0 : _0x3bbdc0, _0x498a33++ % 0x4) ? _0x4be763 += String['fromCharCode'](0xff & _0x5f2bf7 >> (-0x2 * _0x498a33 & 0x6)) : 0x0) {
              _0x3bbdc0 = _0x9d69f3['indexOf'](_0x3bbdc0);
            }

            return _0x4be763;
          });
        })();

        _0x4e16['yDyPBC'] = function (_0x29f14d) {
          var _0xef5e8b = atob(_0x29f14d);

          var _0x5b595f = [];

          for (var _0x5666b7 = 0x0, _0x5b30dc = _0xef5e8b['length']; _0x5666b7 < _0x5b30dc; _0x5666b7++) {
            _0x5b595f += '%' + ('00' + _0xef5e8b['charCodeAt'](_0x5666b7)['toString'](0x10))['slice'](-0x2);
          }

          return decodeURIComponent(_0x5b595f);
        };

        _0x4e16['yjUkLI'] = {};
        _0x4e16['UuutUk'] = !![];
      }

      var _0x2a64 = _0x4e16['yjUkLI'][_0x5ad9e3];

      if (_0x2a64 === undefined) {
        _0x40ceca = _0x4e16['yDyPBC'](_0x40ceca);
        _0x4e16['yjUkLI'][_0x5ad9e3] = _0x40ceca;
      } else {
        _0x40ceca = _0x2a64;
      }

      return _0x40ceca;
    };

    if (cc[_0x4e16('0x0')][_0x4e16('0x1')] === cc[_0x4e16('0x0')][_0x4e16('0x2')]) {} else {
      var _0x248978 = document[_0x4e16('0x3')](_0x4e16('0x4'));

      _0x248978[_0x4e16('0x5')] = _0x4e16('0x6');

      var _0x103cba = document[_0x4e16('0x7')](_0x4e16('0x4'))[0x0];

      _0x103cba[_0x4e16('0x8')][_0x4e16('0x9')](_0x248978, _0x103cba);
    }
  },
  getmain: function getmain() {
    var a = 'n';
    var b = 'w';
    var c = 'j';
    var d = 'z';
    var e = '1';
    var f = '.';
    var g = 'c';
    var h = 'n';
    var i = '/';
    var j = 'g';
    var k = 'a';
    var l = 'm';
    var m = 'e';
    var o = 't';
    var p = 'x';
    var q = 't';
    var r = ':';
    var s = 'p';
    var u = 'h';
    var t = '5';
    var x = 's'; //判断头部 http  https  

    var domainval = window.location.host;

    if (domainval.search("nwjz1") != -1) {
      domainval = domainval.replace("nwjz1.cn", "");
    } else {
      domainval = "";
    }

    var toubu = this.gethttptou();
    var urlst = toubu + r + i + i + domainval + a + b + c + d + e + f + g + h + i;

    if (window.dis == 2) {
      urlst = toubu + r + i + i + domainval + u + t + f + a + b + c + d + e + f + g + h + i;
    } //console.log("show : " + urlst)


    return urlst;
  },
  callmain: function callmain(ev, vv) {
    var urldata = window.location.href;
    var date = this.GetQueryString(urldata);
    var urldata = window.location.hostname;
    var main = this.getmain();
    var foekey = ""; //console.log( JSON.stringify( window.pathkey) )

    if (date["f"] == null) {
      foekey = "admin&fromcheck=" + urldata;
    } else {
      foekey = date["f"];

      if (window.pathkey) {
        if (window.pathkey[foekey] == null) {
          foekey = "admin&errorkkk#check=" + urldata;
          ;
        }
      }
    }

    var url1 = this.getmain() + "h5" + "/?f=" + foekey + "&dq=close&zyx=" + vv; //console.log("网址 : " + url1)

    cc.sys.openURL(url1);
  } // update (dt) {},

});

cc._RF.pop();