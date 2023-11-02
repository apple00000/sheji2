
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/extend/bigNumber.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '02e4aFqystFf7DVaHnZYH68', 'bigNumber');
// framework/extend/bigNumber.js

"use strict";

;

(function (globalObject) {
  'use strict';
  /*
   *      bignumber.js v7.2.1
   *      A JavaScript library for arbitrary-precision arithmetic.
   *      https://github.com/MikeMcl/bignumber.js
   *      Copyright (c) 2018 Michael Mclaughlin <M8ch88l@gmail.com>
   *      MIT Licensed.
   *
   *      BigNumber.prototype methods     |  BigNumber methods
   *                                      |
   *      absoluteValue            abs    |  clone
   *      comparedTo                      |  config               set
   *      decimalPlaces            dp     |      DECIMAL_PLACES
   *      dividedBy                div    |      ROUNDING_MODE
   *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
   *      exponentiatedBy          pow    |      RANGE
   *      integerValue                    |      CRYPTO
   *      isEqualTo                eq     |      MODULO_MODE
   *      isFinite                        |      POW_PRECISION
   *      isGreaterThan            gt     |      FORMAT
   *      isGreaterThanOrEqualTo   gte    |      ALPHABET
   *      isInteger                       |  isBigNumber
   *      isLessThan               lt     |  maximum              max
   *      isLessThanOrEqualTo      lte    |  minimum              min
   *      isNaN                           |  random
   *      isNegative                      |
   *      isPositive                      |
   *      isZero                          |
   *      minus                           |
   *      modulo                   mod    |
   *      multipliedBy             times  |
   *      negated                         |
   *      plus                            |
   *      precision                sd     |
   *      shiftedBy                       |
   *      squareRoot               sqrt   |
   *      toExponential                   |
   *      toFixed                         |
   *      toFormat                        |
   *      toFraction                      |
   *      toJSON                          |
   *      toNumber                        |
   *      toPrecision                     |
   *      toString                        |
   *      valueOf                         |
   *
   */

  var BigNumber,
      isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
      mathceil = Math.ceil,
      mathfloor = Math.floor,
      bignumberError = '[BigNumber Error] ',
      tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',
      BASE = 1e14,
      LOG_BASE = 14,
      MAX_SAFE_INTEGER = 0x1fffffffffffff,
      // 2^53 - 1
  // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
  POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
      SQRT_BASE = 1e7,
      // EDITABLE
  // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
  // the arguments to toExponential, toFixed, toFormat, and toPrecision.
  MAX = 1E9; // 0 to MAX_INT32

  /*
   * Create and return a BigNumber constructor.
   */

  function clone(configObject) {
    var div,
        convertBase,
        parseNumeric,
        P = BigNumber.prototype = {
      constructor: BigNumber,
      toString: null,
      valueOf: null
    },
        ONE = new BigNumber(1),
        //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------
    // The default values below must be integers within the inclusive ranges stated.
    // The values can also be changed at run-time using BigNumber.set.
    // The maximum number of decimal places for operations involving division.
    DECIMAL_PLACES = 20,
        // 0 to MAX
    // The rounding mode used when rounding to the above decimal places, and when using
    // toExponential, toFixed, toFormat and toPrecision, and round (default value).
    // UP         0 Away from zero.
    // DOWN       1 Towards zero.
    // CEIL       2 Towards +Infinity.
    // FLOOR      3 Towards -Infinity.
    // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    ROUNDING_MODE = 4,
        // 0 to 8
    // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]
    // The exponent value at and beneath which toString returns exponential notation.
    // Number type: -7
    TO_EXP_NEG = -7,
        // 0 to -MAX
    // The exponent value at and above which toString returns exponential notation.
    // Number type: 21
    TO_EXP_POS = 21,
        // 0 to MAX
    // RANGE : [MIN_EXP, MAX_EXP]
    // The minimum exponent value, beneath which underflow to zero occurs.
    // Number type: -324  (5e-324)
    MIN_EXP = -1e7,
        // -1 to -MAX
    // The maximum exponent value, above which overflow to Infinity occurs.
    // Number type:  308  (1.7976931348623157e+308)
    // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
    MAX_EXP = 1e7,
        // 1 to MAX
    // Whether to use cryptographically-secure random number generation, if available.
    CRYPTO = false,
        // true or false
    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP        0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN      1 The remainder has the same sign as the dividend.
    //             This modulo mode is commonly known as 'truncated division' and is
    //             equivalent to (a % n) in JavaScript.
    // FLOOR     3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
    // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
    //             The remainder is always positive.
    //
    // The truncated division, floored division, Euclidian division and IEEE 754 remainder
    // modes are commonly used for the modulus operation.
    // Although the other rounding modes can also be used, they may not give useful results.
    MODULO_MODE = 1,
        // 0 to 9
    // The maximum number of significant digits of the result of the exponentiatedBy operation.
    // If POW_PRECISION is 0, there will be unlimited significant digits.
    POW_PRECISION = 0,
        // 0 to MAX
    // The format specification used by the BigNumber.prototype.toFormat method.
    FORMAT = {
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: '\xA0',
      // non-breaking space
      fractionGroupSize: 0
    },
        // The alphabet used for base conversion.
    // It must be at least 2 characters long, with no '.' or repeated character.
    // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
    ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'; //------------------------------------------------------------------------------------------
    // CONSTRUCTOR

    /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * n {number|string|BigNumber} A numeric value.
     * [b] {number} The base of n. Integer, 2 to ALPHABET.length inclusive.
     */

    function BigNumber(n, b) {
      var alphabet,
          c,
          caseChanged,
          e,
          i,
          isNum,
          len,
          str,
          x = this; // Enable constructor usage without new.

      if (!(x instanceof BigNumber)) {
        // Don't throw on constructor call without new (#81).
        // '[BigNumber Error] Constructor call without new: {n}'
        //throw Error(bignumberError + ' Constructor call without new: ' + n);
        return new BigNumber(n, b);
      }

      if (b == null) {
        // Duplicate.
        if (n instanceof BigNumber) {
          x.s = n.s;
          x.e = n.e;
          x.c = (n = n.c) ? n.slice() : n;
          return;
        }

        isNum = typeof n == 'number';

        if (isNum && n * 0 == 0) {
          // Use `1 / n` to handle minus zero also.
          x.s = 1 / n < 0 ? (n = -n, -1) : 1; // Faster path for integers.

          if (n === ~~n) {
            for (e = 0, i = n; i >= 10; i /= 10, e++) {
              ;
            }

            x.e = e;
            x.c = [n];
            return;
          }

          str = n + '';
        } else {
          if (!isNumeric.test(str = n + '')) return parseNumeric(x, str, isNum);
          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        } // Decimal point?


        if ((e = str.indexOf('.')) > -1) str = str.replace('.', ''); // Exponential form?

        if ((i = str.search(/e/i)) > 0) {
          // Determine exponent.
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {
          // Integer.
          e = str.length;
        }
      } else {
        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
        intCheck(b, 2, ALPHABET.length, 'Base');
        str = n + ''; // Allow exponential notation to be used with base 10 argument, while
        // also rounding to DECIMAL_PLACES as with other bases.

        if (b == 10) {
          x = new BigNumber(n instanceof BigNumber ? n : str);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }

        isNum = typeof n == 'number';

        if (isNum) {
          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
          if (n * 0 != 0) return parseNumeric(x, str, isNum, b);
          x.s = 1 / n < 0 ? (str = str.slice(1), -1) : 1; // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'

          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
            throw Error(tooManyDigits + n);
          } // Prevent later check for length on converted number.


          isNum = false;
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }

        alphabet = ALPHABET.slice(0, b);
        e = i = 0; // Check that str is a valid base b number.
        // Don't use RegExp so alphabet can contain special characters.

        for (len = str.length; i < len; i++) {
          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
            if (c == '.') {
              // If '.' is not the first character and it has not be found before.
              if (i > e) {
                e = len;
                continue;
              }
            } else if (!caseChanged) {
              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
              if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i = -1;
                e = 0;
                continue;
              }
            }

            return parseNumeric(x, n + '', isNum, b);
          }
        }

        str = convertBase(str, b, 10, x.s); // Decimal point?

        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');else e = str.length;
      } // Determine leading zeros.


      for (i = 0; str.charCodeAt(i) === 48; i++) {
        ;
      } // Determine trailing zeros.


      for (len = str.length; str.charCodeAt(--len) === 48;) {
        ;
      }

      str = str.slice(i, ++len);

      if (str) {
        len -= i; // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'

        if (isNum && BigNumber.DEBUG && len > 15 && (n > MAX_SAFE_INTEGER || n !== mathfloor(n))) {
          throw Error(tooManyDigits + x.s * n);
        }

        e = e - i - 1; // Overflow?

        if (e > MAX_EXP) {
          // Infinity.
          x.c = x.e = null; // Underflow?
        } else if (e < MIN_EXP) {
          // Zero.
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = []; // Transform base
          // e is the base 10 exponent.
          // i is where to slice str to get the first element of the coefficient array.

          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE;

          if (i < len) {
            if (i) x.c.push(+str.slice(0, i));

            for (len -= LOG_BASE; i < len;) {
              x.c.push(+str.slice(i, i += LOG_BASE));
            }

            str = str.slice(i);
            i = LOG_BASE - str.length;
          } else {
            i -= len;
          }

          for (; i--; str += '0') {
            ;
          }

          x.c.push(+str);
        }
      } else {
        // Zero.
        x.c = [x.e = 0];
      }
    } // CONSTRUCTOR PROPERTIES


    BigNumber.clone = clone;
    BigNumber.ROUND_UP = 0;
    BigNumber.ROUND_DOWN = 1;
    BigNumber.ROUND_CEIL = 2;
    BigNumber.ROUND_FLOOR = 3;
    BigNumber.ROUND_HALF_UP = 4;
    BigNumber.ROUND_HALF_DOWN = 5;
    BigNumber.ROUND_HALF_EVEN = 6;
    BigNumber.ROUND_HALF_CEIL = 7;
    BigNumber.ROUND_HALF_FLOOR = 8;
    BigNumber.EUCLID = 9;
    /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *      decimalSeparator       {string}
     *      groupSeparator         {string}
     *      groupSize              {number}
     *      secondaryGroupSize     {number}
     *      fractionGroupSeparator {string}
     *      fractionGroupSize      {number}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */

    BigNumber.config = BigNumber.set = function (obj) {
      var p, v;

      if (obj != null) {
        if (typeof obj == 'object') {
          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          } // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          } // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or
          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
            v = obj[p];

            if (isArray(v)) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          } // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'


          if (obj.hasOwnProperty(p = 'RANGE')) {
            v = obj[p];

            if (isArray(v)) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);

              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error(bignumberError + p + ' cannot be zero: ' + v);
              }
            }
          } // CRYPTO {boolean} true or false.
          // '[BigNumber Error] CRYPTO not true or false: {v}'
          // '[BigNumber Error] crypto unavailable'


          if (obj.hasOwnProperty(p = 'CRYPTO')) {
            v = obj[p];

            if (v === !!v) {
              if (v) {
                if (typeof crypto != 'undefined' && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error(bignumberError + 'crypto unavailable');
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error(bignumberError + p + ' not true or false: ' + v);
            }
          } // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          } // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'


          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          } // FORMAT {object}
          // '[BigNumber Error] FORMAT not an object: {v}'


          if (obj.hasOwnProperty(p = 'FORMAT')) {
            v = obj[p];
            if (typeof v == 'object') FORMAT = v;else throw Error(bignumberError + p + ' not an object: ' + v);
          } // ALPHABET {string}
          // '[BigNumber Error] ALPHABET invalid: {v}'


          if (obj.hasOwnProperty(p = 'ALPHABET')) {
            v = obj[p]; // Disallow if only one character, or contains '.' or a repeated character.

            if (typeof v == 'string' && !/^.$|\.|(.).*\1/.test(v)) {
              ALPHABET = v;
            } else {
              throw Error(bignumberError + p + ' invalid: ' + v);
            }
          }
        } else {
          // '[BigNumber Error] Object expected: {v}'
          throw Error(bignumberError + 'Object expected: ' + obj);
        }
      }

      return {
        DECIMAL_PLACES: DECIMAL_PLACES,
        ROUNDING_MODE: ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO: CRYPTO,
        MODULO_MODE: MODULO_MODE,
        POW_PRECISION: POW_PRECISION,
        FORMAT: FORMAT,
        ALPHABET: ALPHABET
      };
    };
    /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * v {any}
     */


    BigNumber.isBigNumber = function (v) {
      return v instanceof BigNumber || v && v._isBigNumber === true || false;
    };
    /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */


    BigNumber.maximum = BigNumber.max = function () {
      return maxOrMin(arguments, P.lt);
    };
    /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */


    BigNumber.minimum = BigNumber.min = function () {
      return maxOrMin(arguments, P.gt);
    };
    /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */


    BigNumber.random = function () {
      var pow2_53 = 0x20000000000000; // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
      // Check if Math.random() produces more than 32 bits of randomness.
      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.

      var random53bitInt = Math.random() * pow2_53 & 0x1fffff ? function () {
        return mathfloor(Math.random() * pow2_53);
      } : function () {
        return (Math.random() * 0x40000000 | 0) * 0x800000 + (Math.random() * 0x800000 | 0);
      };
      return function (dp) {
        var a,
            b,
            e,
            k,
            v,
            i = 0,
            c = [],
            rand = new BigNumber(ONE);
        if (dp == null) dp = DECIMAL_PLACES;else intCheck(dp, 0, MAX);
        k = mathceil(dp / LOG_BASE);

        if (CRYPTO) {
          // Browsers supporting crypto.getRandomValues.
          if (crypto.getRandomValues) {
            a = crypto.getRandomValues(new Uint32Array(k *= 2));

            for (; i < k;) {
              // 53 bits:
              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
              //                                     11111 11111111 11111111
              // 0x20000 is 2^21.
              v = a[i] * 0x20000 + (a[i + 1] >>> 11); // Rejection sampling:
              // 0 <= v < 9007199254740992
              // Probability that v >= 9e15, is
              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251

              if (v >= 9e15) {
                b = crypto.getRandomValues(new Uint32Array(2));
                a[i] = b[0];
                a[i + 1] = b[1];
              } else {
                // 0 <= v <= 8999999999999999
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 2;
              }
            }

            i = k / 2; // Node.js supporting crypto.randomBytes.
          } else if (crypto.randomBytes) {
            // buffer
            a = crypto.randomBytes(k *= 7);

            for (; i < k;) {
              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
              // 0x100000000 is 2^32, 0x1000000 is 2^24
              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
              // 0 <= v < 9007199254740992
              v = (a[i] & 31) * 0x1000000000000 + a[i + 1] * 0x10000000000 + a[i + 2] * 0x100000000 + a[i + 3] * 0x1000000 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

              if (v >= 9e15) {
                crypto.randomBytes(7).copy(a, i);
              } else {
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 7;
              }
            }

            i = k / 7;
          } else {
            CRYPTO = false;
            throw Error(bignumberError + 'crypto unavailable');
          }
        } // Use Math.random.


        if (!CRYPTO) {
          for (; i < k;) {
            v = random53bitInt();
            if (v < 9e15) c[i++] = v % 1e14;
          }
        }

        k = c[--i];
        dp %= LOG_BASE; // Convert trailing digits to zeros according to dp.

        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i] = mathfloor(k / v) * v;
        } // Remove trailing elements which are zero.


        for (; c[i] === 0; c.pop(), i--) {
          ;
        } // Zero?


        if (i < 0) {
          c = [e = 0];
        } else {
          // Remove leading elements which are zero and adjust exponent accordingly.
          for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE) {
            ;
          } // Count the digits of the first element of c to determine leading zeros, and...


          for (i = 1, v = c[0]; v >= 10; v /= 10, i++) {
            ;
          } // adjust the exponent accordingly.


          if (i < LOG_BASE) e -= LOG_BASE - i;
        }

        rand.e = e;
        rand.c = c;
        return rand;
      };
    }(); // PRIVATE FUNCTIONS
    // Called by BigNumber and BigNumber.prototype.toString.


    convertBase = function () {
      var decimal = '0123456789';
      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */

      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j,
            arr = [0],
            arrL,
            i = 0,
            len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) {
            ;
          }

          arr[0] += alphabet.indexOf(str.charAt(i++));

          for (j = 0; j < arr.length; j++) {
            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      } // Convert a numeric string of baseIn to a numeric string of baseOut.
      // If the caller is toString, we are converting from base 10 to baseOut.
      // If the caller is BigNumber, we are converting from baseIn to base 10.


      return function (str, baseIn, baseOut, sign, callerIsToString) {
        var alphabet,
            d,
            e,
            k,
            r,
            x,
            xc,
            y,
            i = str.indexOf('.'),
            dp = DECIMAL_PLACES,
            rm = ROUNDING_MODE; // Non-integer.

        if (i >= 0) {
          k = POW_PRECISION; // Unlimited precision.

          POW_PRECISION = 0;
          str = str.replace('.', '');
          y = new BigNumber(baseIn);
          x = y.pow(str.length - i);
          POW_PRECISION = k; // Convert str as if an integer, then restore the fraction part by dividing the
          // result by its base raised to a power.

          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'), 10, baseOut, decimal);
          y.e = y.c.length;
        } // Convert the number as integer.


        xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET)); // xc now represents str as an integer and converted to baseOut. e is the exponent.

        e = k = xc.length; // Remove trailing zeros.

        for (; xc[--k] == 0; xc.pop()) {
          ;
        } // Zero?


        if (!xc[0]) return alphabet.charAt(0); // Does str represent an integer? If so, no need for the division.

        if (i < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e; // The sign is needed for correct rounding.

          x.s = sign;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        } // xc now represents str converted to baseOut.
        // THe index of the rounding digit.


        d = e + dp + 1; // The rounding digit: the digit to the right of the digit that may be rounded up.

        i = xc[d]; // Look at the rounding digits and mode to determine whether to round up.

        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;
        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7)); // If the index of the rounding digit is not greater than zero, or xc represents
        // zero, then the result of the base conversion is zero or, if rounding up, a value
        // such as 0.00001.

        if (d < 1 || !xc[0]) {
          // 1^-dp or 0
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
        } else {
          // Truncate xc to the required number of decimal places.
          xc.length = d; // Round up?

          if (r) {
            // Rounding up may mean the previous digit has to be rounded up and so on.
            for (--baseOut; ++xc[--d] > baseOut;) {
              xc[d] = 0;

              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          } // Determine trailing zeros.


          for (k = xc.length; !xc[--k];) {
            ;
          } // E.g. [4, 11, 15] becomes 4bf.


          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++])) {
            ;
          } // Add leading zeros, decimal point and trailing zeros as required.


          str = toFixedPoint(str, e, alphabet.charAt(0));
        } // The caller will add the sign.


        return str;
      };
    }(); // Perform division in the specified base. Called by div and convertBase.


    div = function () {
      // Assume non-zero x and k.
      function multiply(x, k, base) {
        var m,
            temp,
            xlo,
            xhi,
            carry = 0,
            i = x.length,
            klo = k % SQRT_BASE,
            khi = k / SQRT_BASE | 0;

        for (x = x.slice(); i--;) {
          xlo = x[i] % SQRT_BASE;
          xhi = x[i] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i] = temp % base;
        }

        if (carry) x = [carry].concat(x);
        return x;
      }

      function compare(a, b, aL, bL) {
        var i, cmp;

        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {
          for (i = cmp = 0; i < aL; i++) {
            if (a[i] != b[i]) {
              cmp = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }

        return cmp;
      }

      function subtract(a, b, aL, base) {
        var i = 0; // Subtract b from a.

        for (; aL--;) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        } // Remove leading zeros.


        for (; !a[0] && a.length > 1; a.splice(0, 1)) {
          ;
        }
      } // x: dividend, y: divisor.


      return function (x, y, dp, rm, base) {
        var cmp,
            e,
            i,
            more,
            n,
            prod,
            prodL,
            q,
            qc,
            rem,
            remL,
            rem0,
            xi,
            xL,
            yc0,
            yL,
            yz,
            s = x.s == y.s ? 1 : -1,
            xc = x.c,
            yc = y.c; // Either NaN, Infinity or 0?

        if (!xc || !xc[0] || !yc || !yc[0]) {
          return new BigNumber( // Return NaN if either NaN, or both Infinity or 0.
          !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : // Return 卤0 if x is 卤0 or y is 卤Infinity, or return 卤Infinity as y is 卤0.
          xc && xc[0] == 0 || !yc ? s * 0 : s / 0);
        }

        q = new BigNumber(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;

        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        } // Result exponent may be one less then the current value of e.
        // The coefficients of the BigNumbers from convertBase may have trailing zeros.


        for (i = 0; yc[i] == (xc[i] || 0); i++) {
          ;
        }

        if (yc[i] > (xc[i] || 0)) e--;

        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i = 0;
          s += 2; // Normalise xc and yc so highest order digit of yc is >= base / 2.

          n = mathfloor(base / (yc[0] + 1)); // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {

          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }

          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length; // Add zeros to make remainder as long as divisor.

          for (; remL < yL; rem[remL++] = 0) {
            ;
          }

          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2) yc0++; // Not necessary, but to prevent trial digit n > base, when using base 3.
          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

          do {
            n = 0; // Compare divisor and remainder.

            cmp = compare(yc, rem, yL, remL); // If divisor < remainder.

            if (cmp < 0) {
              // Calculate trial digit, n.
              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0); // n is how many times the divisor goes into the current remainder.

              n = mathfloor(rem0 / yc0); //  Algorithm:
              //  product = divisor multiplied by trial digit (n).
              //  Compare product and remainder.
              //  If product is greater than remainder:
              //    Subtract divisor from product, decrement trial digit.
              //  Subtract product from remainder.
              //  If product was less than remainder at the last compare:
              //    Compare new remainder and divisor.
              //    If remainder is greater than divisor:
              //      Subtract divisor from remainder, increment trial digit.

              if (n > 1) {
                // n may be > base only when base is 3.
                if (n >= base) n = base - 1; // product = divisor * trial digit.

                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length; // Compare product and remainder.
                // If product > remainder then trial digit n too high.
                // n is 1 too high about 5% of the time, and is not known to have
                // ever been more than 1 too high.

                while (compare(prod, rem, prodL, remL) == 1) {
                  n--; // Subtract divisor from product.

                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {
                // n is 0 or 1, cmp is -1.
                // If n is 0, there is no need to compare yc and rem again below,
                // so change cmp to 1 to avoid it.
                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                if (n == 0) {
                  // divisor < remainder, so n must be at least 1.
                  cmp = n = 1;
                } // product = divisor


                prod = yc.slice();
                prodL = prod.length;
              }

              if (prodL < remL) prod = [0].concat(prod); // Subtract product from remainder.

              subtract(rem, prod, remL, base);
              remL = rem.length; // If product was < remainder.

              if (cmp == -1) {
                // Compare divisor and new remainder.
                // If divisor < new remainder, subtract divisor from remainder.
                // Trial digit n too low.
                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                while (compare(yc, rem, yL, remL) < 1) {
                  n++; // Subtract divisor from remainder.

                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            } // else cmp === 1 and n will be 0
            // Add the next digit, n, to the result array.


            qc[i++] = n; // Update the remainder.

            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);

          more = rem[0] != null; // Leading zero?

          if (!qc[0]) qc.splice(0, 1);
        }

        if (base == BASE) {
          // To calculate q.e, first get the number of digits of qc[0].
          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) {
            ;
          }

          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more); // Caller is convertBase.
        } else {
          q.e = e;
          q.r = +more;
        }

        return q;
      };
    }();
    /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */


    function format(n, i, rm, id) {
      var c0, e, ne, len, str;
      if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
      if (!n.c) return n.toString();
      c0 = n.c[0];
      ne = n.e;

      if (i == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && ne <= TO_EXP_NEG ? toExponential(str, ne) : toFixedPoint(str, ne, '0');
      } else {
        n = round(new BigNumber(n), i, rm); // n.e may have changed if the value was rounded up.

        e = n.e;
        str = coeffToString(n.c);
        len = str.length; // toPrecision returns exponential notation if the number of significant digits
        // specified is less than the number of digits necessary to represent the integer
        // part of the value in fixed-point notation.
        // Exponential notation.

        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
          // Append zeros?
          for (; len < i; str += '0', len++) {
            ;
          }

          str = toExponential(str, e); // Fixed-point notation.
        } else {
          i -= ne;
          str = toFixedPoint(str, e, '0'); // Append zeros?

          if (e + 1 > len) {
            if (--i > 0) for (str += '.'; i--; str += '0') {
              ;
            }
          } else {
            i += e - len;

            if (i > 0) {
              if (e + 1 == len) str += '.';

              for (; i--; str += '0') {
                ;
              }
            }
          }
        }
      }

      return n.s < 0 && c0 ? '-' + str : str;
    } // Handle BigNumber.max and BigNumber.min.


    function maxOrMin(args, method) {
      var m,
          n,
          i = 0;
      if (isArray(args[0])) args = args[0];
      m = new BigNumber(args[0]);

      for (; ++i < args.length;) {
        n = new BigNumber(args[i]); // If any number is NaN, return NaN.

        if (!n.s) {
          m = n;
          break;
        } else if (method.call(m, n)) {
          m = n;
        }
      }

      return m;
    }
    /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */


    function normalise(n, c, e) {
      var i = 1,
          j = c.length; // Remove trailing zeros.

      for (; !c[--j]; c.pop()) {
        ;
      } // Calculate the base 10 exponent. First get the number of digits of c[0].


      for (j = c[0]; j >= 10; j /= 10, i++) {
        ;
      } // Overflow?


      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
        // Infinity.
        n.c = n.e = null; // Underflow?
      } else if (e < MIN_EXP) {
        // Zero.
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }

      return n;
    } // Handle values that fail the validity test in BigNumber.


    parseNumeric = function () {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
          dotAfter = /^([^.]+)\.$/,
          dotBefore = /^\.([^.]+)$/,
          isInfinityOrNaN = /^-?(Infinity|NaN)$/,
          whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
      return function (x, str, isNum, b) {
        var base,
            s = isNum ? str : str.replace(whitespaceOrPlus, ''); // No exception on 卤Infinity or NaN.

        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
          x.c = x.e = null;
        } else {
          if (!isNum) {
            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
            s = s.replace(basePrefix, function (m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
              return !b || b == base ? p1 : m;
            });

            if (b) {
              base = b; // E.g. '1.' to '1', '.1' to '0.1'

              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
            }

            if (str != s) return new BigNumber(s, base);
          } // '[BigNumber Error] Not a number: {n}'
          // '[BigNumber Error] Not a base {b} number: {n}'


          if (BigNumber.DEBUG) {
            throw Error(bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
          } // NaN


          x.c = x.e = x.s = null;
        }
      };
    }();
    /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */


    function round(x, sd, rm, r) {
      var d,
          i,
          j,
          k,
          n,
          ni,
          rd,
          xc = x.c,
          pows10 = POWS_TEN; // if x is not Infinity or NaN...

      if (xc) {
        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
        // n is a base 1e14 number, the value of the element of array x.c containing rd.
        // ni is the index of n within x.c.
        // d is the number of digits of n.
        // i is the index of rd within n including leading zeros.
        // j is the actual index of rd within n (if < 0, rd is a leading zero).
        out: {
          // Get the number of digits of the first element of xc.
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++) {
            ;
          }

          i = sd - d; // If the rounding digit is in the first element of xc...

          if (i < 0) {
            i += LOG_BASE;
            j = sd;
            n = xc[ni = 0]; // Get the rounding digit at index j of n.

            rd = n / pows10[d - j - 1] % 10 | 0;
          } else {
            ni = mathceil((i + 1) / LOG_BASE);

            if (ni >= xc.length) {
              if (r) {
                // Needed by sqrt.
                for (; xc.length <= ni; xc.push(0)) {
                  ;
                }

                n = rd = 0;
                d = 1;
                i %= LOG_BASE;
                j = i - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni]; // Get the number of digits of n.

              for (d = 1; k >= 10; k /= 10, d++) {
                ;
              } // Get the index of rd within n.


              i %= LOG_BASE; // Get the index of rd within n, adjusted for leading zeros.
              // The number of leading zeros of n is given by LOG_BASE - d.

              j = i - LOG_BASE + d; // Get the rounding digit at index j of n.

              rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
            }
          }

          r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
          xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
          r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
          (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));

          if (sd < 1 || !xc[0]) {
            xc.length = 0;

            if (r) {
              // Convert sd to decimal places.
              sd -= x.e + 1; // 1, 0.1, 0.01, 0.001, 0.0001 etc.

              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {
              // Zero.
              xc[0] = x.e = 0;
            }

            return x;
          } // Remove excess digits.


          if (i == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i]; // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of n.

            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          } // Round up?


          if (r) {
            for (;;) {
              // If the digit to be rounded up is in the first element of xc...
              if (ni == 0) {
                // i will be the length of xc[0] before k is added.
                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++) {
                  ;
                }

                j = xc[0] += k;

                for (k = 1; j >= 10; j /= 10, k++) {
                  ;
                } // if i != k the length has increased.


                if (i != k) {
                  x.e++;
                  if (xc[0] == BASE) xc[0] = 1;
                }

                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE) break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          } // Remove trailing zeros.


          for (i = xc.length; xc[--i] === 0; xc.pop()) {
            ;
          }
        } // Overflow? Infinity.


        if (x.e > MAX_EXP) {
          x.c = x.e = null; // Underflow? Zero.
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }

      return x;
    } // PROTOTYPE/INSTANCE METHODS

    /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */


    P.absoluteValue = P.abs = function () {
      var x = new BigNumber(this);
      if (x.s < 0) x.s = 1;
      return x;
    };
    /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */


    P.comparedTo = function (y, b) {
      return compare(this, new BigNumber(y, b));
    };
    /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is 卤Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */


    P.decimalPlaces = P.dp = function (dp, rm) {
      var c,
          n,
          v,
          x = this;

      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
        return round(new BigNumber(x), dp + x.e + 1, rm);
      }

      if (!(c = x.c)) return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE; // Subtract the number of trailing zeros of the last number.

      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--) {
        ;
      }
      if (n < 0) n = 0;
      return n;
    };
    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */


    P.dividedBy = P.div = function (y, b) {
      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };
    /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */


    P.dividedToIntegerBy = P.idiv = function (y, b) {
      return div(this, new BigNumber(y, b), 0, 1);
    };
    /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */


    P.exponentiatedBy = P.pow = function (n, m) {
      var half,
          isModExp,
          k,
          more,
          nIsBig,
          nIsNeg,
          nIsOdd,
          y,
          x = this;
      n = new BigNumber(n); // Allow NaN and 卤Infinity, but not other non-integers.

      if (n.c && !n.isInteger()) {
        throw Error(bignumberError + 'Exponent not an integer: ' + n);
      }

      if (m != null) m = new BigNumber(m); // Exponent of MAX_SAFE_INTEGER is 15.

      nIsBig = n.e > 14; // If x is NaN, 卤Infinity, 卤0 or 卤1, or n is 卤Infinity, NaN or 卤0.

      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
        // The sign of the result of pow when x is negative depends on the evenness of n.
        // If +n overflows to 卤Infinity, the evenness of n would be not be known.
        y = new BigNumber(Math.pow(+x.valueOf(), nIsBig ? 2 - isOdd(n) : +n));
        return m ? y.mod(m) : y;
      }

      nIsNeg = n.s < 0;

      if (m) {
        // x % m returns NaN if abs(m) is zero, or m is NaN.
        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);
        isModExp = !nIsNeg && x.isInteger() && m.isInteger();
        if (isModExp) x = x.mod(m); // Overflow to 卤Infinity: >=2**1e10 or >=1.0000024**1e15.
        // Underflow to 卤0: <=0.79**1e10 or <=0.9999975**1e15.
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 // [1, 240000000]
      ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 // [80000000000000]  [99999750000000]
      : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
        // If x is negative and n is odd, k = -0, else k = 0.
        k = x.s < 0 && isOdd(n) ? -0 : 0; // If x >= 1, k = 卤Infinity.

        if (x.e > -1) k = 1 / k; // If n is negative return 卤0, else return 卤Infinity.

        return new BigNumber(nIsNeg ? 1 / k : k);
      } else if (POW_PRECISION) {
        // Truncating each coefficient array to a length of k after each multiplication
        // equates to truncating significant digits to POW_PRECISION + [28, 41],
        // i.e. there will be a minimum of 28 guard digits retained.
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }

      if (nIsBig) {
        half = new BigNumber(0.5);
        nIsOdd = isOdd(n);
      } else {
        nIsOdd = n % 2;
      }

      if (nIsNeg) n.s = 1;
      y = new BigNumber(ONE); // Performs 54 loop iterations for n of 9007199254740991.

      for (;;) {
        if (nIsOdd) {
          y = y.times(x);
          if (!y.c) break;

          if (k) {
            if (y.c.length > k) y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m); //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
          }
        }

        if (nIsBig) {
          n = n.times(half);
          round(n, n.e + 1, 1);
          if (!n.c[0]) break;
          nIsBig = n.e > 14;
          nIsOdd = isOdd(n);
        } else {
          n = mathfloor(n / 2);
          if (!n) break;
          nIsOdd = n % 2;
        }

        x = x.times(x);

        if (k) {
          if (x.c && x.c.length > k) x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m); //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
        }
      }

      if (isModExp) return y;
      if (nIsNeg) y = ONE.div(y);
      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };
    /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */


    P.integerValue = function (rm) {
      var n = new BigNumber(this);
      if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };
    /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */


    P.isEqualTo = P.eq = function (y, b) {
      return compare(this, new BigNumber(y, b)) === 0;
    };
    /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */


    P.isFinite = function () {
      return !!this.c;
    };
    /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */


    P.isGreaterThan = P.gt = function (y, b) {
      return compare(this, new BigNumber(y, b)) > 0;
    };
    /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */


    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;
    };
    /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */


    P.isInteger = function () {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };
    /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */


    P.isLessThan = P.lt = function (y, b) {
      return compare(this, new BigNumber(y, b)) < 0;
    };
    /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */


    P.isLessThanOrEqualTo = P.lte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
    };
    /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */


    P.isNaN = function () {
      return !this.s;
    };
    /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */


    P.isNegative = function () {
      return this.s < 0;
    };
    /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */


    P.isPositive = function () {
      return this.s > 0;
    };
    /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */


    P.isZero = function () {
      return !!this.c && this.c[0] == 0;
    };
    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */


    P.minus = function (y, b) {
      var i,
          j,
          t,
          xLTy,
          x = this,
          a = x.s;
      y = new BigNumber(y, b);
      b = y.s; // Either NaN?

      if (!a || !b) return new BigNumber(NaN); // Signs differ?

      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }

      var xe = x.e / LOG_BASE,
          ye = y.e / LOG_BASE,
          xc = x.c,
          yc = y.c;

      if (!xe || !ye) {
        // Either Infinity?
        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN); // Either zero?

        if (!xc[0] || !yc[0]) {
          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x : // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          ROUNDING_MODE == 3 ? -0 : 0);
        }
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice(); // Determine which is the bigger number.

      if (a = xe - ye) {
        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }

        t.reverse(); // Prepend zeros to equalise exponents.

        for (b = a; b--; t.push(0)) {
          ;
        }

        t.reverse();
      } else {
        // Exponents equal. Check digit by digit.
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

        for (a = b = 0; b < j; b++) {
          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      } // x < y? Point xc to the array of the bigger number.


      if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;
      b = (j = yc.length) - (i = xc.length); // Append zeros to xc if shorter.
      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.

      if (b > 0) for (; b--; xc[i++] = 0) {
        ;
      }
      b = BASE - 1; // Subtract yc from xc.

      for (; j > a;) {
        if (xc[--j] < yc[j]) {
          for (i = j; i && !xc[--i]; xc[i] = b) {
            ;
          }

          --xc[i];
          xc[j] += BASE;
        }

        xc[j] -= yc[j];
      } // Remove leading zeros and adjust exponent accordingly.


      for (; xc[0] == 0; xc.splice(0, 1), --ye) {
        ;
      } // Zero?


      if (!xc[0]) {
        // Following IEEE 754 (2008) 6.3,
        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      } // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
      // for finite x and y.


      return normalise(y, xc, ye);
    };
    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */


    P.modulo = P.mod = function (y, b) {
      var q,
          s,
          x = this;
      y = new BigNumber(y, b); // Return NaN if x is Infinity or NaN, or y is NaN or zero.

      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber(NaN); // Return x if y is Infinity or x is zero.
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber(x);
      }

      if (MODULO_MODE == 9) {
        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // r = x - qy    where  0 <= r < abs(y)
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }

      y = x.minus(q.times(y)); // To match JavaScript %, ensure sign of zero is sign of dividend.

      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;
      return y;
    };
    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */


    P.multipliedBy = P.times = function (y, b) {
      var c,
          e,
          i,
          j,
          k,
          m,
          xcL,
          xlo,
          xhi,
          ycL,
          ylo,
          yhi,
          zc,
          base,
          sqrtBase,
          x = this,
          xc = x.c,
          yc = (y = new BigNumber(y, b)).c; // Either NaN, 卤Infinity or 卤0?

      if (!xc || !yc || !xc[0] || !yc[0]) {
        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s; // Return 卤Infinity if either is 卤Infinity.

          if (!xc || !yc) {
            y.c = y.e = null; // Return 卤0 if either is 卤0.
          } else {
            y.c = [0];
            y.e = 0;
          }
        }

        return y;
      }

      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length; // Ensure xc points to longer array and xcL to its length.

      if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i; // Initialise the result array with zeros.

      for (i = xcL + ycL, zc = []; i--; zc.push(0)) {
        ;
      }

      base = BASE;
      sqrtBase = SQRT_BASE;

      for (i = ycL; --i >= 0;) {
        c = 0;
        ylo = yc[i] % sqrtBase;
        yhi = yc[i] / sqrtBase | 0;

        for (k = xcL, j = i + k; j > i;) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }

        zc[j] = c;
      }

      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }

      return normalise(y, zc, e);
    };
    /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */


    P.negated = function () {
      var x = new BigNumber(this);
      x.s = -x.s || null;
      return x;
    };
    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */


    P.plus = function (y, b) {
      var t,
          x = this,
          a = x.s;
      y = new BigNumber(y, b);
      b = y.s; // Either NaN?

      if (!a || !b) return new BigNumber(NaN); // Signs differ?

      if (a != b) {
        y.s = -b;
        return x.minus(y);
      }

      var xe = x.e / LOG_BASE,
          ye = y.e / LOG_BASE,
          xc = x.c,
          yc = y.c;

      if (!xe || !ye) {
        // Return 卤Infinity if either 卤Infinity.
        if (!xc || !yc) return new BigNumber(a / 0); // Either zero?
        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.

        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice(); // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.

      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }

        t.reverse();

        for (; a--; t.push(0)) {
          ;
        }

        t.reverse();
      }

      a = xc.length;
      b = yc.length; // Point xc to the longer array, and b to the shorter length.

      if (a - b < 0) t = yc, yc = xc, xc = t, b = a; // Only start adding at yc.length - 1 as the further digits of xc can be ignored.

      for (a = 0; b;) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }

      if (a) {
        xc = [a].concat(xc);
        ++ye;
      } // No need to check for zero, as +x + +y != 0 && -x + -y != 0
      // ye = MAX_EXP + 1 possible


      return normalise(y, xc, ye);
    };
    /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is 卤Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */


    P.precision = P.sd = function (sd, rm) {
      var c,
          n,
          v,
          x = this;

      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null) rm = ROUNDING_MODE;else intCheck(rm, 0, 8);
        return round(new BigNumber(x), sd, rm);
      }

      if (!(c = x.c)) return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;

      if (v = c[v]) {
        // Subtract the number of trailing zeros of the last element.
        for (; v % 10 == 0; v /= 10, n--) {
          ;
        } // Add the number of digits of the first element.


        for (v = c[0]; v >= 10; v /= 10, n++) {
          ;
        }
      }

      if (sd && x.e + 1 > n) n = x.e + 1;
      return n;
    };
    /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */


    P.shiftedBy = function (k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times('1e' + k);
    };
    /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */


    P.squareRoot = P.sqrt = function () {
      var m,
          n,
          r,
          rep,
          t,
          x = this,
          c = x.c,
          s = x.s,
          e = x.e,
          dp = DECIMAL_PLACES + 4,
          half = new BigNumber('0.5'); // Negative/NaN/Infinity/zero?

      if (s !== 1 || !c || !c[0]) {
        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      } // Initial estimate.


      s = Math.sqrt(+x); // Math.sqrt underflow/overflow?
      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.

      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0) n += '0';
        s = Math.sqrt(n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

        if (s == 1 / 0) {
          n = '1e' + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf('e') + 1) + e;
        }

        r = new BigNumber(n);
      } else {
        r = new BigNumber(s + '');
      } // Check for zero.
      // r could be zero if MIN_EXP is changed after the this value was created.
      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
      // coeffToString to throw.


      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3) s = 0; // Newton-Raphson iteration.

        for (;;) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));

          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
            // The exponent of r may here be one less than the final result exponent,
            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
            // are indexed correctly.
            if (r.e < e) --s;
            n = n.slice(s - 3, s + 1); // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
            // iteration.

            if (n == '9999' || !rep && n == '4999') {
              // On the first iteration only, check to see if rounding up gives the
              // exact result as the nines may infinitely repeat.
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);

                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }

              dp += 4;
              s += 4;
              rep = 1;
            } else {
              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
              // result. If not, then there are further digits and m will be truthy.
              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
                // Truncate to the first rounding digit.
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }

              break;
            }
          }
        }
      }

      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };
    /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */


    P.toExponential = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }

      return format(this, dp, rm, 1);
    };
    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */


    P.toFixed = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }

      return format(this, dp, rm);
    };
    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the FORMAT object (see BigNumber.set).
     *
     * FORMAT = {
     *      decimalSeparator : '.',
     *      groupSeparator : ',',
     *      groupSize : 3,
     *      secondaryGroupSize : 0,
     *      fractionGroupSeparator : '\xA0',    // non-breaking space
     *      fractionGroupSize : 0
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */


    P.toFormat = function (dp, rm) {
      var str = this.toFixed(dp, rm);

      if (this.c) {
        var i,
            arr = str.split('.'),
            g1 = +FORMAT.groupSize,
            g2 = +FORMAT.secondaryGroupSize,
            groupSeparator = FORMAT.groupSeparator,
            intPart = arr[0],
            fractionPart = arr[1],
            isNeg = this.s < 0,
            intDigits = isNeg ? intPart.slice(1) : intPart,
            len = intDigits.length;
        if (g2) i = g1, g1 = g2, g2 = i, len -= i;

        if (g1 > 0 && len > 0) {
          i = len % g1 || g1;
          intPart = intDigits.substr(0, i);

          for (; i < len; i += g1) {
            intPart += groupSeparator + intDigits.substr(i, g1);
          }

          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
          if (isNeg) intPart = '-' + intPart;
        }

        str = fractionPart ? intPart + FORMAT.decimalSeparator + ((g2 = +FORMAT.fractionGroupSize) ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'), '$&' + FORMAT.fractionGroupSeparator) : fractionPart) : intPart;
      }

      return str;
    };
    /*
     * Return a string array representing the value of this BigNumber as a simple fraction with
     * an integer numerator and an integer denominator. The denominator will be a positive
     * non-zero value less than or equal to the specified maximum denominator. If a maximum
     * denominator is not specified, the denominator will be the lowest value necessary to
     * represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */


    P.toFraction = function (md) {
      var arr,
          d,
          d0,
          d1,
          d2,
          e,
          exp,
          n,
          n0,
          n1,
          q,
          s,
          x = this,
          xc = x.c;

      if (md != null) {
        n = new BigNumber(md); // Throw if md is less than one or is not an integer, unless it is Infinity.

        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error(bignumberError + 'Argument ' + (n.isInteger() ? 'out of range: ' : 'not an integer: ') + md);
        }
      }

      if (!xc) return x.toString();
      d = new BigNumber(ONE);
      n1 = d0 = new BigNumber(ONE);
      d1 = n0 = new BigNumber(ONE);
      s = coeffToString(xc); // Determine initial denominator.
      // d is a power of 10 and the minimum max denominator that specifies the value exactly.

      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber(s); // n0 = d1 = 0

      n0.c[0] = 0;

      for (;;) {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1) break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }

      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e *= 2; // Determine which fraction is closer to x, n0/d0 or n1/d1

      arr = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1.toString(), d1.toString()] : [n0.toString(), d0.toString()];
      MAX_EXP = exp;
      return arr;
    };
    /*
     * Return the value of this BigNumber converted to a number primitive.
     */


    P.toNumber = function () {
      return +this;
    };
    /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */


    P.toPrecision = function (sd, rm) {
      if (sd != null) intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };
    /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */


    P.toString = function (b) {
      var str,
          n = this,
          s = n.s,
          e = n.e; // Infinity or NaN?

      if (e === null) {
        if (s) {
          str = 'Infinity';
          if (s < 0) str = '-' + str;
        } else {
          str = 'NaN';
        }
      } else {
        str = coeffToString(n.c);

        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, '0');
        } else {
          intCheck(b, 2, ALPHABET.length, 'Base');
          str = convertBase(toFixedPoint(str, e, '0'), 10, b, s, true);
        }

        if (s < 0 && n.c[0]) str = '-' + str;
      }

      return str;
    };
    /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */


    P.valueOf = P.toJSON = function () {
      var str,
          n = this,
          e = n.e;
      if (e === null) return n.toString();
      str = coeffToString(n.c);
      str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, '0');
      return n.s < 0 ? '-' + str : str;
    };

    P._isBigNumber = true;
    if (configObject != null) BigNumber.set(configObject);
    return BigNumber;
  } // PRIVATE HELPER FUNCTIONS


  function bitFloor(n) {
    var i = n | 0;
    return n > 0 || n === i ? i : i - 1;
  } // Return a coefficient array as a string of base 10 digits.


  function coeffToString(a) {
    var s,
        z,
        i = 1,
        j = a.length,
        r = a[0] + '';

    for (; i < j;) {
      s = a[i++] + '';
      z = LOG_BASE - s.length;

      for (; z--; s = '0' + s) {
        ;
      }

      r += s;
    } // Determine trailing zeros.


    for (j = r.length; r.charCodeAt(--j) === 48;) {
      ;
    }

    return r.slice(0, j + 1 || 1);
  } // Compare the value of BigNumbers x and y.


  function compare(x, y) {
    var a,
        b,
        xc = x.c,
        yc = y.c,
        i = x.s,
        j = y.s,
        k = x.e,
        l = y.e; // Either NaN?

    if (!i || !j) return null;
    a = xc && !xc[0];
    b = yc && !yc[0]; // Either zero?

    if (a || b) return a ? b ? 0 : -j : i; // Signs differ?

    if (i != j) return i;
    a = i < 0;
    b = k == l; // Either Infinity?

    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1; // Compare exponents.

    if (!b) return k > l ^ a ? 1 : -1;
    j = (k = xc.length) < (l = yc.length) ? k : l; // Compare digit by digit.

    for (i = 0; i < j; i++) {
      if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
    } // Compare lengths.


    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }
  /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */


  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== (n < 0 ? mathceil(n) : mathfloor(n))) {
      throw Error(bignumberError + (name || 'Argument') + (typeof n == 'number' ? n < min || n > max ? ' out of range: ' : ' not an integer: ' : ' not a primitive number: ') + n);
    }
  }

  function isArray(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
  } // Assumes finite n.


  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }

  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) + (e < 0 ? 'e' : 'e+') + e;
  }

  function toFixedPoint(str, e, z) {
    var len, zs; // Negative exponent?

    if (e < 0) {
      // Prepend zeros.
      for (zs = z + '.'; ++e; zs += z) {
        ;
      }

      str = zs + str; // Positive exponent
    } else {
      len = str.length; // Append zeros.

      if (++e > len) {
        for (zs = z, e -= len; --e; zs += z) {
          ;
        }

        str += zs;
      } else if (e < len) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    return str;
  } // EXPORT


  BigNumber = clone();
  BigNumber['default'] = BigNumber.BigNumber = BigNumber; // AMD.

  if (typeof define == 'function' && define.amd) {
    define(function () {
      return BigNumber;
    }); // Node.js and other environments that support module.exports.
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = BigNumber; // Browser.
  } else {
    if (!globalObject) {
      globalObject = typeof self != 'undefined' && self ? self : window;
    }

    globalObject.BigNumber = BigNumber;
  }
})(void 0);

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9mcmFtZXdvcmsvZXh0ZW5kL2JpZ051bWJlci5qcyJdLCJuYW1lcyI6WyJnbG9iYWxPYmplY3QiLCJCaWdOdW1iZXIiLCJpc051bWVyaWMiLCJtYXRoY2VpbCIsIk1hdGgiLCJjZWlsIiwibWF0aGZsb29yIiwiZmxvb3IiLCJiaWdudW1iZXJFcnJvciIsInRvb01hbnlEaWdpdHMiLCJCQVNFIiwiTE9HX0JBU0UiLCJNQVhfU0FGRV9JTlRFR0VSIiwiUE9XU19URU4iLCJTUVJUX0JBU0UiLCJNQVgiLCJjbG9uZSIsImNvbmZpZ09iamVjdCIsImRpdiIsImNvbnZlcnRCYXNlIiwicGFyc2VOdW1lcmljIiwiUCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwidG9TdHJpbmciLCJ2YWx1ZU9mIiwiT05FIiwiREVDSU1BTF9QTEFDRVMiLCJST1VORElOR19NT0RFIiwiVE9fRVhQX05FRyIsIlRPX0VYUF9QT1MiLCJNSU5fRVhQIiwiTUFYX0VYUCIsIkNSWVBUTyIsIk1PRFVMT19NT0RFIiwiUE9XX1BSRUNJU0lPTiIsIkZPUk1BVCIsImRlY2ltYWxTZXBhcmF0b3IiLCJncm91cFNlcGFyYXRvciIsImdyb3VwU2l6ZSIsInNlY29uZGFyeUdyb3VwU2l6ZSIsImZyYWN0aW9uR3JvdXBTZXBhcmF0b3IiLCJmcmFjdGlvbkdyb3VwU2l6ZSIsIkFMUEhBQkVUIiwibiIsImIiLCJhbHBoYWJldCIsImMiLCJjYXNlQ2hhbmdlZCIsImUiLCJpIiwiaXNOdW0iLCJsZW4iLCJzdHIiLCJ4IiwicyIsInNsaWNlIiwidGVzdCIsImNoYXJDb2RlQXQiLCJpbmRleE9mIiwicmVwbGFjZSIsInNlYXJjaCIsInN1YnN0cmluZyIsImxlbmd0aCIsImludENoZWNrIiwicm91bmQiLCJERUJVRyIsIkVycm9yIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJ0b0xvd2VyQ2FzZSIsInB1c2giLCJST1VORF9VUCIsIlJPVU5EX0RPV04iLCJST1VORF9DRUlMIiwiUk9VTkRfRkxPT1IiLCJST1VORF9IQUxGX1VQIiwiUk9VTkRfSEFMRl9ET1dOIiwiUk9VTkRfSEFMRl9FVkVOIiwiUk9VTkRfSEFMRl9DRUlMIiwiUk9VTkRfSEFMRl9GTE9PUiIsIkVVQ0xJRCIsImNvbmZpZyIsInNldCIsIm9iaiIsInAiLCJ2IiwiaGFzT3duUHJvcGVydHkiLCJpc0FycmF5IiwiY3J5cHRvIiwiZ2V0UmFuZG9tVmFsdWVzIiwicmFuZG9tQnl0ZXMiLCJFWFBPTkVOVElBTF9BVCIsIlJBTkdFIiwiaXNCaWdOdW1iZXIiLCJfaXNCaWdOdW1iZXIiLCJtYXhpbXVtIiwibWF4IiwibWF4T3JNaW4iLCJhcmd1bWVudHMiLCJsdCIsIm1pbmltdW0iLCJtaW4iLCJndCIsInJhbmRvbSIsInBvdzJfNTMiLCJyYW5kb201M2JpdEludCIsImRwIiwiYSIsImsiLCJyYW5kIiwiVWludDMyQXJyYXkiLCJjb3B5IiwicG9wIiwic3BsaWNlIiwiZGVjaW1hbCIsInRvQmFzZU91dCIsImJhc2VJbiIsImJhc2VPdXQiLCJqIiwiYXJyIiwiYXJyTCIsInJldmVyc2UiLCJzaWduIiwiY2FsbGVySXNUb1N0cmluZyIsImQiLCJyIiwieGMiLCJ5Iiwicm0iLCJwb3ciLCJ0b0ZpeGVkUG9pbnQiLCJjb2VmZlRvU3RyaW5nIiwiY29uY2F0IiwibXVsdGlwbHkiLCJiYXNlIiwibSIsInRlbXAiLCJ4bG8iLCJ4aGkiLCJjYXJyeSIsImtsbyIsImtoaSIsImNvbXBhcmUiLCJhTCIsImJMIiwiY21wIiwic3VidHJhY3QiLCJtb3JlIiwicHJvZCIsInByb2RMIiwicSIsInFjIiwicmVtIiwicmVtTCIsInJlbTAiLCJ4aSIsInhMIiwieWMwIiwieUwiLCJ5eiIsInljIiwiTmFOIiwiYml0Rmxvb3IiLCJmb3JtYXQiLCJpZCIsImMwIiwibmUiLCJ0b0V4cG9uZW50aWFsIiwiYXJncyIsIm1ldGhvZCIsImNhbGwiLCJub3JtYWxpc2UiLCJiYXNlUHJlZml4IiwiZG90QWZ0ZXIiLCJkb3RCZWZvcmUiLCJpc0luZmluaXR5T3JOYU4iLCJ3aGl0ZXNwYWNlT3JQbHVzIiwiaXNOYU4iLCJwMSIsInAyIiwic2QiLCJuaSIsInJkIiwicG93czEwIiwib3V0IiwiYWJzb2x1dGVWYWx1ZSIsImFicyIsImNvbXBhcmVkVG8iLCJkZWNpbWFsUGxhY2VzIiwiZGl2aWRlZEJ5IiwiZGl2aWRlZFRvSW50ZWdlckJ5IiwiaWRpdiIsImV4cG9uZW50aWF0ZWRCeSIsImhhbGYiLCJpc01vZEV4cCIsIm5Jc0JpZyIsIm5Jc05lZyIsIm5Jc09kZCIsImlzSW50ZWdlciIsImlzT2RkIiwibW9kIiwidGltZXMiLCJpbnRlZ2VyVmFsdWUiLCJpc0VxdWFsVG8iLCJlcSIsImlzRmluaXRlIiwiaXNHcmVhdGVyVGhhbiIsImlzR3JlYXRlclRoYW5PckVxdWFsVG8iLCJndGUiLCJpc0xlc3NUaGFuIiwiaXNMZXNzVGhhbk9yRXF1YWxUbyIsImx0ZSIsImlzTmVnYXRpdmUiLCJpc1Bvc2l0aXZlIiwiaXNaZXJvIiwibWludXMiLCJ0IiwieExUeSIsInBsdXMiLCJ4ZSIsInllIiwibW9kdWxvIiwibXVsdGlwbGllZEJ5IiwieGNMIiwieWNMIiwieWxvIiwieWhpIiwiemMiLCJzcXJ0QmFzZSIsIm5lZ2F0ZWQiLCJwcmVjaXNpb24iLCJzaGlmdGVkQnkiLCJzcXVhcmVSb290Iiwic3FydCIsInJlcCIsInRvRml4ZWQiLCJ0b0Zvcm1hdCIsInNwbGl0IiwiZzEiLCJnMiIsImludFBhcnQiLCJmcmFjdGlvblBhcnQiLCJpc05lZyIsImludERpZ2l0cyIsInN1YnN0ciIsIlJlZ0V4cCIsInRvRnJhY3Rpb24iLCJtZCIsImQwIiwiZDEiLCJkMiIsImV4cCIsIm4wIiwibjEiLCJ0b051bWJlciIsInRvUHJlY2lzaW9uIiwidG9KU09OIiwieiIsImwiLCJuYW1lIiwiT2JqZWN0IiwienMiLCJkZWZpbmUiLCJhbWQiLCJtb2R1bGUiLCJleHBvcnRzIiwic2VsZiIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFBQyxDQUFDLFVBQVVBLFlBQVYs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QyxDQTN1RndCLENBNnVGeEI7O0VBQ0EsSUFBSSxPQUFPc1EsTUFBUCxJQUFpQixVQUFqQixJQUErQkEsTUFBTSxDQUFDQyxHQUExQyxFQUErQztJQUM3Q0QsTUFBTSxDQUFDLFlBQVk7TUFBRSxPQUFPdFEsU0FBUDtJQUFtQixDQUFsQyxDQUFOLENBRDZDLENBRy9DO0VBQ0MsQ0FKRCxNQUlPLElBQUksT0FBT3dRLE1BQVAsSUFBaUIsV0FBakIsSUFBZ0NBLE1BQU0sQ0FBQ0MsT0FBM0MsRUFBb0Q7SUFDekRELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpRLFNBQWpCLENBRHlELENBRzNEO0VBQ0MsQ0FKTSxNQUlBO0lBQ0wsSUFBSSxDQUFDRCxZQUFMLEVBQW1CO01BQ2pCQSxZQUFZLEdBQUcsT0FBTzJRLElBQVAsSUFBZSxXQUFmLElBQThCQSxJQUE5QixHQUFxQ0EsSUFBckMsR0FBNENDLE1BQTNEO0lBQ0Q7O0lBRUQ1USxZQUFZLENBQUNDLFNBQWIsR0FBeUJBLFNBQXpCO0VBQ0Q7QUFDRixDQTd2RkEiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG47KGZ1bmN0aW9uIChnbG9iYWxPYmplY3QpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4vKlxyXG4gKiAgICAgIGJpZ251bWJlci5qcyB2Ny4yLjFcclxuICogICAgICBBIEphdmFTY3JpcHQgbGlicmFyeSBmb3IgYXJiaXRyYXJ5LXByZWNpc2lvbiBhcml0aG1ldGljLlxyXG4gKiAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWtlTWNsL2JpZ251bWJlci5qc1xyXG4gKiAgICAgIENvcHlyaWdodCAoYykgMjAxOCBNaWNoYWVsIE1jbGF1Z2hsaW4gPE04Y2g4OGxAZ21haWwuY29tPlxyXG4gKiAgICAgIE1JVCBMaWNlbnNlZC5cclxuICpcclxuICogICAgICBCaWdOdW1iZXIucHJvdG90eXBlIG1ldGhvZHMgICAgIHwgIEJpZ051bWJlciBtZXRob2RzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgYWJzb2x1dGVWYWx1ZSAgICAgICAgICAgIGFicyAgICB8ICBjbG9uZVxyXG4gKiAgICAgIGNvbXBhcmVkVG8gICAgICAgICAgICAgICAgICAgICAgfCAgY29uZmlnICAgICAgICAgICAgICAgc2V0XHJcbiAqICAgICAgZGVjaW1hbFBsYWNlcyAgICAgICAgICAgIGRwICAgICB8ICAgICAgREVDSU1BTF9QTEFDRVNcclxuICogICAgICBkaXZpZGVkQnkgICAgICAgICAgICAgICAgZGl2ICAgIHwgICAgICBST1VORElOR19NT0RFXHJcbiAqICAgICAgZGl2aWRlZFRvSW50ZWdlckJ5ICAgICAgIGlkaXYgICB8ICAgICAgRVhQT05FTlRJQUxfQVRcclxuICogICAgICBleHBvbmVudGlhdGVkQnkgICAgICAgICAgcG93ICAgIHwgICAgICBSQU5HRVxyXG4gKiAgICAgIGludGVnZXJWYWx1ZSAgICAgICAgICAgICAgICAgICAgfCAgICAgIENSWVBUT1xyXG4gKiAgICAgIGlzRXF1YWxUbyAgICAgICAgICAgICAgICBlcSAgICAgfCAgICAgIE1PRFVMT19NT0RFXHJcbiAqICAgICAgaXNGaW5pdGUgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgUE9XX1BSRUNJU0lPTlxyXG4gKiAgICAgIGlzR3JlYXRlclRoYW4gICAgICAgICAgICBndCAgICAgfCAgICAgIEZPUk1BVFxyXG4gKiAgICAgIGlzR3JlYXRlclRoYW5PckVxdWFsVG8gICBndGUgICAgfCAgICAgIEFMUEhBQkVUXHJcbiAqICAgICAgaXNJbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICB8ICBpc0JpZ051bWJlclxyXG4gKiAgICAgIGlzTGVzc1RoYW4gICAgICAgICAgICAgICBsdCAgICAgfCAgbWF4aW11bSAgICAgICAgICAgICAgbWF4XHJcbiAqICAgICAgaXNMZXNzVGhhbk9yRXF1YWxUbyAgICAgIGx0ZSAgICB8ICBtaW5pbXVtICAgICAgICAgICAgICBtaW5cclxuICogICAgICBpc05hTiAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgIHJhbmRvbVxyXG4gKiAgICAgIGlzTmVnYXRpdmUgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIGlzUG9zaXRpdmUgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIGlzWmVybyAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIG1pbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIG1vZHVsbyAgICAgICAgICAgICAgICAgICBtb2QgICAgfFxyXG4gKiAgICAgIG11bHRpcGxpZWRCeSAgICAgICAgICAgICB0aW1lcyAgfFxyXG4gKiAgICAgIG5lZ2F0ZWQgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHBsdXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHByZWNpc2lvbiAgICAgICAgICAgICAgICBzZCAgICAgfFxyXG4gKiAgICAgIHNoaWZ0ZWRCeSAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHNxdWFyZVJvb3QgICAgICAgICAgICAgICBzcXJ0ICAgfFxyXG4gKiAgICAgIHRvRXhwb25lbnRpYWwgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvRml4ZWQgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvRm9ybWF0ICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvRnJhY3Rpb24gICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvSlNPTiAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvTnVtYmVyICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvUHJlY2lzaW9uICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHRvU3RyaW5nICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKiAgICAgIHZhbHVlT2YgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gKlxyXG4gKi9cclxuXHJcblxyXG4gIHZhciBCaWdOdW1iZXIsXHJcbiAgICBpc051bWVyaWMgPSAvXi0/KD86XFxkKyg/OlxcLlxcZCopP3xcXC5cXGQrKSg/OmVbKy1dP1xcZCspPyQvaSxcclxuXHJcbiAgICBtYXRoY2VpbCA9IE1hdGguY2VpbCxcclxuICAgIG1hdGhmbG9vciA9IE1hdGguZmxvb3IsXHJcblxyXG4gICAgYmlnbnVtYmVyRXJyb3IgPSAnW0JpZ051bWJlciBFcnJvcl0gJyxcclxuICAgIHRvb01hbnlEaWdpdHMgPSBiaWdudW1iZXJFcnJvciArICdOdW1iZXIgcHJpbWl0aXZlIGhhcyBtb3JlIHRoYW4gMTUgc2lnbmlmaWNhbnQgZGlnaXRzOiAnLFxyXG5cclxuICAgIEJBU0UgPSAxZTE0LFxyXG4gICAgTE9HX0JBU0UgPSAxNCxcclxuICAgIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFmZmZmZmZmZmZmZmZmLCAgICAgICAgIC8vIDJeNTMgLSAxXHJcbiAgICAvLyBNQVhfSU5UMzIgPSAweDdmZmZmZmZmLCAgICAgICAgICAgICAgICAgICAvLyAyXjMxIC0gMVxyXG4gICAgUE9XU19URU4gPSBbMSwgMTAsIDEwMCwgMWUzLCAxZTQsIDFlNSwgMWU2LCAxZTcsIDFlOCwgMWU5LCAxZTEwLCAxZTExLCAxZTEyLCAxZTEzXSxcclxuICAgIFNRUlRfQkFTRSA9IDFlNyxcclxuXHJcbiAgICAvLyBFRElUQUJMRVxyXG4gICAgLy8gVGhlIGxpbWl0IG9uIHRoZSB2YWx1ZSBvZiBERUNJTUFMX1BMQUNFUywgVE9fRVhQX05FRywgVE9fRVhQX1BPUywgTUlOX0VYUCwgTUFYX0VYUCwgYW5kXHJcbiAgICAvLyB0aGUgYXJndW1lbnRzIHRvIHRvRXhwb25lbnRpYWwsIHRvRml4ZWQsIHRvRm9ybWF0LCBhbmQgdG9QcmVjaXNpb24uXHJcbiAgICBNQVggPSAxRTk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIE1BWF9JTlQzMlxyXG5cclxuXHJcbiAgLypcclxuICAgKiBDcmVhdGUgYW5kIHJldHVybiBhIEJpZ051bWJlciBjb25zdHJ1Y3Rvci5cclxuICAgKi9cclxuICBmdW5jdGlvbiBjbG9uZShjb25maWdPYmplY3QpIHtcclxuICAgIHZhciBkaXYsIGNvbnZlcnRCYXNlLCBwYXJzZU51bWVyaWMsXHJcbiAgICAgIFAgPSBCaWdOdW1iZXIucHJvdG90eXBlID0geyBjb25zdHJ1Y3RvcjogQmlnTnVtYmVyLCB0b1N0cmluZzogbnVsbCwgdmFsdWVPZjogbnVsbCB9LFxyXG4gICAgICBPTkUgPSBuZXcgQmlnTnVtYmVyKDEpLFxyXG5cclxuXHJcbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRURJVEFCTEUgQ09ORklHIERFRkFVTFRTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblxyXG4gICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZXMgYmVsb3cgbXVzdCBiZSBpbnRlZ2VycyB3aXRoaW4gdGhlIGluY2x1c2l2ZSByYW5nZXMgc3RhdGVkLlxyXG4gICAgICAvLyBUaGUgdmFsdWVzIGNhbiBhbHNvIGJlIGNoYW5nZWQgYXQgcnVuLXRpbWUgdXNpbmcgQmlnTnVtYmVyLnNldC5cclxuXHJcbiAgICAgIC8vIFRoZSBtYXhpbXVtIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyBmb3Igb3BlcmF0aW9ucyBpbnZvbHZpbmcgZGl2aXNpb24uXHJcbiAgICAgIERFQ0lNQUxfUExBQ0VTID0gMjAsICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byBNQVhcclxuXHJcbiAgICAgIC8vIFRoZSByb3VuZGluZyBtb2RlIHVzZWQgd2hlbiByb3VuZGluZyB0byB0aGUgYWJvdmUgZGVjaW1hbCBwbGFjZXMsIGFuZCB3aGVuIHVzaW5nXHJcbiAgICAgIC8vIHRvRXhwb25lbnRpYWwsIHRvRml4ZWQsIHRvRm9ybWF0IGFuZCB0b1ByZWNpc2lvbiwgYW5kIHJvdW5kIChkZWZhdWx0IHZhbHVlKS5cclxuICAgICAgLy8gVVAgICAgICAgICAwIEF3YXkgZnJvbSB6ZXJvLlxyXG4gICAgICAvLyBET1dOICAgICAgIDEgVG93YXJkcyB6ZXJvLlxyXG4gICAgICAvLyBDRUlMICAgICAgIDIgVG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIEZMT09SICAgICAgMyBUb3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgLy8gSEFMRl9VUCAgICA0IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB1cC5cclxuICAgICAgLy8gSEFMRl9ET1dOICA1IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCBkb3duLlxyXG4gICAgICAvLyBIQUxGX0VWRU4gIDYgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgZXZlbiBuZWlnaGJvdXIuXHJcbiAgICAgIC8vIEhBTEZfQ0VJTCAgNyBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAgIC8vIEhBTEZfRkxPT1IgOCBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyAtSW5maW5pdHkuXHJcbiAgICAgIFJPVU5ESU5HX01PREUgPSA0LCAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byA4XHJcblxyXG4gICAgICAvLyBFWFBPTkVOVElBTF9BVCA6IFtUT19FWFBfTkVHICwgVE9fRVhQX1BPU11cclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYmVuZWF0aCB3aGljaCB0b1N0cmluZyByZXR1cm5zIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICAvLyBOdW1iZXIgdHlwZTogLTdcclxuICAgICAgVE9fRVhQX05FRyA9IC03LCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIC1NQVhcclxuXHJcbiAgICAgIC8vIFRoZSBleHBvbmVudCB2YWx1ZSBhdCBhbmQgYWJvdmUgd2hpY2ggdG9TdHJpbmcgcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAgLy8gTnVtYmVyIHR5cGU6IDIxXHJcbiAgICAgIFRPX0VYUF9QT1MgPSAyMSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byBNQVhcclxuXHJcbiAgICAgIC8vIFJBTkdFIDogW01JTl9FWFAsIE1BWF9FWFBdXHJcblxyXG4gICAgICAvLyBUaGUgbWluaW11bSBleHBvbmVudCB2YWx1ZSwgYmVuZWF0aCB3aGljaCB1bmRlcmZsb3cgdG8gemVybyBvY2N1cnMuXHJcbiAgICAgIC8vIE51bWJlciB0eXBlOiAtMzI0ICAoNWUtMzI0KVxyXG4gICAgICBNSU5fRVhQID0gLTFlNywgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC0xIHRvIC1NQVhcclxuXHJcbiAgICAgIC8vIFRoZSBtYXhpbXVtIGV4cG9uZW50IHZhbHVlLCBhYm92ZSB3aGljaCBvdmVyZmxvdyB0byBJbmZpbml0eSBvY2N1cnMuXHJcbiAgICAgIC8vIE51bWJlciB0eXBlOiAgMzA4ICAoMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgpXHJcbiAgICAgIC8vIEZvciBNQVhfRVhQID4gMWU3LCBlLmcuIG5ldyBCaWdOdW1iZXIoJzFlMTAwMDAwMDAwJykucGx1cygxKSBtYXkgYmUgc2xvdy5cclxuICAgICAgTUFYX0VYUCA9IDFlNywgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxIHRvIE1BWFxyXG5cclxuICAgICAgLy8gV2hldGhlciB0byB1c2UgY3J5cHRvZ3JhcGhpY2FsbHktc2VjdXJlIHJhbmRvbSBudW1iZXIgZ2VuZXJhdGlvbiwgaWYgYXZhaWxhYmxlLlxyXG4gICAgICBDUllQVE8gPSBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRydWUgb3IgZmFsc2VcclxuXHJcbiAgICAgIC8vIFRoZSBtb2R1bG8gbW9kZSB1c2VkIHdoZW4gY2FsY3VsYXRpbmcgdGhlIG1vZHVsdXM6IGEgbW9kIG4uXHJcbiAgICAgIC8vIFRoZSBxdW90aWVudCAocSA9IGEgLyBuKSBpcyBjYWxjdWxhdGVkIGFjY29yZGluZyB0byB0aGUgY29ycmVzcG9uZGluZyByb3VuZGluZyBtb2RlLlxyXG4gICAgICAvLyBUaGUgcmVtYWluZGVyIChyKSBpcyBjYWxjdWxhdGVkIGFzOiByID0gYSAtIG4gKiBxLlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBVUCAgICAgICAgMCBUaGUgcmVtYWluZGVyIGlzIHBvc2l0aXZlIGlmIHRoZSBkaXZpZGVuZCBpcyBuZWdhdGl2ZSwgZWxzZSBpcyBuZWdhdGl2ZS5cclxuICAgICAgLy8gRE9XTiAgICAgIDEgVGhlIHJlbWFpbmRlciBoYXMgdGhlIHNhbWUgc2lnbiBhcyB0aGUgZGl2aWRlbmQuXHJcbiAgICAgIC8vICAgICAgICAgICAgIFRoaXMgbW9kdWxvIG1vZGUgaXMgY29tbW9ubHkga25vd24gYXMgJ3RydW5jYXRlZCBkaXZpc2lvbicgYW5kIGlzXHJcbiAgICAgIC8vICAgICAgICAgICAgIGVxdWl2YWxlbnQgdG8gKGEgJSBuKSBpbiBKYXZhU2NyaXB0LlxyXG4gICAgICAvLyBGTE9PUiAgICAgMyBUaGUgcmVtYWluZGVyIGhhcyB0aGUgc2FtZSBzaWduIGFzIHRoZSBkaXZpc29yIChQeXRob24gJSkuXHJcbiAgICAgIC8vIEhBTEZfRVZFTiA2IFRoaXMgbW9kdWxvIG1vZGUgaW1wbGVtZW50cyB0aGUgSUVFRSA3NTQgcmVtYWluZGVyIGZ1bmN0aW9uLlxyXG4gICAgICAvLyBFVUNMSUQgICAgOSBFdWNsaWRpYW4gZGl2aXNpb24uIHEgPSBzaWduKG4pICogZmxvb3IoYSAvIGFicyhuKSkuXHJcbiAgICAgIC8vICAgICAgICAgICAgIFRoZSByZW1haW5kZXIgaXMgYWx3YXlzIHBvc2l0aXZlLlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBUaGUgdHJ1bmNhdGVkIGRpdmlzaW9uLCBmbG9vcmVkIGRpdmlzaW9uLCBFdWNsaWRpYW4gZGl2aXNpb24gYW5kIElFRUUgNzU0IHJlbWFpbmRlclxyXG4gICAgICAvLyBtb2RlcyBhcmUgY29tbW9ubHkgdXNlZCBmb3IgdGhlIG1vZHVsdXMgb3BlcmF0aW9uLlxyXG4gICAgICAvLyBBbHRob3VnaCB0aGUgb3RoZXIgcm91bmRpbmcgbW9kZXMgY2FuIGFsc28gYmUgdXNlZCwgdGhleSBtYXkgbm90IGdpdmUgdXNlZnVsIHJlc3VsdHMuXHJcbiAgICAgIE1PRFVMT19NT0RFID0gMSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byA5XHJcblxyXG4gICAgICAvLyBUaGUgbWF4aW11bSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIG9mIHRoZSByZXN1bHQgb2YgdGhlIGV4cG9uZW50aWF0ZWRCeSBvcGVyYXRpb24uXHJcbiAgICAgIC8vIElmIFBPV19QUkVDSVNJT04gaXMgMCwgdGhlcmUgd2lsbCBiZSB1bmxpbWl0ZWQgc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAgICBQT1dfUFJFQ0lTSU9OID0gMCwgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gTUFYXHJcblxyXG4gICAgICAvLyBUaGUgZm9ybWF0IHNwZWNpZmljYXRpb24gdXNlZCBieSB0aGUgQmlnTnVtYmVyLnByb3RvdHlwZS50b0Zvcm1hdCBtZXRob2QuXHJcbiAgICAgIEZPUk1BVCA9IHtcclxuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiAnLicsXHJcbiAgICAgICAgZ3JvdXBTZXBhcmF0b3I6ICcsJyxcclxuICAgICAgICBncm91cFNpemU6IDMsXHJcbiAgICAgICAgc2Vjb25kYXJ5R3JvdXBTaXplOiAwLFxyXG4gICAgICAgIGZyYWN0aW9uR3JvdXBTZXBhcmF0b3I6ICdcXHhBMCcsICAgICAgLy8gbm9uLWJyZWFraW5nIHNwYWNlXHJcbiAgICAgICAgZnJhY3Rpb25Hcm91cFNpemU6IDBcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIFRoZSBhbHBoYWJldCB1c2VkIGZvciBiYXNlIGNvbnZlcnNpb24uXHJcbiAgICAgIC8vIEl0IG11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzIGxvbmcsIHdpdGggbm8gJy4nIG9yIHJlcGVhdGVkIGNoYXJhY3Rlci5cclxuICAgICAgLy8gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJF8nXHJcbiAgICAgIEFMUEhBQkVUID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eic7XHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuICAgIC8vIENPTlNUUlVDVE9SXHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBUaGUgQmlnTnVtYmVyIGNvbnN0cnVjdG9yIGFuZCBleHBvcnRlZCBmdW5jdGlvbi5cclxuICAgICAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgbmV3IGluc3RhbmNlIG9mIGEgQmlnTnVtYmVyIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBuIHtudW1iZXJ8c3RyaW5nfEJpZ051bWJlcn0gQSBudW1lcmljIHZhbHVlLlxyXG4gICAgICogW2JdIHtudW1iZXJ9IFRoZSBiYXNlIG9mIG4uIEludGVnZXIsIDIgdG8gQUxQSEFCRVQubGVuZ3RoIGluY2x1c2l2ZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQmlnTnVtYmVyKG4sIGIpIHtcclxuICAgICAgdmFyIGFscGhhYmV0LCBjLCBjYXNlQ2hhbmdlZCwgZSwgaSwgaXNOdW0sIGxlbiwgc3RyLFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgLy8gRW5hYmxlIGNvbnN0cnVjdG9yIHVzYWdlIHdpdGhvdXQgbmV3LlxyXG4gICAgICBpZiAoISh4IGluc3RhbmNlb2YgQmlnTnVtYmVyKSkge1xyXG5cclxuICAgICAgICAvLyBEb24ndCB0aHJvdyBvbiBjb25zdHJ1Y3RvciBjYWxsIHdpdGhvdXQgbmV3ICgjODEpLlxyXG4gICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBDb25zdHJ1Y3RvciBjYWxsIHdpdGhvdXQgbmV3OiB7bn0nXHJcbiAgICAgICAgLy90aHJvdyBFcnJvcihiaWdudW1iZXJFcnJvciArICcgQ29uc3RydWN0b3IgY2FsbCB3aXRob3V0IG5ldzogJyArIG4pO1xyXG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKG4sIGIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYiA9PSBudWxsKSB7XHJcblxyXG4gICAgICAgIC8vIER1cGxpY2F0ZS5cclxuICAgICAgICBpZiAobiBpbnN0YW5jZW9mIEJpZ051bWJlcikge1xyXG4gICAgICAgICAgeC5zID0gbi5zO1xyXG4gICAgICAgICAgeC5lID0gbi5lO1xyXG4gICAgICAgICAgeC5jID0gKG4gPSBuLmMpID8gbi5zbGljZSgpIDogbjtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzTnVtID0gdHlwZW9mIG4gPT0gJ251bWJlcic7XHJcblxyXG4gICAgICAgIGlmIChpc051bSAmJiBuICogMCA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgLy8gVXNlIGAxIC8gbmAgdG8gaGFuZGxlIG1pbnVzIHplcm8gYWxzby5cclxuICAgICAgICAgIHgucyA9IDEgLyBuIDwgMCA/IChuID0gLW4sIC0xKSA6IDE7XHJcblxyXG4gICAgICAgICAgLy8gRmFzdGVyIHBhdGggZm9yIGludGVnZXJzLlxyXG4gICAgICAgICAgaWYgKG4gPT09IH5+bikge1xyXG4gICAgICAgICAgICBmb3IgKGUgPSAwLCBpID0gbjsgaSA+PSAxMDsgaSAvPSAxMCwgZSsrKTtcclxuICAgICAgICAgICAgeC5lID0gZTtcclxuICAgICAgICAgICAgeC5jID0gW25dO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc3RyID0gbiArICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoIWlzTnVtZXJpYy50ZXN0KHN0ciA9IG4gKyAnJykpIHJldHVybiBwYXJzZU51bWVyaWMoeCwgc3RyLCBpc051bSk7XHJcbiAgICAgICAgICB4LnMgPSBzdHIuY2hhckNvZGVBdCgwKSA9PSA0NSA/IChzdHIgPSBzdHIuc2xpY2UoMSksIC0xKSA6IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZWNpbWFsIHBvaW50P1xyXG4gICAgICAgIGlmICgoZSA9IHN0ci5pbmRleE9mKCcuJykpID4gLTEpIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG5cclxuICAgICAgICAvLyBFeHBvbmVudGlhbCBmb3JtP1xyXG4gICAgICAgIGlmICgoaSA9IHN0ci5zZWFyY2goL2UvaSkpID4gMCkge1xyXG5cclxuICAgICAgICAgIC8vIERldGVybWluZSBleHBvbmVudC5cclxuICAgICAgICAgIGlmIChlIDwgMCkgZSA9IGk7XHJcbiAgICAgICAgICBlICs9ICtzdHIuc2xpY2UoaSArIDEpO1xyXG4gICAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUgPCAwKSB7XHJcblxyXG4gICAgICAgICAgLy8gSW50ZWdlci5cclxuICAgICAgICAgIGUgPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBCYXNlIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtifSdcclxuICAgICAgICBpbnRDaGVjayhiLCAyLCBBTFBIQUJFVC5sZW5ndGgsICdCYXNlJyk7XHJcbiAgICAgICAgc3RyID0gbiArICcnO1xyXG5cclxuICAgICAgICAvLyBBbGxvdyBleHBvbmVudGlhbCBub3RhdGlvbiB0byBiZSB1c2VkIHdpdGggYmFzZSAxMCBhcmd1bWVudCwgd2hpbGVcclxuICAgICAgICAvLyBhbHNvIHJvdW5kaW5nIHRvIERFQ0lNQUxfUExBQ0VTIGFzIHdpdGggb3RoZXIgYmFzZXMuXHJcbiAgICAgICAgaWYgKGIgPT0gMTApIHtcclxuICAgICAgICAgIHggPSBuZXcgQmlnTnVtYmVyKG4gaW5zdGFuY2VvZiBCaWdOdW1iZXIgPyBuIDogc3RyKTtcclxuICAgICAgICAgIHJldHVybiByb3VuZCh4LCBERUNJTUFMX1BMQUNFUyArIHguZSArIDEsIFJPVU5ESU5HX01PREUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNOdW0gPSB0eXBlb2YgbiA9PSAnbnVtYmVyJztcclxuXHJcbiAgICAgICAgaWYgKGlzTnVtKSB7XHJcblxyXG4gICAgICAgICAgLy8gQXZvaWQgcG90ZW50aWFsIGludGVycHJldGF0aW9uIG9mIEluZmluaXR5IGFuZCBOYU4gYXMgYmFzZSA0NCsgdmFsdWVzLlxyXG4gICAgICAgICAgaWYgKG4gKiAwICE9IDApIHJldHVybiBwYXJzZU51bWVyaWMoeCwgc3RyLCBpc051bSwgYik7XHJcblxyXG4gICAgICAgICAgeC5zID0gMSAvIG4gPCAwID8gKHN0ciA9IHN0ci5zbGljZSgxKSwgLTEpIDogMTtcclxuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gTnVtYmVyIHByaW1pdGl2ZSBoYXMgbW9yZSB0aGFuIDE1IHNpZ25pZmljYW50IGRpZ2l0czoge259J1xyXG4gICAgICAgICAgaWYgKEJpZ051bWJlci5ERUJVRyAmJiBzdHIucmVwbGFjZSgvXjBcXC4wKnxcXC4vLCAnJykubGVuZ3RoID4gMTUpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICh0b29NYW55RGlnaXRzICsgbik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUHJldmVudCBsYXRlciBjaGVjayBmb3IgbGVuZ3RoIG9uIGNvbnZlcnRlZCBudW1iZXIuXHJcbiAgICAgICAgICBpc051bSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4LnMgPSBzdHIuY2hhckNvZGVBdCgwKSA9PT0gNDUgPyAoc3RyID0gc3RyLnNsaWNlKDEpLCAtMSkgOiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWxwaGFiZXQgPSBBTFBIQUJFVC5zbGljZSgwLCBiKTtcclxuICAgICAgICBlID0gaSA9IDA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRoYXQgc3RyIGlzIGEgdmFsaWQgYmFzZSBiIG51bWJlci5cclxuICAgICAgICAvLyBEb24ndCB1c2UgUmVnRXhwIHNvIGFscGhhYmV0IGNhbiBjb250YWluIHNwZWNpYWwgY2hhcmFjdGVycy5cclxuICAgICAgICBmb3IgKGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgaWYgKGFscGhhYmV0LmluZGV4T2YoYyA9IHN0ci5jaGFyQXQoaSkpIDwgMCkge1xyXG4gICAgICAgICAgICBpZiAoYyA9PSAnLicpIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gSWYgJy4nIGlzIG5vdCB0aGUgZmlyc3QgY2hhcmFjdGVyIGFuZCBpdCBoYXMgbm90IGJlIGZvdW5kIGJlZm9yZS5cclxuICAgICAgICAgICAgICBpZiAoaSA+IGUpIHtcclxuICAgICAgICAgICAgICAgIGUgPSBsZW47XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNhc2VDaGFuZ2VkKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEFsbG93IGUuZy4gaGV4YWRlY2ltYWwgJ0ZGJyBhcyB3ZWxsIGFzICdmZicuXHJcbiAgICAgICAgICAgICAgaWYgKHN0ciA9PSBzdHIudG9VcHBlckNhc2UoKSAmJiAoc3RyID0gc3RyLnRvTG93ZXJDYXNlKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgIHN0ciA9PSBzdHIudG9Mb3dlckNhc2UoKSAmJiAoc3RyID0gc3RyLnRvVXBwZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpID0gLTE7XHJcbiAgICAgICAgICAgICAgICBlID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlTnVtZXJpYyh4LCBuICsgJycsIGlzTnVtLCBiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0ciA9IGNvbnZlcnRCYXNlKHN0ciwgYiwgMTAsIHgucyk7XHJcblxyXG4gICAgICAgIC8vIERlY2ltYWwgcG9pbnQ/XHJcbiAgICAgICAgaWYgKChlID0gc3RyLmluZGV4T2YoJy4nKSkgPiAtMSkgc3RyID0gc3RyLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICAgICAgZWxzZSBlID0gc3RyLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgIGZvciAoaSA9IDA7IHN0ci5jaGFyQ29kZUF0KGkpID09PSA0ODsgaSsrKTtcclxuXHJcbiAgICAgIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgZm9yIChsZW4gPSBzdHIubGVuZ3RoOyBzdHIuY2hhckNvZGVBdCgtLWxlbikgPT09IDQ4Oyk7XHJcblxyXG4gICAgICBzdHIgPSBzdHIuc2xpY2UoaSwgKytsZW4pO1xyXG5cclxuICAgICAgaWYgKHN0cikge1xyXG4gICAgICAgIGxlbiAtPSBpO1xyXG5cclxuICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gTnVtYmVyIHByaW1pdGl2ZSBoYXMgbW9yZSB0aGFuIDE1IHNpZ25pZmljYW50IGRpZ2l0czoge259J1xyXG4gICAgICAgIGlmIChpc051bSAmJiBCaWdOdW1iZXIuREVCVUcgJiZcclxuICAgICAgICAgIGxlbiA+IDE1ICYmIChuID4gTUFYX1NBRkVfSU5URUdFUiB8fCBuICE9PSBtYXRoZmxvb3IobikpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAodG9vTWFueURpZ2l0cyArICh4LnMgKiBuKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlID0gZSAtIGkgLSAxO1xyXG5cclxuICAgICAgICAgLy8gT3ZlcmZsb3c/XHJcbiAgICAgICAgaWYgKGUgPiBNQVhfRVhQKSB7XHJcblxyXG4gICAgICAgICAgLy8gSW5maW5pdHkuXHJcbiAgICAgICAgICB4LmMgPSB4LmUgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBVbmRlcmZsb3c/XHJcbiAgICAgICAgfSBlbHNlIGlmIChlIDwgTUlOX0VYUCkge1xyXG5cclxuICAgICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgICB4LmMgPSBbeC5lID0gMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHguZSA9IGU7XHJcbiAgICAgICAgICB4LmMgPSBbXTtcclxuXHJcbiAgICAgICAgICAvLyBUcmFuc2Zvcm0gYmFzZVxyXG5cclxuICAgICAgICAgIC8vIGUgaXMgdGhlIGJhc2UgMTAgZXhwb25lbnQuXHJcbiAgICAgICAgICAvLyBpIGlzIHdoZXJlIHRvIHNsaWNlIHN0ciB0byBnZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGNvZWZmaWNpZW50IGFycmF5LlxyXG4gICAgICAgICAgaSA9IChlICsgMSkgJSBMT0dfQkFTRTtcclxuICAgICAgICAgIGlmIChlIDwgMCkgaSArPSBMT0dfQkFTRTtcclxuXHJcbiAgICAgICAgICBpZiAoaSA8IGxlbikge1xyXG4gICAgICAgICAgICBpZiAoaSkgeC5jLnB1c2goK3N0ci5zbGljZSgwLCBpKSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxlbiAtPSBMT0dfQkFTRTsgaSA8IGxlbjspIHtcclxuICAgICAgICAgICAgICB4LmMucHVzaCgrc3RyLnNsaWNlKGksIGkgKz0gTE9HX0JBU0UpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKGkpO1xyXG4gICAgICAgICAgICBpID0gTE9HX0JBU0UgLSBzdHIubGVuZ3RoO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSAtPSBsZW47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yICg7IGktLTsgc3RyICs9ICcwJyk7XHJcbiAgICAgICAgICB4LmMucHVzaCgrc3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgeC5jID0gW3guZSA9IDBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIENPTlNUUlVDVE9SIFBST1BFUlRJRVNcclxuXHJcblxyXG4gICAgQmlnTnVtYmVyLmNsb25lID0gY2xvbmU7XHJcblxyXG4gICAgQmlnTnVtYmVyLlJPVU5EX1VQID0gMDtcclxuICAgIEJpZ051bWJlci5ST1VORF9ET1dOID0gMTtcclxuICAgIEJpZ051bWJlci5ST1VORF9DRUlMID0gMjtcclxuICAgIEJpZ051bWJlci5ST1VORF9GTE9PUiA9IDM7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfSEFMRl9VUCA9IDQ7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfSEFMRl9ET1dOID0gNTtcclxuICAgIEJpZ051bWJlci5ST1VORF9IQUxGX0VWRU4gPSA2O1xyXG4gICAgQmlnTnVtYmVyLlJPVU5EX0hBTEZfQ0VJTCA9IDc7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfSEFMRl9GTE9PUiA9IDg7XHJcbiAgICBCaWdOdW1iZXIuRVVDTElEID0gOTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIENvbmZpZ3VyZSBpbmZyZXF1ZW50bHktY2hhbmdpbmcgbGlicmFyeS13aWRlIHNldHRpbmdzLlxyXG4gICAgICpcclxuICAgICAqIEFjY2VwdCBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIG9wdGlvbmFsIHByb3BlcnRpZXMgKGlmIHRoZSB2YWx1ZSBvZiBhIHByb3BlcnR5IGlzXHJcbiAgICAgKiBhIG51bWJlciwgaXQgbXVzdCBiZSBhbiBpbnRlZ2VyIHdpdGhpbiB0aGUgaW5jbHVzaXZlIHJhbmdlIHN0YXRlZCk6XHJcbiAgICAgKlxyXG4gICAgICogICBERUNJTUFMX1BMQUNFUyAgIHtudW1iZXJ9ICAgICAgICAgICAwIHRvIE1BWFxyXG4gICAgICogICBST1VORElOR19NT0RFICAgIHtudW1iZXJ9ICAgICAgICAgICAwIHRvIDhcclxuICAgICAqICAgRVhQT05FTlRJQUxfQVQgICB7bnVtYmVyfG51bWJlcltdfSAgLU1BWCB0byBNQVggIG9yICBbLU1BWCB0byAwLCAwIHRvIE1BWF1cclxuICAgICAqICAgUkFOR0UgICAgICAgICAgICB7bnVtYmVyfG51bWJlcltdfSAgLU1BWCB0byBNQVggKG5vdCB6ZXJvKSAgb3IgIFstTUFYIHRvIC0xLCAxIHRvIE1BWF1cclxuICAgICAqICAgQ1JZUFRPICAgICAgICAgICB7Ym9vbGVhbn0gICAgICAgICAgdHJ1ZSBvciBmYWxzZVxyXG4gICAgICogICBNT0RVTE9fTU9ERSAgICAgIHtudW1iZXJ9ICAgICAgICAgICAwIHRvIDlcclxuICAgICAqICAgUE9XX1BSRUNJU0lPTiAgICAgICB7bnVtYmVyfSAgICAgICAgICAgMCB0byBNQVhcclxuICAgICAqICAgQUxQSEFCRVQgICAgICAgICB7c3RyaW5nfSAgICAgICAgICAgQSBzdHJpbmcgb2YgdHdvIG9yIG1vcmUgdW5pcXVlIGNoYXJhY3RlcnMgd2hpY2ggZG9lc1xyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3QgY29udGFpbiAnLicuXHJcbiAgICAgKiAgIEZPUk1BVCAgICAgICAgICAge29iamVjdH0gICAgICAgICAgIEFuIG9iamVjdCB3aXRoIHNvbWUgb2YgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gICAgICogICAgICBkZWNpbWFsU2VwYXJhdG9yICAgICAgIHtzdHJpbmd9XHJcbiAgICAgKiAgICAgIGdyb3VwU2VwYXJhdG9yICAgICAgICAge3N0cmluZ31cclxuICAgICAqICAgICAgZ3JvdXBTaXplICAgICAgICAgICAgICB7bnVtYmVyfVxyXG4gICAgICogICAgICBzZWNvbmRhcnlHcm91cFNpemUgICAgIHtudW1iZXJ9XHJcbiAgICAgKiAgICAgIGZyYWN0aW9uR3JvdXBTZXBhcmF0b3Ige3N0cmluZ31cclxuICAgICAqICAgICAgZnJhY3Rpb25Hcm91cFNpemUgICAgICB7bnVtYmVyfVxyXG4gICAgICpcclxuICAgICAqIChUaGUgdmFsdWVzIGFzc2lnbmVkIHRvIHRoZSBhYm92ZSBGT1JNQVQgb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdCBjaGVja2VkIGZvciB2YWxpZGl0eS4pXHJcbiAgICAgKlxyXG4gICAgICogRS5nLlxyXG4gICAgICogQmlnTnVtYmVyLmNvbmZpZyh7IERFQ0lNQUxfUExBQ0VTIDogMjAsIFJPVU5ESU5HX01PREUgOiA0IH0pXHJcbiAgICAgKlxyXG4gICAgICogSWdub3JlIHByb3BlcnRpZXMvcGFyYW1ldGVycyBzZXQgdG8gbnVsbCBvciB1bmRlZmluZWQsIGV4Y2VwdCBmb3IgQUxQSEFCRVQuXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIGN1cnJlbnQgdmFsdWVzLlxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIuY29uZmlnID0gQmlnTnVtYmVyLnNldCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgdmFyIHAsIHY7XHJcblxyXG4gICAgICBpZiAob2JqICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT0gJ29iamVjdCcpIHtcclxuXHJcbiAgICAgICAgICAvLyBERUNJTUFMX1BMQUNFUyB7bnVtYmVyfSBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gREVDSU1BTF9QTEFDRVMge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0RFQ0lNQUxfUExBQ0VTJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaW50Q2hlY2sodiwgMCwgTUFYLCBwKTtcclxuICAgICAgICAgICAgREVDSU1BTF9QTEFDRVMgPSB2O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJPVU5ESU5HX01PREUge251bWJlcn0gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBST1VORElOR19NT0RFIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdST1VORElOR19NT0RFJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaW50Q2hlY2sodiwgMCwgOCwgcCk7XHJcbiAgICAgICAgICAgIFJPVU5ESU5HX01PREUgPSB2O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEVYUE9ORU5USUFMX0FUIHtudW1iZXJ8bnVtYmVyW119XHJcbiAgICAgICAgICAvLyBJbnRlZ2VyLCAtTUFYIHRvIE1BWCBpbmNsdXNpdmUgb3JcclxuICAgICAgICAgIC8vIFtpbnRlZ2VyIC1NQVggdG8gMCBpbmNsdXNpdmUsIDAgdG8gTUFYIGluY2x1c2l2ZV0uXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gRVhQT05FTlRJQUxfQVQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0VYUE9ORU5USUFMX0FUJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaWYgKGlzQXJyYXkodikpIHtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2WzBdLCAtTUFYLCAwLCBwKTtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2WzFdLCAwLCBNQVgsIHApO1xyXG4gICAgICAgICAgICAgIFRPX0VYUF9ORUcgPSB2WzBdO1xyXG4gICAgICAgICAgICAgIFRPX0VYUF9QT1MgPSB2WzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHYsIC1NQVgsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgICAgVE9fRVhQX05FRyA9IC0oVE9fRVhQX1BPUyA9IHYgPCAwID8gLXYgOiB2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJBTkdFIHtudW1iZXJ8bnVtYmVyW119IE5vbi16ZXJvIGludGVnZXIsIC1NQVggdG8gTUFYIGluY2x1c2l2ZSBvclxyXG4gICAgICAgICAgLy8gW2ludGVnZXIgLU1BWCB0byAtMSBpbmNsdXNpdmUsIGludGVnZXIgMSB0byBNQVggaW5jbHVzaXZlXS5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBSQU5HRSB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V8Y2Fubm90IGJlIHplcm99OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnUkFOR0UnKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgICBpZiAoaXNBcnJheSh2KSkge1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHZbMF0sIC1NQVgsIC0xLCBwKTtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2WzFdLCAxLCBNQVgsIHApO1xyXG4gICAgICAgICAgICAgIE1JTl9FWFAgPSB2WzBdO1xyXG4gICAgICAgICAgICAgIE1BWF9FWFAgPSB2WzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGludENoZWNrKHYsIC1NQVgsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgICAgaWYgKHYpIHtcclxuICAgICAgICAgICAgICAgIE1JTl9FWFAgPSAtKE1BWF9FWFAgPSB2IDwgMCA/IC12IDogdik7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgcCArICcgY2Fubm90IGJlIHplcm86ICcgKyB2KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBDUllQVE8ge2Jvb2xlYW59IHRydWUgb3IgZmFsc2UuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gQ1JZUFRPIG5vdCB0cnVlIG9yIGZhbHNlOiB7dn0nXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gY3J5cHRvIHVuYXZhaWxhYmxlJ1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0NSWVBUTycpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGlmICh2ID09PSAhIXYpIHtcclxuICAgICAgICAgICAgICBpZiAodikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8gIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvICYmXHJcbiAgICAgICAgICAgICAgICAgKGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgfHwgY3J5cHRvLnJhbmRvbUJ5dGVzKSkge1xyXG4gICAgICAgICAgICAgICAgICBDUllQVE8gPSB2O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgQ1JZUFRPID0gIXY7XHJcbiAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnY3J5cHRvIHVuYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIENSWVBUTyA9IHY7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArIHAgKyAnIG5vdCB0cnVlIG9yIGZhbHNlOiAnICsgdik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBNT0RVTE9fTU9ERSB7bnVtYmVyfSBJbnRlZ2VyLCAwIHRvIDkgaW5jbHVzaXZlLlxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE1PRFVMT19NT0RFIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdNT0RVTE9fTU9ERScpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGludENoZWNrKHYsIDAsIDksIHApO1xyXG4gICAgICAgICAgICBNT0RVTE9fTU9ERSA9IHY7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUE9XX1BSRUNJU0lPTiB7bnVtYmVyfSBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gUE9XX1BSRUNJU0lPTiB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnUE9XX1BSRUNJU0lPTicpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGludENoZWNrKHYsIDAsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgIFBPV19QUkVDSVNJT04gPSB2O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEZPUk1BVCB7b2JqZWN0fVxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIEZPUk1BVCBub3QgYW4gb2JqZWN0OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnRk9STUFUJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09ICdvYmplY3QnKSBGT1JNQVQgPSB2O1xyXG4gICAgICAgICAgICBlbHNlIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyBwICsgJyBub3QgYW4gb2JqZWN0OiAnICsgdik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQUxQSEFCRVQge3N0cmluZ31cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBBTFBIQUJFVCBpbnZhbGlkOiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnQUxQSEFCRVQnKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG5cclxuICAgICAgICAgICAgLy8gRGlzYWxsb3cgaWYgb25seSBvbmUgY2hhcmFjdGVyLCBvciBjb250YWlucyAnLicgb3IgYSByZXBlYXRlZCBjaGFyYWN0ZXIuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PSAnc3RyaW5nJyAmJiAhL14uJHxcXC58KC4pLipcXDEvLnRlc3QodikpIHtcclxuICAgICAgICAgICAgICBBTFBIQUJFVCA9IHY7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgcCArICcgaW52YWxpZDogJyArIHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE9iamVjdCBleHBlY3RlZDoge3Z9J1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnT2JqZWN0IGV4cGVjdGVkOiAnICsgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgREVDSU1BTF9QTEFDRVM6IERFQ0lNQUxfUExBQ0VTLFxyXG4gICAgICAgIFJPVU5ESU5HX01PREU6IFJPVU5ESU5HX01PREUsXHJcbiAgICAgICAgRVhQT05FTlRJQUxfQVQ6IFtUT19FWFBfTkVHLCBUT19FWFBfUE9TXSxcclxuICAgICAgICBSQU5HRTogW01JTl9FWFAsIE1BWF9FWFBdLFxyXG4gICAgICAgIENSWVBUTzogQ1JZUFRPLFxyXG4gICAgICAgIE1PRFVMT19NT0RFOiBNT0RVTE9fTU9ERSxcclxuICAgICAgICBQT1dfUFJFQ0lTSU9OOiBQT1dfUFJFQ0lTSU9OLFxyXG4gICAgICAgIEZPUk1BVDogRk9STUFULFxyXG4gICAgICAgIEFMUEhBQkVUOiBBTFBIQUJFVFxyXG4gICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHYgaXMgYSBCaWdOdW1iZXIgaW5zdGFuY2UsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogdiB7YW55fVxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIuaXNCaWdOdW1iZXIgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICByZXR1cm4gdiBpbnN0YW5jZW9mIEJpZ051bWJlciB8fCB2ICYmIHYuX2lzQmlnTnVtYmVyID09PSB0cnVlIHx8IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIG1heGltdW0gb2YgdGhlIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIubWF4aW11bSA9IEJpZ051bWJlci5tYXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBtYXhPck1pbihhcmd1bWVudHMsIFAubHQpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIG1pbmltdW0gb2YgdGhlIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIubWluaW11bSA9IEJpZ051bWJlci5taW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBtYXhPck1pbihhcmd1bWVudHMsIFAuZ3QpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2l0aCBhIHJhbmRvbSB2YWx1ZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gMCBhbmQgbGVzcyB0aGFuIDEsXHJcbiAgICAgKiBhbmQgd2l0aCBkcCwgb3IgREVDSU1BTF9QTEFDRVMgaWYgZHAgaXMgb21pdHRlZCwgZGVjaW1hbCBwbGFjZXMgKG9yIGxlc3MgaWYgdHJhaWxpbmdcclxuICAgICAqIHplcm9zIGFyZSBwcm9kdWNlZCkuXHJcbiAgICAgKlxyXG4gICAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7ZHB9J1xyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIGNyeXB0byB1bmF2YWlsYWJsZSdcclxuICAgICAqL1xyXG4gICAgQmlnTnVtYmVyLnJhbmRvbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBwb3cyXzUzID0gMHgyMDAwMDAwMDAwMDAwMDtcclxuXHJcbiAgICAgIC8vIFJldHVybiBhIDUzIGJpdCBpbnRlZ2VyIG4sIHdoZXJlIDAgPD0gbiA8IDkwMDcxOTkyNTQ3NDA5OTIuXHJcbiAgICAgIC8vIENoZWNrIGlmIE1hdGgucmFuZG9tKCkgcHJvZHVjZXMgbW9yZSB0aGFuIDMyIGJpdHMgb2YgcmFuZG9tbmVzcy5cclxuICAgICAgLy8gSWYgaXQgZG9lcywgYXNzdW1lIGF0IGxlYXN0IDUzIGJpdHMgYXJlIHByb2R1Y2VkLCBvdGhlcndpc2UgYXNzdW1lIGF0IGxlYXN0IDMwIGJpdHMuXHJcbiAgICAgIC8vIDB4NDAwMDAwMDAgaXMgMl4zMCwgMHg4MDAwMDAgaXMgMl4yMywgMHgxZmZmZmYgaXMgMl4yMSAtIDEuXHJcbiAgICAgIHZhciByYW5kb201M2JpdEludCA9IChNYXRoLnJhbmRvbSgpICogcG93Ml81MykgJiAweDFmZmZmZlxyXG4gICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBtYXRoZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvdzJfNTMpOyB9XHJcbiAgICAgICA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIDB4NDAwMDAwMDAgfCAwKSAqIDB4ODAwMDAwKSArXHJcbiAgICAgICAgIChNYXRoLnJhbmRvbSgpICogMHg4MDAwMDAgfCAwKTsgfTtcclxuXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZHApIHtcclxuICAgICAgICB2YXIgYSwgYiwgZSwgaywgdixcclxuICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgYyA9IFtdLFxyXG4gICAgICAgICAgcmFuZCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuXHJcbiAgICAgICAgaWYgKGRwID09IG51bGwpIGRwID0gREVDSU1BTF9QTEFDRVM7XHJcbiAgICAgICAgZWxzZSBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuXHJcbiAgICAgICAgayA9IG1hdGhjZWlsKGRwIC8gTE9HX0JBU0UpO1xyXG5cclxuICAgICAgICBpZiAoQ1JZUFRPKSB7XHJcblxyXG4gICAgICAgICAgLy8gQnJvd3NlcnMgc3VwcG9ydGluZyBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLlxyXG4gICAgICAgICAgaWYgKGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGEgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheShrICo9IDIpKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoOyBpIDwgazspIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gNTMgYml0czpcclxuICAgICAgICAgICAgICAvLyAoKE1hdGgucG93KDIsIDMyKSAtIDEpICogTWF0aC5wb3coMiwgMjEpKS50b1N0cmluZygyKVxyXG4gICAgICAgICAgICAgIC8vIDExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTAwMDAwIDAwMDAwMDAwIDAwMDAwMDAwXHJcbiAgICAgICAgICAgICAgLy8gKChNYXRoLnBvdygyLCAzMikgLSAxKSA+Pj4gMTEpLnRvU3RyaW5nKDIpXHJcbiAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTExMTEgMTExMTExMTEgMTExMTExMTFcclxuICAgICAgICAgICAgICAvLyAweDIwMDAwIGlzIDJeMjEuXHJcbiAgICAgICAgICAgICAgdiA9IGFbaV0gKiAweDIwMDAwICsgKGFbaSArIDFdID4+PiAxMSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIFJlamVjdGlvbiBzYW1wbGluZzpcclxuICAgICAgICAgICAgICAvLyAwIDw9IHYgPCA5MDA3MTk5MjU0NzQwOTkyXHJcbiAgICAgICAgICAgICAgLy8gUHJvYmFiaWxpdHkgdGhhdCB2ID49IDllMTUsIGlzXHJcbiAgICAgICAgICAgICAgLy8gNzE5OTI1NDc0MDk5MiAvIDkwMDcxOTkyNTQ3NDA5OTIgfj0gMC4wMDA4LCBpLmUuIDEgaW4gMTI1MVxyXG4gICAgICAgICAgICAgIGlmICh2ID49IDllMTUpIHtcclxuICAgICAgICAgICAgICAgIGIgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSgyKSk7XHJcbiAgICAgICAgICAgICAgICBhW2ldID0gYlswXTtcclxuICAgICAgICAgICAgICAgIGFbaSArIDFdID0gYlsxXTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIDAgPD0gdiA8PSA4OTk5OTk5OTk5OTk5OTk5XHJcbiAgICAgICAgICAgICAgICAvLyAwIDw9ICh2ICUgMWUxNCkgPD0gOTk5OTk5OTk5OTk5OTlcclxuICAgICAgICAgICAgICAgIGMucHVzaCh2ICUgMWUxNCk7XHJcbiAgICAgICAgICAgICAgICBpICs9IDI7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkgPSBrIC8gMjtcclxuXHJcbiAgICAgICAgICAvLyBOb2RlLmpzIHN1cHBvcnRpbmcgY3J5cHRvLnJhbmRvbUJ5dGVzLlxyXG4gICAgICAgICAgfSBlbHNlIGlmIChjcnlwdG8ucmFuZG9tQnl0ZXMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGJ1ZmZlclxyXG4gICAgICAgICAgICBhID0gY3J5cHRvLnJhbmRvbUJ5dGVzKGsgKj0gNyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKDsgaSA8IGs7KSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIDB4MTAwMDAwMDAwMDAwMCBpcyAyXjQ4LCAweDEwMDAwMDAwMDAwIGlzIDJeNDBcclxuICAgICAgICAgICAgICAvLyAweDEwMDAwMDAwMCBpcyAyXjMyLCAweDEwMDAwMDAgaXMgMl4yNFxyXG4gICAgICAgICAgICAgIC8vIDExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExXHJcbiAgICAgICAgICAgICAgLy8gMCA8PSB2IDwgOTAwNzE5OTI1NDc0MDk5MlxyXG4gICAgICAgICAgICAgIHYgPSAoKGFbaV0gJiAzMSkgKiAweDEwMDAwMDAwMDAwMDApICsgKGFbaSArIDFdICogMHgxMDAwMDAwMDAwMCkgK1xyXG4gICAgICAgICAgICAgICAgIChhW2kgKyAyXSAqIDB4MTAwMDAwMDAwKSArIChhW2kgKyAzXSAqIDB4MTAwMDAwMCkgK1xyXG4gICAgICAgICAgICAgICAgIChhW2kgKyA0XSA8PCAxNikgKyAoYVtpICsgNV0gPDwgOCkgKyBhW2kgKyA2XTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHYgPj0gOWUxNSkge1xyXG4gICAgICAgICAgICAgICAgY3J5cHRvLnJhbmRvbUJ5dGVzKDcpLmNvcHkoYSwgaSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAwIDw9ICh2ICUgMWUxNCkgPD0gOTk5OTk5OTk5OTk5OTlcclxuICAgICAgICAgICAgICAgIGMucHVzaCh2ICUgMWUxNCk7XHJcbiAgICAgICAgICAgICAgICBpICs9IDc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkgPSBrIC8gNztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIENSWVBUTyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ2NyeXB0byB1bmF2YWlsYWJsZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXNlIE1hdGgucmFuZG9tLlxyXG4gICAgICAgIGlmICghQ1JZUFRPKSB7XHJcblxyXG4gICAgICAgICAgZm9yICg7IGkgPCBrOykge1xyXG4gICAgICAgICAgICB2ID0gcmFuZG9tNTNiaXRJbnQoKTtcclxuICAgICAgICAgICAgaWYgKHYgPCA5ZTE1KSBjW2krK10gPSB2ICUgMWUxNDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGsgPSBjWy0taV07XHJcbiAgICAgICAgZHAgJT0gTE9HX0JBU0U7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgdHJhaWxpbmcgZGlnaXRzIHRvIHplcm9zIGFjY29yZGluZyB0byBkcC5cclxuICAgICAgICBpZiAoayAmJiBkcCkge1xyXG4gICAgICAgICAgdiA9IFBPV1NfVEVOW0xPR19CQVNFIC0gZHBdO1xyXG4gICAgICAgICAgY1tpXSA9IG1hdGhmbG9vcihrIC8gdikgKiB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIGVsZW1lbnRzIHdoaWNoIGFyZSB6ZXJvLlxyXG4gICAgICAgIGZvciAoOyBjW2ldID09PSAwOyBjLnBvcCgpLCBpLS0pO1xyXG5cclxuICAgICAgICAvLyBaZXJvP1xyXG4gICAgICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgICAgYyA9IFtlID0gMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAvLyBSZW1vdmUgbGVhZGluZyBlbGVtZW50cyB3aGljaCBhcmUgemVybyBhbmQgYWRqdXN0IGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgICAgICAgZm9yIChlID0gLTEgOyBjWzBdID09PSAwOyBjLnNwbGljZSgwLCAxKSwgZSAtPSBMT0dfQkFTRSk7XHJcblxyXG4gICAgICAgICAgLy8gQ291bnQgdGhlIGRpZ2l0cyBvZiB0aGUgZmlyc3QgZWxlbWVudCBvZiBjIHRvIGRldGVybWluZSBsZWFkaW5nIHplcm9zLCBhbmQuLi5cclxuICAgICAgICAgIGZvciAoaSA9IDEsIHYgPSBjWzBdOyB2ID49IDEwOyB2IC89IDEwLCBpKyspO1xyXG5cclxuICAgICAgICAgIC8vIGFkanVzdCB0aGUgZXhwb25lbnQgYWNjb3JkaW5nbHkuXHJcbiAgICAgICAgICBpZiAoaSA8IExPR19CQVNFKSBlIC09IExPR19CQVNFIC0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmQuZSA9IGU7XHJcbiAgICAgICAgcmFuZC5jID0gYztcclxuICAgICAgICByZXR1cm4gcmFuZDtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIC8vIFBSSVZBVEUgRlVOQ1RJT05TXHJcblxyXG5cclxuICAgIC8vIENhbGxlZCBieSBCaWdOdW1iZXIgYW5kIEJpZ051bWJlci5wcm90b3R5cGUudG9TdHJpbmcuXHJcbiAgICBjb252ZXJ0QmFzZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBkZWNpbWFsID0gJzAxMjM0NTY3ODknO1xyXG5cclxuICAgICAgLypcclxuICAgICAgICogQ29udmVydCBzdHJpbmcgb2YgYmFzZUluIHRvIGFuIGFycmF5IG9mIG51bWJlcnMgb2YgYmFzZU91dC5cclxuICAgICAgICogRWcuIHRvQmFzZU91dCgnMjU1JywgMTAsIDE2KSByZXR1cm5zIFsxNSwgMTVdLlxyXG4gICAgICAgKiBFZy4gdG9CYXNlT3V0KCdmZicsIDE2LCAxMCkgcmV0dXJucyBbMiwgNSwgNV0uXHJcbiAgICAgICAqL1xyXG4gICAgICBmdW5jdGlvbiB0b0Jhc2VPdXQoc3RyLCBiYXNlSW4sIGJhc2VPdXQsIGFscGhhYmV0KSB7XHJcbiAgICAgICAgdmFyIGosXHJcbiAgICAgICAgICBhcnIgPSBbMF0sXHJcbiAgICAgICAgICBhcnJMLFxyXG4gICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKDsgaSA8IGxlbjspIHtcclxuICAgICAgICAgIGZvciAoYXJyTCA9IGFyci5sZW5ndGg7IGFyckwtLTsgYXJyW2FyckxdICo9IGJhc2VJbik7XHJcblxyXG4gICAgICAgICAgYXJyWzBdICs9IGFscGhhYmV0LmluZGV4T2Yoc3RyLmNoYXJBdChpKyspKTtcclxuXHJcbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJyW2pdID4gYmFzZU91dCAtIDEpIHtcclxuICAgICAgICAgICAgICBpZiAoYXJyW2ogKyAxXSA9PSBudWxsKSBhcnJbaiArIDFdID0gMDtcclxuICAgICAgICAgICAgICBhcnJbaiArIDFdICs9IGFycltqXSAvIGJhc2VPdXQgfCAwO1xyXG4gICAgICAgICAgICAgIGFycltqXSAlPSBiYXNlT3V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyLnJldmVyc2UoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ29udmVydCBhIG51bWVyaWMgc3RyaW5nIG9mIGJhc2VJbiB0byBhIG51bWVyaWMgc3RyaW5nIG9mIGJhc2VPdXQuXHJcbiAgICAgIC8vIElmIHRoZSBjYWxsZXIgaXMgdG9TdHJpbmcsIHdlIGFyZSBjb252ZXJ0aW5nIGZyb20gYmFzZSAxMCB0byBiYXNlT3V0LlxyXG4gICAgICAvLyBJZiB0aGUgY2FsbGVyIGlzIEJpZ051bWJlciwgd2UgYXJlIGNvbnZlcnRpbmcgZnJvbSBiYXNlSW4gdG8gYmFzZSAxMC5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHIsIGJhc2VJbiwgYmFzZU91dCwgc2lnbiwgY2FsbGVySXNUb1N0cmluZykge1xyXG4gICAgICAgIHZhciBhbHBoYWJldCwgZCwgZSwgaywgciwgeCwgeGMsIHksXHJcbiAgICAgICAgICBpID0gc3RyLmluZGV4T2YoJy4nKSxcclxuICAgICAgICAgIGRwID0gREVDSU1BTF9QTEFDRVMsXHJcbiAgICAgICAgICBybSA9IFJPVU5ESU5HX01PREU7XHJcblxyXG4gICAgICAgIC8vIE5vbi1pbnRlZ2VyLlxyXG4gICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgIGsgPSBQT1dfUFJFQ0lTSU9OO1xyXG5cclxuICAgICAgICAgIC8vIFVubGltaXRlZCBwcmVjaXNpb24uXHJcbiAgICAgICAgICBQT1dfUFJFQ0lTSU9OID0gMDtcclxuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG4gICAgICAgICAgeSA9IG5ldyBCaWdOdW1iZXIoYmFzZUluKTtcclxuICAgICAgICAgIHggPSB5LnBvdyhzdHIubGVuZ3RoIC0gaSk7XHJcbiAgICAgICAgICBQT1dfUFJFQ0lTSU9OID0gaztcclxuXHJcbiAgICAgICAgICAvLyBDb252ZXJ0IHN0ciBhcyBpZiBhbiBpbnRlZ2VyLCB0aGVuIHJlc3RvcmUgdGhlIGZyYWN0aW9uIHBhcnQgYnkgZGl2aWRpbmcgdGhlXHJcbiAgICAgICAgICAvLyByZXN1bHQgYnkgaXRzIGJhc2UgcmFpc2VkIHRvIGEgcG93ZXIuXHJcblxyXG4gICAgICAgICAgeS5jID0gdG9CYXNlT3V0KHRvRml4ZWRQb2ludChjb2VmZlRvU3RyaW5nKHguYyksIHguZSwgJzAnKSxcclxuICAgICAgICAgICAxMCwgYmFzZU91dCwgZGVjaW1hbCk7XHJcbiAgICAgICAgICB5LmUgPSB5LmMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ29udmVydCB0aGUgbnVtYmVyIGFzIGludGVnZXIuXHJcblxyXG4gICAgICAgIHhjID0gdG9CYXNlT3V0KHN0ciwgYmFzZUluLCBiYXNlT3V0LCBjYWxsZXJJc1RvU3RyaW5nXHJcbiAgICAgICAgID8gKGFscGhhYmV0ID0gQUxQSEFCRVQsIGRlY2ltYWwpXHJcbiAgICAgICAgIDogKGFscGhhYmV0ID0gZGVjaW1hbCwgQUxQSEFCRVQpKTtcclxuXHJcbiAgICAgICAgLy8geGMgbm93IHJlcHJlc2VudHMgc3RyIGFzIGFuIGludGVnZXIgYW5kIGNvbnZlcnRlZCB0byBiYXNlT3V0LiBlIGlzIHRoZSBleHBvbmVudC5cclxuICAgICAgICBlID0gayA9IHhjLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICAgIGZvciAoOyB4Y1stLWtdID09IDA7IHhjLnBvcCgpKTtcclxuXHJcbiAgICAgICAgLy8gWmVybz9cclxuICAgICAgICBpZiAoIXhjWzBdKSByZXR1cm4gYWxwaGFiZXQuY2hhckF0KDApO1xyXG5cclxuICAgICAgICAvLyBEb2VzIHN0ciByZXByZXNlbnQgYW4gaW50ZWdlcj8gSWYgc28sIG5vIG5lZWQgZm9yIHRoZSBkaXZpc2lvbi5cclxuICAgICAgICBpZiAoaSA8IDApIHtcclxuICAgICAgICAgIC0tZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeC5jID0geGM7XHJcbiAgICAgICAgICB4LmUgPSBlO1xyXG5cclxuICAgICAgICAgIC8vIFRoZSBzaWduIGlzIG5lZWRlZCBmb3IgY29ycmVjdCByb3VuZGluZy5cclxuICAgICAgICAgIHgucyA9IHNpZ247XHJcbiAgICAgICAgICB4ID0gZGl2KHgsIHksIGRwLCBybSwgYmFzZU91dCk7XHJcbiAgICAgICAgICB4YyA9IHguYztcclxuICAgICAgICAgIHIgPSB4LnI7XHJcbiAgICAgICAgICBlID0geC5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8geGMgbm93IHJlcHJlc2VudHMgc3RyIGNvbnZlcnRlZCB0byBiYXNlT3V0LlxyXG5cclxuICAgICAgICAvLyBUSGUgaW5kZXggb2YgdGhlIHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAgIGQgPSBlICsgZHAgKyAxO1xyXG5cclxuICAgICAgICAvLyBUaGUgcm91bmRpbmcgZGlnaXQ6IHRoZSBkaWdpdCB0byB0aGUgcmlnaHQgb2YgdGhlIGRpZ2l0IHRoYXQgbWF5IGJlIHJvdW5kZWQgdXAuXHJcbiAgICAgICAgaSA9IHhjW2RdO1xyXG5cclxuICAgICAgICAvLyBMb29rIGF0IHRoZSByb3VuZGluZyBkaWdpdHMgYW5kIG1vZGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gcm91bmQgdXAuXHJcblxyXG4gICAgICAgIGsgPSBiYXNlT3V0IC8gMjtcclxuICAgICAgICByID0gciB8fCBkIDwgMCB8fCB4Y1tkICsgMV0gIT0gbnVsbDtcclxuXHJcbiAgICAgICAgciA9IHJtIDwgNCA/IChpICE9IG51bGwgfHwgcikgJiYgKHJtID09IDAgfHwgcm0gPT0gKHgucyA8IDAgPyAzIDogMikpXHJcbiAgICAgICAgICAgICAgOiBpID4gayB8fCBpID09IGsgJiYocm0gPT0gNCB8fCByIHx8IHJtID09IDYgJiYgeGNbZCAtIDFdICYgMSB8fFxyXG4gICAgICAgICAgICAgICBybSA9PSAoeC5zIDwgMCA/IDggOiA3KSk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBpbmRleCBvZiB0aGUgcm91bmRpbmcgZGlnaXQgaXMgbm90IGdyZWF0ZXIgdGhhbiB6ZXJvLCBvciB4YyByZXByZXNlbnRzXHJcbiAgICAgICAgLy8gemVybywgdGhlbiB0aGUgcmVzdWx0IG9mIHRoZSBiYXNlIGNvbnZlcnNpb24gaXMgemVybyBvciwgaWYgcm91bmRpbmcgdXAsIGEgdmFsdWVcclxuICAgICAgICAvLyBzdWNoIGFzIDAuMDAwMDEuXHJcbiAgICAgICAgaWYgKGQgPCAxIHx8ICF4Y1swXSkge1xyXG5cclxuICAgICAgICAgIC8vIDFeLWRwIG9yIDBcclxuICAgICAgICAgIHN0ciA9IHIgPyB0b0ZpeGVkUG9pbnQoYWxwaGFiZXQuY2hhckF0KDEpLCAtZHAsIGFscGhhYmV0LmNoYXJBdCgwKSlcclxuICAgICAgICAgICAgICA6IGFscGhhYmV0LmNoYXJBdCgwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIC8vIFRydW5jYXRlIHhjIHRvIHRoZSByZXF1aXJlZCBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMuXHJcbiAgICAgICAgICB4Yy5sZW5ndGggPSBkO1xyXG5cclxuICAgICAgICAgIC8vIFJvdW5kIHVwP1xyXG4gICAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJvdW5kaW5nIHVwIG1heSBtZWFuIHRoZSBwcmV2aW91cyBkaWdpdCBoYXMgdG8gYmUgcm91bmRlZCB1cCBhbmQgc28gb24uXHJcbiAgICAgICAgICAgIGZvciAoLS1iYXNlT3V0OyArK3hjWy0tZF0gPiBiYXNlT3V0Oykge1xyXG4gICAgICAgICAgICAgIHhjW2RdID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKCFkKSB7XHJcbiAgICAgICAgICAgICAgICArK2U7XHJcbiAgICAgICAgICAgICAgICB4YyA9IFsxXS5jb25jYXQoeGMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgICAgIGZvciAoayA9IHhjLmxlbmd0aDsgIXhjWy0ta107KTtcclxuXHJcbiAgICAgICAgICAvLyBFLmcuIFs0LCAxMSwgMTVdIGJlY29tZXMgNGJmLlxyXG4gICAgICAgICAgZm9yIChpID0gMCwgc3RyID0gJyc7IGkgPD0gazsgc3RyICs9IGFscGhhYmV0LmNoYXJBdCh4Y1tpKytdKSk7XHJcblxyXG4gICAgICAgICAgLy8gQWRkIGxlYWRpbmcgemVyb3MsIGRlY2ltYWwgcG9pbnQgYW5kIHRyYWlsaW5nIHplcm9zIGFzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgc3RyID0gdG9GaXhlZFBvaW50KHN0ciwgZSwgYWxwaGFiZXQuY2hhckF0KDApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBjYWxsZXIgd2lsbCBhZGQgdGhlIHNpZ24uXHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIC8vIFBlcmZvcm0gZGl2aXNpb24gaW4gdGhlIHNwZWNpZmllZCBiYXNlLiBDYWxsZWQgYnkgZGl2IGFuZCBjb252ZXJ0QmFzZS5cclxuICAgIGRpdiA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAvLyBBc3N1bWUgbm9uLXplcm8geCBhbmQgay5cclxuICAgICAgZnVuY3Rpb24gbXVsdGlwbHkoeCwgaywgYmFzZSkge1xyXG4gICAgICAgIHZhciBtLCB0ZW1wLCB4bG8sIHhoaSxcclxuICAgICAgICAgIGNhcnJ5ID0gMCxcclxuICAgICAgICAgIGkgPSB4Lmxlbmd0aCxcclxuICAgICAgICAgIGtsbyA9IGsgJSBTUVJUX0JBU0UsXHJcbiAgICAgICAgICBraGkgPSBrIC8gU1FSVF9CQVNFIHwgMDtcclxuXHJcbiAgICAgICAgZm9yICh4ID0geC5zbGljZSgpOyBpLS07KSB7XHJcbiAgICAgICAgICB4bG8gPSB4W2ldICUgU1FSVF9CQVNFO1xyXG4gICAgICAgICAgeGhpID0geFtpXSAvIFNRUlRfQkFTRSB8IDA7XHJcbiAgICAgICAgICBtID0ga2hpICogeGxvICsgeGhpICoga2xvO1xyXG4gICAgICAgICAgdGVtcCA9IGtsbyAqIHhsbyArICgobSAlIFNRUlRfQkFTRSkgKiBTUVJUX0JBU0UpICsgY2Fycnk7XHJcbiAgICAgICAgICBjYXJyeSA9ICh0ZW1wIC8gYmFzZSB8IDApICsgKG0gLyBTUVJUX0JBU0UgfCAwKSArIGtoaSAqIHhoaTtcclxuICAgICAgICAgIHhbaV0gPSB0ZW1wICUgYmFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYXJyeSkgeCA9IFtjYXJyeV0uY29uY2F0KHgpO1xyXG5cclxuICAgICAgICByZXR1cm4geDtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gY29tcGFyZShhLCBiLCBhTCwgYkwpIHtcclxuICAgICAgICB2YXIgaSwgY21wO1xyXG5cclxuICAgICAgICBpZiAoYUwgIT0gYkwpIHtcclxuICAgICAgICAgIGNtcCA9IGFMID4gYkwgPyAxIDogLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICBmb3IgKGkgPSBjbXAgPSAwOyBpIDwgYUw7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKGFbaV0gIT0gYltpXSkge1xyXG4gICAgICAgICAgICAgIGNtcCA9IGFbaV0gPiBiW2ldID8gMSA6IC0xO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY21wO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzdWJ0cmFjdChhLCBiLCBhTCwgYmFzZSkge1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuXHJcbiAgICAgICAgLy8gU3VidHJhY3QgYiBmcm9tIGEuXHJcbiAgICAgICAgZm9yICg7IGFMLS07KSB7XHJcbiAgICAgICAgICBhW2FMXSAtPSBpO1xyXG4gICAgICAgICAgaSA9IGFbYUxdIDwgYlthTF0gPyAxIDogMDtcclxuICAgICAgICAgIGFbYUxdID0gaSAqIGJhc2UgKyBhW2FMXSAtIGJbYUxdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgICAgZm9yICg7ICFhWzBdICYmIGEubGVuZ3RoID4gMTsgYS5zcGxpY2UoMCwgMSkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB4OiBkaXZpZGVuZCwgeTogZGl2aXNvci5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh4LCB5LCBkcCwgcm0sIGJhc2UpIHtcclxuICAgICAgICB2YXIgY21wLCBlLCBpLCBtb3JlLCBuLCBwcm9kLCBwcm9kTCwgcSwgcWMsIHJlbSwgcmVtTCwgcmVtMCwgeGksIHhMLCB5YzAsXHJcbiAgICAgICAgICB5TCwgeXosXHJcbiAgICAgICAgICBzID0geC5zID09IHkucyA/IDEgOiAtMSxcclxuICAgICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgICAgeWMgPSB5LmM7XHJcblxyXG4gICAgICAgIC8vIEVpdGhlciBOYU4sIEluZmluaXR5IG9yIDA/XHJcbiAgICAgICAgaWYgKCF4YyB8fCAheGNbMF0gfHwgIXljIHx8ICF5Y1swXSkge1xyXG5cclxuICAgICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKFxyXG5cclxuICAgICAgICAgICAvLyBSZXR1cm4gTmFOIGlmIGVpdGhlciBOYU4sIG9yIGJvdGggSW5maW5pdHkgb3IgMC5cclxuICAgICAgICAgICAheC5zIHx8ICF5LnMgfHwgKHhjID8geWMgJiYgeGNbMF0gPT0geWNbMF0gOiAheWMpID8gTmFOIDpcclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiDljaQwIGlmIHggaXMg5Y2kMCBvciB5IGlzIOWNpEluZmluaXR5LCBvciByZXR1cm4g5Y2kSW5maW5pdHkgYXMgeSBpcyDljaQwLlxyXG4gICAgICAgICAgICB4YyAmJiB4Y1swXSA9PSAwIHx8ICF5YyA/IHMgKiAwIDogcyAvIDBcclxuICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHEgPSBuZXcgQmlnTnVtYmVyKHMpO1xyXG4gICAgICAgIHFjID0gcS5jID0gW107XHJcbiAgICAgICAgZSA9IHguZSAtIHkuZTtcclxuICAgICAgICBzID0gZHAgKyBlICsgMTtcclxuXHJcbiAgICAgICAgaWYgKCFiYXNlKSB7XHJcbiAgICAgICAgICBiYXNlID0gQkFTRTtcclxuICAgICAgICAgIGUgPSBiaXRGbG9vcih4LmUgLyBMT0dfQkFTRSkgLSBiaXRGbG9vcih5LmUgLyBMT0dfQkFTRSk7XHJcbiAgICAgICAgICBzID0gcyAvIExPR19CQVNFIHwgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlc3VsdCBleHBvbmVudCBtYXkgYmUgb25lIGxlc3MgdGhlbiB0aGUgY3VycmVudCB2YWx1ZSBvZiBlLlxyXG4gICAgICAgIC8vIFRoZSBjb2VmZmljaWVudHMgb2YgdGhlIEJpZ051bWJlcnMgZnJvbSBjb252ZXJ0QmFzZSBtYXkgaGF2ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgICBmb3IgKGkgPSAwOyB5Y1tpXSA9PSAoeGNbaV0gfHwgMCk7IGkrKyk7XHJcblxyXG4gICAgICAgIGlmICh5Y1tpXSA+ICh4Y1tpXSB8fCAwKSkgZS0tO1xyXG5cclxuICAgICAgICBpZiAocyA8IDApIHtcclxuICAgICAgICAgIHFjLnB1c2goMSk7XHJcbiAgICAgICAgICBtb3JlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgeEwgPSB4Yy5sZW5ndGg7XHJcbiAgICAgICAgICB5TCA9IHljLmxlbmd0aDtcclxuICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgcyArPSAyO1xyXG5cclxuICAgICAgICAgIC8vIE5vcm1hbGlzZSB4YyBhbmQgeWMgc28gaGlnaGVzdCBvcmRlciBkaWdpdCBvZiB5YyBpcyA+PSBiYXNlIC8gMi5cclxuXHJcbiAgICAgICAgICBuID0gbWF0aGZsb29yKGJhc2UgLyAoeWNbMF0gKyAxKSk7XHJcblxyXG4gICAgICAgICAgLy8gTm90IG5lY2Vzc2FyeSwgYnV0IHRvIGhhbmRsZSBvZGQgYmFzZXMgd2hlcmUgeWNbMF0gPT0gKGJhc2UgLyAyKSAtIDEuXHJcbiAgICAgICAgICAvLyBpZiAobiA+IDEgfHwgbisrID09IDEgJiYgeWNbMF0gPCBiYXNlIC8gMikge1xyXG4gICAgICAgICAgaWYgKG4gPiAxKSB7XHJcbiAgICAgICAgICAgIHljID0gbXVsdGlwbHkoeWMsIG4sIGJhc2UpO1xyXG4gICAgICAgICAgICB4YyA9IG11bHRpcGx5KHhjLCBuLCBiYXNlKTtcclxuICAgICAgICAgICAgeUwgPSB5Yy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHhMID0geGMubGVuZ3RoO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHhpID0geUw7XHJcbiAgICAgICAgICByZW0gPSB4Yy5zbGljZSgwLCB5TCk7XHJcbiAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAvLyBBZGQgemVyb3MgdG8gbWFrZSByZW1haW5kZXIgYXMgbG9uZyBhcyBkaXZpc29yLlxyXG4gICAgICAgICAgZm9yICg7IHJlbUwgPCB5TDsgcmVtW3JlbUwrK10gPSAwKTtcclxuICAgICAgICAgIHl6ID0geWMuc2xpY2UoKTtcclxuICAgICAgICAgIHl6ID0gWzBdLmNvbmNhdCh5eik7XHJcbiAgICAgICAgICB5YzAgPSB5Y1swXTtcclxuICAgICAgICAgIGlmICh5Y1sxXSA+PSBiYXNlIC8gMikgeWMwKys7XHJcbiAgICAgICAgICAvLyBOb3QgbmVjZXNzYXJ5LCBidXQgdG8gcHJldmVudCB0cmlhbCBkaWdpdCBuID4gYmFzZSwgd2hlbiB1c2luZyBiYXNlIDMuXHJcbiAgICAgICAgICAvLyBlbHNlIGlmIChiYXNlID09IDMgJiYgeWMwID09IDEpIHljMCA9IDEgKyAxZS0xNTtcclxuXHJcbiAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIG4gPSAwO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29tcGFyZSBkaXZpc29yIGFuZCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIGNtcCA9IGNvbXBhcmUoeWMsIHJlbSwgeUwsIHJlbUwpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgZGl2aXNvciA8IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgaWYgKGNtcCA8IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRyaWFsIGRpZ2l0LCBuLlxyXG5cclxuICAgICAgICAgICAgICByZW0wID0gcmVtWzBdO1xyXG4gICAgICAgICAgICAgIGlmICh5TCAhPSByZW1MKSByZW0wID0gcmVtMCAqIGJhc2UgKyAocmVtWzFdIHx8IDApO1xyXG5cclxuICAgICAgICAgICAgICAvLyBuIGlzIGhvdyBtYW55IHRpbWVzIHRoZSBkaXZpc29yIGdvZXMgaW50byB0aGUgY3VycmVudCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgbiA9IG1hdGhmbG9vcihyZW0wIC8geWMwKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gIEFsZ29yaXRobTpcclxuICAgICAgICAgICAgICAvLyAgcHJvZHVjdCA9IGRpdmlzb3IgbXVsdGlwbGllZCBieSB0cmlhbCBkaWdpdCAobikuXHJcbiAgICAgICAgICAgICAgLy8gIENvbXBhcmUgcHJvZHVjdCBhbmQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIC8vICBJZiBwcm9kdWN0IGlzIGdyZWF0ZXIgdGhhbiByZW1haW5kZXI6XHJcbiAgICAgICAgICAgICAgLy8gICAgU3VidHJhY3QgZGl2aXNvciBmcm9tIHByb2R1Y3QsIGRlY3JlbWVudCB0cmlhbCBkaWdpdC5cclxuICAgICAgICAgICAgICAvLyAgU3VidHJhY3QgcHJvZHVjdCBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAvLyAgSWYgcHJvZHVjdCB3YXMgbGVzcyB0aGFuIHJlbWFpbmRlciBhdCB0aGUgbGFzdCBjb21wYXJlOlxyXG4gICAgICAgICAgICAgIC8vICAgIENvbXBhcmUgbmV3IHJlbWFpbmRlciBhbmQgZGl2aXNvci5cclxuICAgICAgICAgICAgICAvLyAgICBJZiByZW1haW5kZXIgaXMgZ3JlYXRlciB0aGFuIGRpdmlzb3I6XHJcbiAgICAgICAgICAgICAgLy8gICAgICBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcmVtYWluZGVyLCBpbmNyZW1lbnQgdHJpYWwgZGlnaXQuXHJcblxyXG4gICAgICAgICAgICAgIGlmIChuID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG4gbWF5IGJlID4gYmFzZSBvbmx5IHdoZW4gYmFzZSBpcyAzLlxyXG4gICAgICAgICAgICAgICAgaWYgKG4gPj0gYmFzZSkgbiA9IGJhc2UgLSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHByb2R1Y3QgPSBkaXZpc29yICogdHJpYWwgZGlnaXQuXHJcbiAgICAgICAgICAgICAgICBwcm9kID0gbXVsdGlwbHkoeWMsIG4sIGJhc2UpO1xyXG4gICAgICAgICAgICAgICAgcHJvZEwgPSBwcm9kLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbXBhcmUgcHJvZHVjdCBhbmQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgcHJvZHVjdCA+IHJlbWFpbmRlciB0aGVuIHRyaWFsIGRpZ2l0IG4gdG9vIGhpZ2guXHJcbiAgICAgICAgICAgICAgICAvLyBuIGlzIDEgdG9vIGhpZ2ggYWJvdXQgNSUgb2YgdGhlIHRpbWUsIGFuZCBpcyBub3Qga25vd24gdG8gaGF2ZVxyXG4gICAgICAgICAgICAgICAgLy8gZXZlciBiZWVuIG1vcmUgdGhhbiAxIHRvbyBoaWdoLlxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbXBhcmUocHJvZCwgcmVtLCBwcm9kTCwgcmVtTCkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICBuLS07XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcHJvZHVjdC5cclxuICAgICAgICAgICAgICAgICAgc3VidHJhY3QocHJvZCwgeUwgPCBwcm9kTCA/IHl6IDogeWMsIHByb2RMLCBiYXNlKTtcclxuICAgICAgICAgICAgICAgICAgcHJvZEwgPSBwcm9kLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgY21wID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG4gaXMgMCBvciAxLCBjbXAgaXMgLTEuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBuIGlzIDAsIHRoZXJlIGlzIG5vIG5lZWQgdG8gY29tcGFyZSB5YyBhbmQgcmVtIGFnYWluIGJlbG93LFxyXG4gICAgICAgICAgICAgICAgLy8gc28gY2hhbmdlIGNtcCB0byAxIHRvIGF2b2lkIGl0LlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgbiBpcyAxLCBsZWF2ZSBjbXAgYXMgLTEsIHNvIHljIGFuZCByZW0gYXJlIGNvbXBhcmVkIGFnYWluLlxyXG4gICAgICAgICAgICAgICAgaWYgKG4gPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gZGl2aXNvciA8IHJlbWFpbmRlciwgc28gbiBtdXN0IGJlIGF0IGxlYXN0IDEuXHJcbiAgICAgICAgICAgICAgICAgIGNtcCA9IG4gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHByb2R1Y3QgPSBkaXZpc29yXHJcbiAgICAgICAgICAgICAgICBwcm9kID0geWMuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAocHJvZEwgPCByZW1MKSBwcm9kID0gWzBdLmNvbmNhdChwcm9kKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gU3VidHJhY3QgcHJvZHVjdCBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICBzdWJ0cmFjdChyZW0sIHByb2QsIHJlbUwsIGJhc2UpO1xyXG4gICAgICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgLy8gSWYgcHJvZHVjdCB3YXMgPCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgaWYgKGNtcCA9PSAtMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbXBhcmUgZGl2aXNvciBhbmQgbmV3IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIC8vIElmIGRpdmlzb3IgPCBuZXcgcmVtYWluZGVyLCBzdWJ0cmFjdCBkaXZpc29yIGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgICAgLy8gVHJpYWwgZGlnaXQgbiB0b28gbG93LlxyXG4gICAgICAgICAgICAgICAgLy8gbiBpcyAxIHRvbyBsb3cgYWJvdXQgNSUgb2YgdGhlIHRpbWUsIGFuZCB2ZXJ5IHJhcmVseSAyIHRvbyBsb3cuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29tcGFyZSh5YywgcmVtLCB5TCwgcmVtTCkgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgIG4rKztcclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgICAgIHN1YnRyYWN0KHJlbSwgeUwgPCByZW1MID8geXogOiB5YywgcmVtTCwgYmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjbXAgPT09IDApIHtcclxuICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgICAgcmVtID0gWzBdO1xyXG4gICAgICAgICAgICB9IC8vIGVsc2UgY21wID09PSAxIGFuZCBuIHdpbGwgYmUgMFxyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBuZXh0IGRpZ2l0LCBuLCB0byB0aGUgcmVzdWx0IGFycmF5LlxyXG4gICAgICAgICAgICBxY1tpKytdID0gbjtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBpZiAocmVtWzBdKSB7XHJcbiAgICAgICAgICAgICAgcmVtW3JlbUwrK10gPSB4Y1t4aV0gfHwgMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZW0gPSBbeGNbeGldXTtcclxuICAgICAgICAgICAgICByZW1MID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSB3aGlsZSAoKHhpKysgPCB4TCB8fCByZW1bMF0gIT0gbnVsbCkgJiYgcy0tKTtcclxuXHJcbiAgICAgICAgICBtb3JlID0gcmVtWzBdICE9IG51bGw7XHJcblxyXG4gICAgICAgICAgLy8gTGVhZGluZyB6ZXJvP1xyXG4gICAgICAgICAgaWYgKCFxY1swXSkgcWMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJhc2UgPT0gQkFTRSkge1xyXG5cclxuICAgICAgICAgIC8vIFRvIGNhbGN1bGF0ZSBxLmUsIGZpcnN0IGdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBxY1swXS5cclxuICAgICAgICAgIGZvciAoaSA9IDEsIHMgPSBxY1swXTsgcyA+PSAxMDsgcyAvPSAxMCwgaSsrKTtcclxuXHJcbiAgICAgICAgICByb3VuZChxLCBkcCArIChxLmUgPSBpICsgZSAqIExPR19CQVNFIC0gMSkgKyAxLCBybSwgbW9yZSk7XHJcblxyXG4gICAgICAgIC8vIENhbGxlciBpcyBjb252ZXJ0QmFzZS5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcS5lID0gZTtcclxuICAgICAgICAgIHEuciA9ICttb3JlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHE7XHJcbiAgICAgIH07XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgQmlnTnVtYmVyIG4gaW4gZml4ZWQtcG9pbnQgb3IgZXhwb25lbnRpYWxcclxuICAgICAqIG5vdGF0aW9uIHJvdW5kZWQgdG8gdGhlIHNwZWNpZmllZCBkZWNpbWFsIHBsYWNlcyBvciBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICAgKlxyXG4gICAgICogbjogYSBCaWdOdW1iZXIuXHJcbiAgICAgKiBpOiB0aGUgaW5kZXggb2YgdGhlIGxhc3QgZGlnaXQgcmVxdWlyZWQgKGkuZS4gdGhlIGRpZ2l0IHRoYXQgbWF5IGJlIHJvdW5kZWQgdXApLlxyXG4gICAgICogcm06IHRoZSByb3VuZGluZyBtb2RlLlxyXG4gICAgICogaWQ6IDEgKHRvRXhwb25lbnRpYWwpIG9yIDIgKHRvUHJlY2lzaW9uKS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZm9ybWF0KG4sIGksIHJtLCBpZCkge1xyXG4gICAgICB2YXIgYzAsIGUsIG5lLCBsZW4sIHN0cjtcclxuXHJcbiAgICAgIGlmIChybSA9PSBudWxsKSBybSA9IFJPVU5ESU5HX01PREU7XHJcbiAgICAgIGVsc2UgaW50Q2hlY2socm0sIDAsIDgpO1xyXG5cclxuICAgICAgaWYgKCFuLmMpIHJldHVybiBuLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICBjMCA9IG4uY1swXTtcclxuICAgICAgbmUgPSBuLmU7XHJcblxyXG4gICAgICBpZiAoaSA9PSBudWxsKSB7XHJcbiAgICAgICAgc3RyID0gY29lZmZUb1N0cmluZyhuLmMpO1xyXG4gICAgICAgIHN0ciA9IGlkID09IDEgfHwgaWQgPT0gMiAmJiBuZSA8PSBUT19FWFBfTkVHXHJcbiAgICAgICAgID8gdG9FeHBvbmVudGlhbChzdHIsIG5lKVxyXG4gICAgICAgICA6IHRvRml4ZWRQb2ludChzdHIsIG5lLCAnMCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG4gPSByb3VuZChuZXcgQmlnTnVtYmVyKG4pLCBpLCBybSk7XHJcblxyXG4gICAgICAgIC8vIG4uZSBtYXkgaGF2ZSBjaGFuZ2VkIGlmIHRoZSB2YWx1ZSB3YXMgcm91bmRlZCB1cC5cclxuICAgICAgICBlID0gbi5lO1xyXG5cclxuICAgICAgICBzdHIgPSBjb2VmZlRvU3RyaW5nKG4uYyk7XHJcbiAgICAgICAgbGVuID0gc3RyLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8gdG9QcmVjaXNpb24gcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbiBpZiB0aGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gICAgICAgIC8vIHNwZWNpZmllZCBpcyBsZXNzIHRoYW4gdGhlIG51bWJlciBvZiBkaWdpdHMgbmVjZXNzYXJ5IHRvIHJlcHJlc2VudCB0aGUgaW50ZWdlclxyXG4gICAgICAgIC8vIHBhcnQgb2YgdGhlIHZhbHVlIGluIGZpeGVkLXBvaW50IG5vdGF0aW9uLlxyXG5cclxuICAgICAgICAvLyBFeHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAgICBpZiAoaWQgPT0gMSB8fCBpZCA9PSAyICYmIChpIDw9IGUgfHwgZSA8PSBUT19FWFBfTkVHKSkge1xyXG5cclxuICAgICAgICAgIC8vIEFwcGVuZCB6ZXJvcz9cclxuICAgICAgICAgIGZvciAoOyBsZW4gPCBpOyBzdHIgKz0gJzAnLCBsZW4rKyk7XHJcbiAgICAgICAgICBzdHIgPSB0b0V4cG9uZW50aWFsKHN0ciwgZSk7XHJcblxyXG4gICAgICAgIC8vIEZpeGVkLXBvaW50IG5vdGF0aW9uLlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpIC09IG5lO1xyXG4gICAgICAgICAgc3RyID0gdG9GaXhlZFBvaW50KHN0ciwgZSwgJzAnKTtcclxuXHJcbiAgICAgICAgICAvLyBBcHBlbmQgemVyb3M/XHJcbiAgICAgICAgICBpZiAoZSArIDEgPiBsZW4pIHtcclxuICAgICAgICAgICAgaWYgKC0taSA+IDApIGZvciAoc3RyICs9ICcuJzsgaS0tOyBzdHIgKz0gJzAnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGkgKz0gZSAtIGxlbjtcclxuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGUgKyAxID09IGxlbikgc3RyICs9ICcuJztcclxuICAgICAgICAgICAgICBmb3IgKDsgaS0tOyBzdHIgKz0gJzAnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG4ucyA8IDAgJiYgYzAgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEhhbmRsZSBCaWdOdW1iZXIubWF4IGFuZCBCaWdOdW1iZXIubWluLlxyXG4gICAgZnVuY3Rpb24gbWF4T3JNaW4oYXJncywgbWV0aG9kKSB7XHJcbiAgICAgIHZhciBtLCBuLFxyXG4gICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgaWYgKGlzQXJyYXkoYXJnc1swXSkpIGFyZ3MgPSBhcmdzWzBdO1xyXG4gICAgICBtID0gbmV3IEJpZ051bWJlcihhcmdzWzBdKTtcclxuXHJcbiAgICAgIGZvciAoOyArK2kgPCBhcmdzLmxlbmd0aDspIHtcclxuICAgICAgICBuID0gbmV3IEJpZ051bWJlcihhcmdzW2ldKTtcclxuXHJcbiAgICAgICAgLy8gSWYgYW55IG51bWJlciBpcyBOYU4sIHJldHVybiBOYU4uXHJcbiAgICAgICAgaWYgKCFuLnMpIHtcclxuICAgICAgICAgIG0gPSBuO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QuY2FsbChtLCBuKSkge1xyXG4gICAgICAgICAgbSA9IG47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFN0cmlwIHRyYWlsaW5nIHplcm9zLCBjYWxjdWxhdGUgYmFzZSAxMCBleHBvbmVudCBhbmQgY2hlY2sgYWdhaW5zdCBNSU5fRVhQIGFuZCBNQVhfRVhQLlxyXG4gICAgICogQ2FsbGVkIGJ5IG1pbnVzLCBwbHVzIGFuZCB0aW1lcy5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbm9ybWFsaXNlKG4sIGMsIGUpIHtcclxuICAgICAgdmFyIGkgPSAxLFxyXG4gICAgICAgIGogPSBjLmxlbmd0aDtcclxuXHJcbiAgICAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgIGZvciAoOyAhY1stLWpdOyBjLnBvcCgpKTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgYmFzZSAxMCBleHBvbmVudC4gRmlyc3QgZ2V0IHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIGNbMF0uXHJcbiAgICAgIGZvciAoaiA9IGNbMF07IGogPj0gMTA7IGogLz0gMTAsIGkrKyk7XHJcblxyXG4gICAgICAvLyBPdmVyZmxvdz9cclxuICAgICAgaWYgKChlID0gaSArIGUgKiBMT0dfQkFTRSAtIDEpID4gTUFYX0VYUCkge1xyXG5cclxuICAgICAgICAvLyBJbmZpbml0eS5cclxuICAgICAgICBuLmMgPSBuLmUgPSBudWxsO1xyXG5cclxuICAgICAgLy8gVW5kZXJmbG93P1xyXG4gICAgICB9IGVsc2UgaWYgKGUgPCBNSU5fRVhQKSB7XHJcblxyXG4gICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgbi5jID0gW24uZSA9IDBdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG4uZSA9IGU7XHJcbiAgICAgICAgbi5jID0gYztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEhhbmRsZSB2YWx1ZXMgdGhhdCBmYWlsIHRoZSB2YWxpZGl0eSB0ZXN0IGluIEJpZ051bWJlci5cclxuICAgIHBhcnNlTnVtZXJpYyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBiYXNlUHJlZml4ID0gL14oLT8pMChbeGJvXSkoPz1cXHdbXFx3Ll0qJCkvaSxcclxuICAgICAgICBkb3RBZnRlciA9IC9eKFteLl0rKVxcLiQvLFxyXG4gICAgICAgIGRvdEJlZm9yZSA9IC9eXFwuKFteLl0rKSQvLFxyXG4gICAgICAgIGlzSW5maW5pdHlPck5hTiA9IC9eLT8oSW5maW5pdHl8TmFOKSQvLFxyXG4gICAgICAgIHdoaXRlc3BhY2VPclBsdXMgPSAvXlxccypcXCsoPz1bXFx3Ll0pfF5cXHMrfFxccyskL2c7XHJcblxyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHgsIHN0ciwgaXNOdW0sIGIpIHtcclxuICAgICAgICB2YXIgYmFzZSxcclxuICAgICAgICAgIHMgPSBpc051bSA/IHN0ciA6IHN0ci5yZXBsYWNlKHdoaXRlc3BhY2VPclBsdXMsICcnKTtcclxuXHJcbiAgICAgICAgLy8gTm8gZXhjZXB0aW9uIG9uIOWNpEluZmluaXR5IG9yIE5hTi5cclxuICAgICAgICBpZiAoaXNJbmZpbml0eU9yTmFOLnRlc3QocykpIHtcclxuICAgICAgICAgIHgucyA9IGlzTmFOKHMpID8gbnVsbCA6IHMgPCAwID8gLTEgOiAxO1xyXG4gICAgICAgICAgeC5jID0geC5lID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKCFpc051bSkge1xyXG5cclxuICAgICAgICAgICAgLy8gYmFzZVByZWZpeCA9IC9eKC0/KTAoW3hib10pKD89XFx3W1xcdy5dKiQpL2lcclxuICAgICAgICAgICAgcyA9IHMucmVwbGFjZShiYXNlUHJlZml4LCBmdW5jdGlvbiAobSwgcDEsIHAyKSB7XHJcbiAgICAgICAgICAgICAgYmFzZSA9IChwMiA9IHAyLnRvTG93ZXJDYXNlKCkpID09ICd4JyA/IDE2IDogcDIgPT0gJ2InID8gMiA6IDg7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICFiIHx8IGIgPT0gYmFzZSA/IHAxIDogbTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYikge1xyXG4gICAgICAgICAgICAgIGJhc2UgPSBiO1xyXG5cclxuICAgICAgICAgICAgICAvLyBFLmcuICcxLicgdG8gJzEnLCAnLjEnIHRvICcwLjEnXHJcbiAgICAgICAgICAgICAgcyA9IHMucmVwbGFjZShkb3RBZnRlciwgJyQxJykucmVwbGFjZShkb3RCZWZvcmUsICcwLiQxJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdHIgIT0gcykgcmV0dXJuIG5ldyBCaWdOdW1iZXIocywgYmFzZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE5vdCBhIG51bWJlcjoge259J1xyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE5vdCBhIGJhc2Uge2J9IG51bWJlcjoge259J1xyXG4gICAgICAgICAgaWYgKEJpZ051bWJlci5ERUJVRykge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdOb3QgYScgKyAoYiA/ICcgYmFzZSAnICsgYiA6ICcnKSArICcgbnVtYmVyOiAnICsgc3RyKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBOYU5cclxuICAgICAgICAgIHguYyA9IHguZSA9IHgucyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUm91bmQgeCB0byBzZCBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBybS4gQ2hlY2sgZm9yIG92ZXIvdW5kZXItZmxvdy5cclxuICAgICAqIElmIHIgaXMgdHJ1dGh5LCBpdCBpcyBrbm93biB0aGF0IHRoZXJlIGFyZSBtb3JlIGRpZ2l0cyBhZnRlciB0aGUgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJvdW5kKHgsIHNkLCBybSwgcikge1xyXG4gICAgICB2YXIgZCwgaSwgaiwgaywgbiwgbmksIHJkLFxyXG4gICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgIHBvd3MxMCA9IFBPV1NfVEVOO1xyXG5cclxuICAgICAgLy8gaWYgeCBpcyBub3QgSW5maW5pdHkgb3IgTmFOLi4uXHJcbiAgICAgIGlmICh4Yykge1xyXG5cclxuICAgICAgICAvLyByZCBpcyB0aGUgcm91bmRpbmcgZGlnaXQsIGkuZS4gdGhlIGRpZ2l0IGFmdGVyIHRoZSBkaWdpdCB0aGF0IG1heSBiZSByb3VuZGVkIHVwLlxyXG4gICAgICAgIC8vIG4gaXMgYSBiYXNlIDFlMTQgbnVtYmVyLCB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQgb2YgYXJyYXkgeC5jIGNvbnRhaW5pbmcgcmQuXHJcbiAgICAgICAgLy8gbmkgaXMgdGhlIGluZGV4IG9mIG4gd2l0aGluIHguYy5cclxuICAgICAgICAvLyBkIGlzIHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIG4uXHJcbiAgICAgICAgLy8gaSBpcyB0aGUgaW5kZXggb2YgcmQgd2l0aGluIG4gaW5jbHVkaW5nIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgICAgLy8gaiBpcyB0aGUgYWN0dWFsIGluZGV4IG9mIHJkIHdpdGhpbiBuIChpZiA8IDAsIHJkIGlzIGEgbGVhZGluZyB6ZXJvKS5cclxuICAgICAgICBvdXQ6IHtcclxuXHJcbiAgICAgICAgICAvLyBHZXQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgdGhlIGZpcnN0IGVsZW1lbnQgb2YgeGMuXHJcbiAgICAgICAgICBmb3IgKGQgPSAxLCBrID0geGNbMF07IGsgPj0gMTA7IGsgLz0gMTAsIGQrKyk7XHJcbiAgICAgICAgICBpID0gc2QgLSBkO1xyXG5cclxuICAgICAgICAgIC8vIElmIHRoZSByb3VuZGluZyBkaWdpdCBpcyBpbiB0aGUgZmlyc3QgZWxlbWVudCBvZiB4Yy4uLlxyXG4gICAgICAgICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgICAgICAgIGkgKz0gTE9HX0JBU0U7XHJcbiAgICAgICAgICAgIGogPSBzZDtcclxuICAgICAgICAgICAgbiA9IHhjW25pID0gMF07XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHJvdW5kaW5nIGRpZ2l0IGF0IGluZGV4IGogb2Ygbi5cclxuICAgICAgICAgICAgcmQgPSBuIC8gcG93czEwW2QgLSBqIC0gMV0gJSAxMCB8IDA7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuaSA9IG1hdGhjZWlsKChpICsgMSkgLyBMT0dfQkFTRSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobmkgPj0geGMubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTmVlZGVkIGJ5IHNxcnQuXHJcbiAgICAgICAgICAgICAgICBmb3IgKDsgeGMubGVuZ3RoIDw9IG5pOyB4Yy5wdXNoKDApKTtcclxuICAgICAgICAgICAgICAgIG4gPSByZCA9IDA7XHJcbiAgICAgICAgICAgICAgICBkID0gMTtcclxuICAgICAgICAgICAgICAgIGkgJT0gTE9HX0JBU0U7XHJcbiAgICAgICAgICAgICAgICBqID0gaSAtIExPR19CQVNFICsgMTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnJlYWsgb3V0O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBuID0gayA9IHhjW25pXTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gR2V0IHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIG4uXHJcbiAgICAgICAgICAgICAgZm9yIChkID0gMTsgayA+PSAxMDsgayAvPSAxMCwgZCsrKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbmRleCBvZiByZCB3aXRoaW4gbi5cclxuICAgICAgICAgICAgICBpICU9IExPR19CQVNFO1xyXG5cclxuICAgICAgICAgICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHJkIHdpdGhpbiBuLCBhZGp1c3RlZCBmb3IgbGVhZGluZyB6ZXJvcy5cclxuICAgICAgICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIGxlYWRpbmcgemVyb3Mgb2YgbiBpcyBnaXZlbiBieSBMT0dfQkFTRSAtIGQuXHJcbiAgICAgICAgICAgICAgaiA9IGkgLSBMT0dfQkFTRSArIGQ7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEdldCB0aGUgcm91bmRpbmcgZGlnaXQgYXQgaW5kZXggaiBvZiBuLlxyXG4gICAgICAgICAgICAgIHJkID0gaiA8IDAgPyAwIDogbiAvIHBvd3MxMFtkIC0gaiAtIDFdICUgMTAgfCAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgciA9IHIgfHwgc2QgPCAwIHx8XHJcblxyXG4gICAgICAgICAgLy8gQXJlIHRoZXJlIGFueSBub24temVybyBkaWdpdHMgYWZ0ZXIgdGhlIHJvdW5kaW5nIGRpZ2l0P1xyXG4gICAgICAgICAgLy8gVGhlIGV4cHJlc3Npb24gIG4gJSBwb3dzMTBbZCAtIGogLSAxXSAgcmV0dXJucyBhbGwgZGlnaXRzIG9mIG4gdG8gdGhlIHJpZ2h0XHJcbiAgICAgICAgICAvLyBvZiB0aGUgZGlnaXQgYXQgaiwgZS5nLiBpZiBuIGlzIDkwODcxNCBhbmQgaiBpcyAyLCB0aGUgZXhwcmVzc2lvbiBnaXZlcyA3MTQuXHJcbiAgICAgICAgICAgeGNbbmkgKyAxXSAhPSBudWxsIHx8IChqIDwgMCA/IG4gOiBuICUgcG93czEwW2QgLSBqIC0gMV0pO1xyXG5cclxuICAgICAgICAgIHIgPSBybSA8IDRcclxuICAgICAgICAgICA/IChyZCB8fCByKSAmJiAocm0gPT0gMCB8fCBybSA9PSAoeC5zIDwgMCA/IDMgOiAyKSlcclxuICAgICAgICAgICA6IHJkID4gNSB8fCByZCA9PSA1ICYmIChybSA9PSA0IHx8IHIgfHwgcm0gPT0gNiAmJlxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgZGlnaXQgdG8gdGhlIGxlZnQgb2YgdGhlIHJvdW5kaW5nIGRpZ2l0IGlzIG9kZC5cclxuICAgICAgICAgICAgKChpID4gMCA/IGogPiAwID8gbiAvIHBvd3MxMFtkIC0gal0gOiAwIDogeGNbbmkgLSAxXSkgJSAxMCkgJiAxIHx8XHJcbiAgICAgICAgICAgICBybSA9PSAoeC5zIDwgMCA/IDggOiA3KSk7XHJcblxyXG4gICAgICAgICAgaWYgKHNkIDwgMSB8fCAheGNbMF0pIHtcclxuICAgICAgICAgICAgeGMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChyKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIENvbnZlcnQgc2QgdG8gZGVjaW1hbCBwbGFjZXMuXHJcbiAgICAgICAgICAgICAgc2QgLT0geC5lICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gMSwgMC4xLCAwLjAxLCAwLjAwMSwgMC4wMDAxIGV0Yy5cclxuICAgICAgICAgICAgICB4Y1swXSA9IHBvd3MxMFsoTE9HX0JBU0UgLSBzZCAlIExPR19CQVNFKSAlIExPR19CQVNFXTtcclxuICAgICAgICAgICAgICB4LmUgPSAtc2QgfHwgMDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gWmVyby5cclxuICAgICAgICAgICAgICB4Y1swXSA9IHguZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJlbW92ZSBleGNlc3MgZGlnaXRzLlxyXG4gICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICB4Yy5sZW5ndGggPSBuaTtcclxuICAgICAgICAgICAgayA9IDE7XHJcbiAgICAgICAgICAgIG5pLS07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4Yy5sZW5ndGggPSBuaSArIDE7XHJcbiAgICAgICAgICAgIGsgPSBwb3dzMTBbTE9HX0JBU0UgLSBpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEUuZy4gNTY3MDAgYmVjb21lcyA1NjAwMCBpZiA3IGlzIHRoZSByb3VuZGluZyBkaWdpdC5cclxuICAgICAgICAgICAgLy8gaiA+IDAgbWVhbnMgaSA+IG51bWJlciBvZiBsZWFkaW5nIHplcm9zIG9mIG4uXHJcbiAgICAgICAgICAgIHhjW25pXSA9IGogPiAwID8gbWF0aGZsb29yKG4gLyBwb3dzMTBbZCAtIGpdICUgcG93czEwW2pdKSAqIGsgOiAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJvdW5kIHVwP1xyXG4gICAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAoOyA7KSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIElmIHRoZSBkaWdpdCB0byBiZSByb3VuZGVkIHVwIGlzIGluIHRoZSBmaXJzdCBlbGVtZW50IG9mIHhjLi4uXHJcbiAgICAgICAgICAgICAgaWYgKG5pID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpIHdpbGwgYmUgdGhlIGxlbmd0aCBvZiB4Y1swXSBiZWZvcmUgayBpcyBhZGRlZC5cclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDEsIGogPSB4Y1swXTsgaiA+PSAxMDsgaiAvPSAxMCwgaSsrKTtcclxuICAgICAgICAgICAgICAgIGogPSB4Y1swXSArPSBrO1xyXG4gICAgICAgICAgICAgICAgZm9yIChrID0gMTsgaiA+PSAxMDsgaiAvPSAxMCwgaysrKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBpICE9IGsgdGhlIGxlbmd0aCBoYXMgaW5jcmVhc2VkLlxyXG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gaykge1xyXG4gICAgICAgICAgICAgICAgICB4LmUrKztcclxuICAgICAgICAgICAgICAgICAgaWYgKHhjWzBdID09IEJBU0UpIHhjWzBdID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeGNbbmldICs9IGs7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGNbbmldICE9IEJBU0UpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgeGNbbmktLV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgayA9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICAgICAgZm9yIChpID0geGMubGVuZ3RoOyB4Y1stLWldID09PSAwOyB4Yy5wb3AoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPdmVyZmxvdz8gSW5maW5pdHkuXHJcbiAgICAgICAgaWYgKHguZSA+IE1BWF9FWFApIHtcclxuICAgICAgICAgIHguYyA9IHguZSA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIFVuZGVyZmxvdz8gWmVyby5cclxuICAgICAgICB9IGVsc2UgaWYgKHguZSA8IE1JTl9FWFApIHtcclxuICAgICAgICAgIHguYyA9IFt4LmUgPSAwXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBQUk9UT1RZUEUvSU5TVEFOQ0UgTUVUSE9EU1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgYWJzb2x1dGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIuXHJcbiAgICAgKi9cclxuICAgIFAuYWJzb2x1dGVWYWx1ZSA9IFAuYWJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgeCA9IG5ldyBCaWdOdW1iZXIodGhpcyk7XHJcbiAgICAgIGlmICh4LnMgPCAwKSB4LnMgPSAxO1xyXG4gICAgICByZXR1cm4geDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm5cclxuICAgICAqICAgMSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICAgKiAgIC0xIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBsZXNzIHRoYW4gdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKSxcclxuICAgICAqICAgMCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgdmFsdWUsXHJcbiAgICAgKiAgIG9yIG51bGwgaWYgdGhlIHZhbHVlIG9mIGVpdGhlciBpcyBOYU4uXHJcbiAgICAgKi9cclxuICAgIFAuY29tcGFyZWRUbyA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIElmIGRwIGlzIHVuZGVmaW5lZCBvciBudWxsIG9yIHRydWUgb3IgZmFsc2UsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIG9mIHRoZVxyXG4gICAgICogdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIsIG9yIG51bGwgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIOWNpEluZmluaXR5IG9yIE5hTi5cclxuICAgICAqXHJcbiAgICAgKiBPdGhlcndpc2UsIGlmIGRwIGlzIGEgbnVtYmVyLCByZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzXHJcbiAgICAgKiBCaWdOdW1iZXIgcm91bmRlZCB0byBhIG1heGltdW0gb2YgZHAgZGVjaW1hbCBwbGFjZXMgdXNpbmcgcm91bmRpbmcgbW9kZSBybSwgb3JcclxuICAgICAqIFJPVU5ESU5HX01PREUgaWYgcm0gaXMgb21pdHRlZC5cclxuICAgICAqXHJcbiAgICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzOiBpbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtkcHxybX0nXHJcbiAgICAgKi9cclxuICAgIFAuZGVjaW1hbFBsYWNlcyA9IFAuZHAgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICAgIHZhciBjLCBuLCB2LFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgaWYgKGRwICE9IG51bGwpIHtcclxuICAgICAgICBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuICAgICAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgICAgIGVsc2UgaW50Q2hlY2socm0sIDAsIDgpO1xyXG5cclxuICAgICAgICByZXR1cm4gcm91bmQobmV3IEJpZ051bWJlcih4KSwgZHAgKyB4LmUgKyAxLCBybSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghKGMgPSB4LmMpKSByZXR1cm4gbnVsbDtcclxuICAgICAgbiA9ICgodiA9IGMubGVuZ3RoIC0gMSkgLSBiaXRGbG9vcih0aGlzLmUgLyBMT0dfQkFTRSkpICogTE9HX0JBU0U7XHJcblxyXG4gICAgICAvLyBTdWJ0cmFjdCB0aGUgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zIG9mIHRoZSBsYXN0IG51bWJlci5cclxuICAgICAgaWYgKHYgPSBjW3ZdKSBmb3IgKDsgdiAlIDEwID09IDA7IHYgLz0gMTAsIG4tLSk7XHJcbiAgICAgIGlmIChuIDwgMCkgbiA9IDA7XHJcblxyXG4gICAgICByZXR1cm4gbjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAgbiAvIDAgPSBJXHJcbiAgICAgKiAgbiAvIE4gPSBOXHJcbiAgICAgKiAgbiAvIEkgPSAwXHJcbiAgICAgKiAgMCAvIG4gPSAwXHJcbiAgICAgKiAgMCAvIDAgPSBOXHJcbiAgICAgKiAgMCAvIE4gPSBOXHJcbiAgICAgKiAgMCAvIEkgPSAwXHJcbiAgICAgKiAgTiAvIG4gPSBOXHJcbiAgICAgKiAgTiAvIDAgPSBOXHJcbiAgICAgKiAgTiAvIE4gPSBOXHJcbiAgICAgKiAgTiAvIEkgPSBOXHJcbiAgICAgKiAgSSAvIG4gPSBJXHJcbiAgICAgKiAgSSAvIDAgPSBJXHJcbiAgICAgKiAgSSAvIE4gPSBOXHJcbiAgICAgKiAgSSAvIEkgPSBOXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgZGl2aWRlZCBieSB0aGUgdmFsdWUgb2ZcclxuICAgICAqIEJpZ051bWJlcih5LCBiKSwgcm91bmRlZCBhY2NvcmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYW5kIFJPVU5ESU5HX01PREUuXHJcbiAgICAgKi9cclxuICAgIFAuZGl2aWRlZEJ5ID0gUC5kaXYgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICByZXR1cm4gZGl2KHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYiksIERFQ0lNQUxfUExBQ0VTLCBST1VORElOR19NT0RFKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSBpbnRlZ2VyIHBhcnQgb2YgZGl2aWRpbmcgdGhlIHZhbHVlIG9mIHRoaXNcclxuICAgICAqIEJpZ051bWJlciBieSB0aGUgdmFsdWUgb2YgQmlnTnVtYmVyKHksIGIpLlxyXG4gICAgICovXHJcbiAgICBQLmRpdmlkZWRUb0ludGVnZXJCeSA9IFAuaWRpdiA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBkaXYodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSwgMCwgMSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBleHBvbmVudGlhdGVkIGJ5IG4uXHJcbiAgICAgKlxyXG4gICAgICogSWYgbSBpcyBwcmVzZW50LCByZXR1cm4gdGhlIHJlc3VsdCBtb2R1bG8gbS5cclxuICAgICAqIElmIG4gaXMgbmVnYXRpdmUgcm91bmQgYWNjb3JkaW5nIHRvIERFQ0lNQUxfUExBQ0VTIGFuZCBST1VORElOR19NT0RFLlxyXG4gICAgICogSWYgUE9XX1BSRUNJU0lPTiBpcyBub24temVybyBhbmQgbSBpcyBub3QgcHJlc2VudCwgcm91bmQgdG8gUE9XX1BSRUNJU0lPTiB1c2luZyBST1VORElOR19NT0RFLlxyXG4gICAgICpcclxuICAgICAqIFRoZSBtb2R1bGFyIHBvd2VyIG9wZXJhdGlvbiB3b3JrcyBlZmZpY2llbnRseSB3aGVuIHgsIG4sIGFuZCBtIGFyZSBpbnRlZ2Vycywgb3RoZXJ3aXNlIGl0XHJcbiAgICAgKiBpcyBlcXVpdmFsZW50IHRvIGNhbGN1bGF0aW5nIHguZXhwb25lbnRpYXRlZEJ5KG4pLm1vZHVsbyhtKSB3aXRoIGEgUE9XX1BSRUNJU0lPTiBvZiAwLlxyXG4gICAgICpcclxuICAgICAqIG4ge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfSBUaGUgZXhwb25lbnQuIEFuIGludGVnZXIuXHJcbiAgICAgKiBbbV0ge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfSBUaGUgbW9kdWx1cy5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gRXhwb25lbnQgbm90IGFuIGludGVnZXI6IHtufSdcclxuICAgICAqL1xyXG4gICAgUC5leHBvbmVudGlhdGVkQnkgPSBQLnBvdyA9IGZ1bmN0aW9uIChuLCBtKSB7XHJcbiAgICAgIHZhciBoYWxmLCBpc01vZEV4cCwgaywgbW9yZSwgbklzQmlnLCBuSXNOZWcsIG5Jc09kZCwgeSxcclxuICAgICAgICB4ID0gdGhpcztcclxuXHJcbiAgICAgIG4gPSBuZXcgQmlnTnVtYmVyKG4pO1xyXG5cclxuICAgICAgLy8gQWxsb3cgTmFOIGFuZCDljaRJbmZpbml0eSwgYnV0IG5vdCBvdGhlciBub24taW50ZWdlcnMuXHJcbiAgICAgIGlmIChuLmMgJiYgIW4uaXNJbnRlZ2VyKCkpIHtcclxuICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ0V4cG9uZW50IG5vdCBhbiBpbnRlZ2VyOiAnICsgbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChtICE9IG51bGwpIG0gPSBuZXcgQmlnTnVtYmVyKG0pO1xyXG5cclxuICAgICAgLy8gRXhwb25lbnQgb2YgTUFYX1NBRkVfSU5URUdFUiBpcyAxNS5cclxuICAgICAgbklzQmlnID0gbi5lID4gMTQ7XHJcblxyXG4gICAgICAvLyBJZiB4IGlzIE5hTiwg5Y2kSW5maW5pdHksIOWNpDAgb3Ig5Y2kMSwgb3IgbiBpcyDljaRJbmZpbml0eSwgTmFOIG9yIOWNpDAuXHJcbiAgICAgIGlmICgheC5jIHx8ICF4LmNbMF0gfHwgeC5jWzBdID09IDEgJiYgIXguZSAmJiB4LmMubGVuZ3RoID09IDEgfHwgIW4uYyB8fCAhbi5jWzBdKSB7XHJcblxyXG4gICAgICAgIC8vIFRoZSBzaWduIG9mIHRoZSByZXN1bHQgb2YgcG93IHdoZW4geCBpcyBuZWdhdGl2ZSBkZXBlbmRzIG9uIHRoZSBldmVubmVzcyBvZiBuLlxyXG4gICAgICAgIC8vIElmICtuIG92ZXJmbG93cyB0byDljaRJbmZpbml0eSwgdGhlIGV2ZW5uZXNzIG9mIG4gd291bGQgYmUgbm90IGJlIGtub3duLlxyXG4gICAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKE1hdGgucG93KCt4LnZhbHVlT2YoKSwgbklzQmlnID8gMiAtIGlzT2RkKG4pIDogK24pKTtcclxuICAgICAgICByZXR1cm4gbSA/IHkubW9kKG0pIDogeTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbklzTmVnID0gbi5zIDwgMDtcclxuXHJcbiAgICAgIGlmIChtKSB7XHJcblxyXG4gICAgICAgIC8vIHggJSBtIHJldHVybnMgTmFOIGlmIGFicyhtKSBpcyB6ZXJvLCBvciBtIGlzIE5hTi5cclxuICAgICAgICBpZiAobS5jID8gIW0uY1swXSA6ICFtLnMpIHJldHVybiBuZXcgQmlnTnVtYmVyKE5hTik7XHJcblxyXG4gICAgICAgIGlzTW9kRXhwID0gIW5Jc05lZyAmJiB4LmlzSW50ZWdlcigpICYmIG0uaXNJbnRlZ2VyKCk7XHJcblxyXG4gICAgICAgIGlmIChpc01vZEV4cCkgeCA9IHgubW9kKG0pO1xyXG5cclxuICAgICAgLy8gT3ZlcmZsb3cgdG8g5Y2kSW5maW5pdHk6ID49MioqMWUxMCBvciA+PTEuMDAwMDAyNCoqMWUxNS5cclxuICAgICAgLy8gVW5kZXJmbG93IHRvIOWNpDA6IDw9MC43OSoqMWUxMCBvciA8PTAuOTk5OTk3NSoqMWUxNS5cclxuICAgICAgfSBlbHNlIGlmIChuLmUgPiA5ICYmICh4LmUgPiAwIHx8IHguZSA8IC0xIHx8ICh4LmUgPT0gMFxyXG4gICAgICAgIC8vIFsxLCAyNDAwMDAwMDBdXHJcbiAgICAgICAgPyB4LmNbMF0gPiAxIHx8IG5Jc0JpZyAmJiB4LmNbMV0gPj0gMjRlN1xyXG4gICAgICAgIC8vIFs4MDAwMDAwMDAwMDAwMF0gIFs5OTk5OTc1MDAwMDAwMF1cclxuICAgICAgICA6IHguY1swXSA8IDhlMTMgfHwgbklzQmlnICYmIHguY1swXSA8PSA5OTk5OTc1ZTcpKSkge1xyXG5cclxuICAgICAgICAvLyBJZiB4IGlzIG5lZ2F0aXZlIGFuZCBuIGlzIG9kZCwgayA9IC0wLCBlbHNlIGsgPSAwLlxyXG4gICAgICAgIGsgPSB4LnMgPCAwICYmIGlzT2RkKG4pID8gLTAgOiAwO1xyXG5cclxuICAgICAgICAvLyBJZiB4ID49IDEsIGsgPSDljaRJbmZpbml0eS5cclxuICAgICAgICBpZiAoeC5lID4gLTEpIGsgPSAxIC8gaztcclxuXHJcbiAgICAgICAgLy8gSWYgbiBpcyBuZWdhdGl2ZSByZXR1cm4g5Y2kMCwgZWxzZSByZXR1cm4g5Y2kSW5maW5pdHkuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIobklzTmVnID8gMSAvIGsgOiBrKTtcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAoUE9XX1BSRUNJU0lPTikge1xyXG5cclxuICAgICAgICAvLyBUcnVuY2F0aW5nIGVhY2ggY29lZmZpY2llbnQgYXJyYXkgdG8gYSBsZW5ndGggb2YgayBhZnRlciBlYWNoIG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgLy8gZXF1YXRlcyB0byB0cnVuY2F0aW5nIHNpZ25pZmljYW50IGRpZ2l0cyB0byBQT1dfUFJFQ0lTSU9OICsgWzI4LCA0MV0sXHJcbiAgICAgICAgLy8gaS5lLiB0aGVyZSB3aWxsIGJlIGEgbWluaW11bSBvZiAyOCBndWFyZCBkaWdpdHMgcmV0YWluZWQuXHJcbiAgICAgICAgayA9IG1hdGhjZWlsKFBPV19QUkVDSVNJT04gLyBMT0dfQkFTRSArIDIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobklzQmlnKSB7XHJcbiAgICAgICAgaGFsZiA9IG5ldyBCaWdOdW1iZXIoMC41KTtcclxuICAgICAgICBuSXNPZGQgPSBpc09kZChuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuSXNPZGQgPSBuICUgMjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG5Jc05lZykgbi5zID0gMTtcclxuXHJcbiAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKE9ORSk7XHJcblxyXG4gICAgICAvLyBQZXJmb3JtcyA1NCBsb29wIGl0ZXJhdGlvbnMgZm9yIG4gb2YgOTAwNzE5OTI1NDc0MDk5MS5cclxuICAgICAgZm9yICg7IDspIHtcclxuXHJcbiAgICAgICAgaWYgKG5Jc09kZCkge1xyXG4gICAgICAgICAgeSA9IHkudGltZXMoeCk7XHJcbiAgICAgICAgICBpZiAoIXkuYykgYnJlYWs7XHJcblxyXG4gICAgICAgICAgaWYgKGspIHtcclxuICAgICAgICAgICAgaWYgKHkuYy5sZW5ndGggPiBrKSB5LmMubGVuZ3RoID0gaztcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNNb2RFeHApIHtcclxuICAgICAgICAgICAgeSA9IHkubW9kKG0pOyAgICAvL3kgPSB5Lm1pbnVzKGRpdih5LCBtLCAwLCBNT0RVTE9fTU9ERSkudGltZXMobSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5Jc0JpZykge1xyXG4gICAgICAgICAgbiA9IG4udGltZXMoaGFsZik7XHJcbiAgICAgICAgICByb3VuZChuLCBuLmUgKyAxLCAxKTtcclxuICAgICAgICAgIGlmICghbi5jWzBdKSBicmVhaztcclxuICAgICAgICAgIG5Jc0JpZyA9IG4uZSA+IDE0O1xyXG4gICAgICAgICAgbklzT2RkID0gaXNPZGQobik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG4gPSBtYXRoZmxvb3IobiAvIDIpO1xyXG4gICAgICAgICAgaWYgKCFuKSBicmVhaztcclxuICAgICAgICAgIG5Jc09kZCA9IG4gJSAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgeCA9IHgudGltZXMoeCk7XHJcblxyXG4gICAgICAgIGlmIChrKSB7XHJcbiAgICAgICAgICBpZiAoeC5jICYmIHguYy5sZW5ndGggPiBrKSB4LmMubGVuZ3RoID0gaztcclxuICAgICAgICB9IGVsc2UgaWYgKGlzTW9kRXhwKSB7XHJcbiAgICAgICAgICB4ID0geC5tb2QobSk7ICAgIC8veCA9IHgubWludXMoZGl2KHgsIG0sIDAsIE1PRFVMT19NT0RFKS50aW1lcyhtKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNNb2RFeHApIHJldHVybiB5O1xyXG4gICAgICBpZiAobklzTmVnKSB5ID0gT05FLmRpdih5KTtcclxuXHJcbiAgICAgIHJldHVybiBtID8geS5tb2QobSkgOiBrID8gcm91bmQoeSwgUE9XX1BSRUNJU0lPTiwgUk9VTkRJTkdfTU9ERSwgbW9yZSkgOiB5O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIHJvdW5kZWQgdG8gYW4gaW50ZWdlclxyXG4gICAgICogdXNpbmcgcm91bmRpbmcgbW9kZSBybSwgb3IgUk9VTkRJTkdfTU9ERSBpZiBybSBpcyBvbWl0dGVkLlxyXG4gICAgICpcclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3JtfSdcclxuICAgICAqL1xyXG4gICAgUC5pbnRlZ2VyVmFsdWUgPSBmdW5jdGlvbiAocm0pIHtcclxuICAgICAgdmFyIG4gPSBuZXcgQmlnTnVtYmVyKHRoaXMpO1xyXG4gICAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgICBlbHNlIGludENoZWNrKHJtLCAwLCA4KTtcclxuICAgICAgcmV0dXJuIHJvdW5kKG4sIG4uZSArIDEsIHJtKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKSxcclxuICAgICAqIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNFcXVhbFRvID0gUC5lcSA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpID09PSAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBhIGZpbml0ZSBudW1iZXIsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNGaW5pdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAhIXRoaXMuYztcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICAgKiBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzR3JlYXRlclRoYW4gPSBQLmd0ID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkgPiAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHZhbHVlIG9mXHJcbiAgICAgKiBCaWdOdW1iZXIoeSwgYiksIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNHcmVhdGVyVGhhbk9yRXF1YWxUbyA9IFAuZ3RlID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIChiID0gY29tcGFyZSh0aGlzLCBuZXcgQmlnTnVtYmVyKHksIGIpKSkgPT09IDEgfHwgYiA9PT0gMDtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGFuIGludGVnZXIsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNJbnRlZ2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gISF0aGlzLmMgJiYgYml0Rmxvb3IodGhpcy5lIC8gTE9HX0JBU0UpID4gdGhpcy5jLmxlbmd0aCAtIDI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGxlc3MgdGhhbiB0aGUgdmFsdWUgb2YgQmlnTnVtYmVyKHksIGIpLFxyXG4gICAgICogb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc0xlc3NUaGFuID0gUC5sdCA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpIDwgMDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzTGVzc1RoYW5PckVxdWFsVG8gPSBQLmx0ZSA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiAoYiA9IGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkpID09PSAtMSB8fCBiID09PSAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBOYU4sIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNOYU4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAhdGhpcy5zO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBuZWdhdGl2ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc05lZ2F0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zIDwgMDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgcG9zaXRpdmUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNQb3NpdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucyA+IDA7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIDAgb3IgLTAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNaZXJvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gISF0aGlzLmMgJiYgdGhpcy5jWzBdID09IDA7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogIG4gLSAwID0gblxyXG4gICAgICogIG4gLSBOID0gTlxyXG4gICAgICogIG4gLSBJID0gLUlcclxuICAgICAqICAwIC0gbiA9IC1uXHJcbiAgICAgKiAgMCAtIDAgPSAwXHJcbiAgICAgKiAgMCAtIE4gPSBOXHJcbiAgICAgKiAgMCAtIEkgPSAtSVxyXG4gICAgICogIE4gLSBuID0gTlxyXG4gICAgICogIE4gLSAwID0gTlxyXG4gICAgICogIE4gLSBOID0gTlxyXG4gICAgICogIE4gLSBJID0gTlxyXG4gICAgICogIEkgLSBuID0gSVxyXG4gICAgICogIEkgLSAwID0gSVxyXG4gICAgICogIEkgLSBOID0gTlxyXG4gICAgICogIEkgLSBJID0gTlxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIG1pbnVzIHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLlxyXG4gICAgICovXHJcbiAgICBQLm1pbnVzID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgdmFyIGksIGosIHQsIHhMVHksXHJcbiAgICAgICAgeCA9IHRoaXMsXHJcbiAgICAgICAgYSA9IHgucztcclxuXHJcbiAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKHksIGIpO1xyXG4gICAgICBiID0geS5zO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIE5hTj9cclxuICAgICAgaWYgKCFhIHx8ICFiKSByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgICBpZiAoYSAhPSBiKSB7XHJcbiAgICAgICAgeS5zID0gLWI7XHJcbiAgICAgICAgcmV0dXJuIHgucGx1cyh5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHhlID0geC5lIC8gTE9HX0JBU0UsXHJcbiAgICAgICAgeWUgPSB5LmUgLyBMT0dfQkFTRSxcclxuICAgICAgICB4YyA9IHguYyxcclxuICAgICAgICB5YyA9IHkuYztcclxuXHJcbiAgICAgIGlmICgheGUgfHwgIXllKSB7XHJcblxyXG4gICAgICAgIC8vIEVpdGhlciBJbmZpbml0eT9cclxuICAgICAgICBpZiAoIXhjIHx8ICF5YykgcmV0dXJuIHhjID8gKHkucyA9IC1iLCB5KSA6IG5ldyBCaWdOdW1iZXIoeWMgPyB4IDogTmFOKTtcclxuXHJcbiAgICAgICAgLy8gRWl0aGVyIHplcm8/XHJcbiAgICAgICAgaWYgKCF4Y1swXSB8fCAheWNbMF0pIHtcclxuXHJcbiAgICAgICAgICAvLyBSZXR1cm4geSBpZiB5IGlzIG5vbi16ZXJvLCB4IGlmIHggaXMgbm9uLXplcm8sIG9yIHplcm8gaWYgYm90aCBhcmUgemVyby5cclxuICAgICAgICAgIHJldHVybiB5Y1swXSA/ICh5LnMgPSAtYiwgeSkgOiBuZXcgQmlnTnVtYmVyKHhjWzBdID8geCA6XHJcblxyXG4gICAgICAgICAgIC8vIElFRUUgNzU0ICgyMDA4KSA2LjM6IG4gLSBuID0gLTAgd2hlbiByb3VuZGluZyB0byAtSW5maW5pdHlcclxuICAgICAgICAgICBST1VORElOR19NT0RFID09IDMgPyAtMCA6IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgeGUgPSBiaXRGbG9vcih4ZSk7XHJcbiAgICAgIHllID0gYml0Rmxvb3IoeWUpO1xyXG4gICAgICB4YyA9IHhjLnNsaWNlKCk7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggaXMgdGhlIGJpZ2dlciBudW1iZXIuXHJcbiAgICAgIGlmIChhID0geGUgLSB5ZSkge1xyXG5cclxuICAgICAgICBpZiAoeExUeSA9IGEgPCAwKSB7XHJcbiAgICAgICAgICBhID0gLWE7XHJcbiAgICAgICAgICB0ID0geGM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHllID0geGU7XHJcbiAgICAgICAgICB0ID0geWM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0LnJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgLy8gUHJlcGVuZCB6ZXJvcyB0byBlcXVhbGlzZSBleHBvbmVudHMuXHJcbiAgICAgICAgZm9yIChiID0gYTsgYi0tOyB0LnB1c2goMCkpO1xyXG4gICAgICAgIHQucmV2ZXJzZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvLyBFeHBvbmVudHMgZXF1YWwuIENoZWNrIGRpZ2l0IGJ5IGRpZ2l0LlxyXG4gICAgICAgIGogPSAoeExUeSA9IChhID0geGMubGVuZ3RoKSA8IChiID0geWMubGVuZ3RoKSkgPyBhIDogYjtcclxuXHJcbiAgICAgICAgZm9yIChhID0gYiA9IDA7IGIgPCBqOyBiKyspIHtcclxuXHJcbiAgICAgICAgICBpZiAoeGNbYl0gIT0geWNbYl0pIHtcclxuICAgICAgICAgICAgeExUeSA9IHhjW2JdIDwgeWNbYl07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8geCA8IHk/IFBvaW50IHhjIHRvIHRoZSBhcnJheSBvZiB0aGUgYmlnZ2VyIG51bWJlci5cclxuICAgICAgaWYgKHhMVHkpIHQgPSB4YywgeGMgPSB5YywgeWMgPSB0LCB5LnMgPSAteS5zO1xyXG5cclxuICAgICAgYiA9IChqID0geWMubGVuZ3RoKSAtIChpID0geGMubGVuZ3RoKTtcclxuXHJcbiAgICAgIC8vIEFwcGVuZCB6ZXJvcyB0byB4YyBpZiBzaG9ydGVyLlxyXG4gICAgICAvLyBObyBuZWVkIHRvIGFkZCB6ZXJvcyB0byB5YyBpZiBzaG9ydGVyIGFzIHN1YnRyYWN0IG9ubHkgbmVlZHMgdG8gc3RhcnQgYXQgeWMubGVuZ3RoLlxyXG4gICAgICBpZiAoYiA+IDApIGZvciAoOyBiLS07IHhjW2krK10gPSAwKTtcclxuICAgICAgYiA9IEJBU0UgLSAxO1xyXG5cclxuICAgICAgLy8gU3VidHJhY3QgeWMgZnJvbSB4Yy5cclxuICAgICAgZm9yICg7IGogPiBhOykge1xyXG5cclxuICAgICAgICBpZiAoeGNbLS1qXSA8IHljW2pdKSB7XHJcbiAgICAgICAgICBmb3IgKGkgPSBqOyBpICYmICF4Y1stLWldOyB4Y1tpXSA9IGIpO1xyXG4gICAgICAgICAgLS14Y1tpXTtcclxuICAgICAgICAgIHhjW2pdICs9IEJBU0U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB4Y1tqXSAtPSB5Y1tqXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MgYW5kIGFkanVzdCBleHBvbmVudCBhY2NvcmRpbmdseS5cclxuICAgICAgZm9yICg7IHhjWzBdID09IDA7IHhjLnNwbGljZSgwLCAxKSwgLS15ZSk7XHJcblxyXG4gICAgICAvLyBaZXJvP1xyXG4gICAgICBpZiAoIXhjWzBdKSB7XHJcblxyXG4gICAgICAgIC8vIEZvbGxvd2luZyBJRUVFIDc1NCAoMjAwOCkgNi4zLFxyXG4gICAgICAgIC8vIG4gLSBuID0gKzAgIGJ1dCAgbiAtIG4gPSAtMCAgd2hlbiByb3VuZGluZyB0b3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgICB5LnMgPSBST1VORElOR19NT0RFID09IDMgPyAtMSA6IDE7XHJcbiAgICAgICAgeS5jID0gW3kuZSA9IDBdO1xyXG4gICAgICAgIHJldHVybiB5O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBObyBuZWVkIHRvIGNoZWNrIGZvciBJbmZpbml0eSBhcyAreCAtICt5ICE9IEluZmluaXR5ICYmIC14IC0gLXkgIT0gSW5maW5pdHlcclxuICAgICAgLy8gZm9yIGZpbml0ZSB4IGFuZCB5LlxyXG4gICAgICByZXR1cm4gbm9ybWFsaXNlKHksIHhjLCB5ZSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogICBuICUgMCA9ICBOXHJcbiAgICAgKiAgIG4gJSBOID0gIE5cclxuICAgICAqICAgbiAlIEkgPSAgblxyXG4gICAgICogICAwICUgbiA9ICAwXHJcbiAgICAgKiAgLTAgJSBuID0gLTBcclxuICAgICAqICAgMCAlIDAgPSAgTlxyXG4gICAgICogICAwICUgTiA9ICBOXHJcbiAgICAgKiAgIDAgJSBJID0gIDBcclxuICAgICAqICAgTiAlIG4gPSAgTlxyXG4gICAgICogICBOICUgMCA9ICBOXHJcbiAgICAgKiAgIE4gJSBOID0gIE5cclxuICAgICAqICAgTiAlIEkgPSAgTlxyXG4gICAgICogICBJICUgbiA9ICBOXHJcbiAgICAgKiAgIEkgJSAwID0gIE5cclxuICAgICAqICAgSSAlIE4gPSAgTlxyXG4gICAgICogICBJICUgSSA9ICBOXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgbW9kdWxvIHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLiBUaGUgcmVzdWx0IGRlcGVuZHMgb24gdGhlIHZhbHVlIG9mIE1PRFVMT19NT0RFLlxyXG4gICAgICovXHJcbiAgICBQLm1vZHVsbyA9IFAubW9kID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgdmFyIHEsIHMsXHJcbiAgICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgICB5ID0gbmV3IEJpZ051bWJlcih5LCBiKTtcclxuXHJcbiAgICAgIC8vIFJldHVybiBOYU4gaWYgeCBpcyBJbmZpbml0eSBvciBOYU4sIG9yIHkgaXMgTmFOIG9yIHplcm8uXHJcbiAgICAgIGlmICgheC5jIHx8ICF5LnMgfHwgeS5jICYmICF5LmNbMF0pIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgICAgLy8gUmV0dXJuIHggaWYgeSBpcyBJbmZpbml0eSBvciB4IGlzIHplcm8uXHJcbiAgICAgIH0gZWxzZSBpZiAoIXkuYyB8fCB4LmMgJiYgIXguY1swXSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKHgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoTU9EVUxPX01PREUgPT0gOSkge1xyXG5cclxuICAgICAgICAvLyBFdWNsaWRpYW4gZGl2aXNpb246IHEgPSBzaWduKHkpICogZmxvb3IoeCAvIGFicyh5KSlcclxuICAgICAgICAvLyByID0geCAtIHF5ICAgIHdoZXJlICAwIDw9IHIgPCBhYnMoeSlcclxuICAgICAgICBzID0geS5zO1xyXG4gICAgICAgIHkucyA9IDE7XHJcbiAgICAgICAgcSA9IGRpdih4LCB5LCAwLCAzKTtcclxuICAgICAgICB5LnMgPSBzO1xyXG4gICAgICAgIHEucyAqPSBzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHEgPSBkaXYoeCwgeSwgMCwgTU9EVUxPX01PREUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB5ID0geC5taW51cyhxLnRpbWVzKHkpKTtcclxuXHJcbiAgICAgIC8vIFRvIG1hdGNoIEphdmFTY3JpcHQgJSwgZW5zdXJlIHNpZ24gb2YgemVybyBpcyBzaWduIG9mIGRpdmlkZW5kLlxyXG4gICAgICBpZiAoIXkuY1swXSAmJiBNT0RVTE9fTU9ERSA9PSAxKSB5LnMgPSB4LnM7XHJcblxyXG4gICAgICByZXR1cm4geTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAgbiAqIDAgPSAwXHJcbiAgICAgKiAgbiAqIE4gPSBOXHJcbiAgICAgKiAgbiAqIEkgPSBJXHJcbiAgICAgKiAgMCAqIG4gPSAwXHJcbiAgICAgKiAgMCAqIDAgPSAwXHJcbiAgICAgKiAgMCAqIE4gPSBOXHJcbiAgICAgKiAgMCAqIEkgPSBOXHJcbiAgICAgKiAgTiAqIG4gPSBOXHJcbiAgICAgKiAgTiAqIDAgPSBOXHJcbiAgICAgKiAgTiAqIE4gPSBOXHJcbiAgICAgKiAgTiAqIEkgPSBOXHJcbiAgICAgKiAgSSAqIG4gPSBJXHJcbiAgICAgKiAgSSAqIDAgPSBOXHJcbiAgICAgKiAgSSAqIE4gPSBOXHJcbiAgICAgKiAgSSAqIEkgPSBJXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgbXVsdGlwbGllZCBieSB0aGUgdmFsdWVcclxuICAgICAqIG9mIEJpZ051bWJlcih5LCBiKS5cclxuICAgICAqL1xyXG4gICAgUC5tdWx0aXBsaWVkQnkgPSBQLnRpbWVzID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgdmFyIGMsIGUsIGksIGosIGssIG0sIHhjTCwgeGxvLCB4aGksIHljTCwgeWxvLCB5aGksIHpjLFxyXG4gICAgICAgIGJhc2UsIHNxcnRCYXNlLFxyXG4gICAgICAgIHggPSB0aGlzLFxyXG4gICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgIHljID0gKHkgPSBuZXcgQmlnTnVtYmVyKHksIGIpKS5jO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIE5hTiwg5Y2kSW5maW5pdHkgb3Ig5Y2kMD9cclxuICAgICAgaWYgKCF4YyB8fCAheWMgfHwgIXhjWzBdIHx8ICF5Y1swXSkge1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gTmFOIGlmIGVpdGhlciBpcyBOYU4sIG9yIG9uZSBpcyAwIGFuZCB0aGUgb3RoZXIgaXMgSW5maW5pdHkuXHJcbiAgICAgICAgaWYgKCF4LnMgfHwgIXkucyB8fCB4YyAmJiAheGNbMF0gJiYgIXljIHx8IHljICYmICF5Y1swXSAmJiAheGMpIHtcclxuICAgICAgICAgIHkuYyA9IHkuZSA9IHkucyA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHkucyAqPSB4LnM7XHJcblxyXG4gICAgICAgICAgLy8gUmV0dXJuIOWNpEluZmluaXR5IGlmIGVpdGhlciBpcyDljaRJbmZpbml0eS5cclxuICAgICAgICAgIGlmICgheGMgfHwgIXljKSB7XHJcbiAgICAgICAgICAgIHkuYyA9IHkuZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgLy8gUmV0dXJuIOWNpDAgaWYgZWl0aGVyIGlzIOWNpDAuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB5LmMgPSBbMF07XHJcbiAgICAgICAgICAgIHkuZSA9IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZSA9IGJpdEZsb29yKHguZSAvIExPR19CQVNFKSArIGJpdEZsb29yKHkuZSAvIExPR19CQVNFKTtcclxuICAgICAgeS5zICo9IHgucztcclxuICAgICAgeGNMID0geGMubGVuZ3RoO1xyXG4gICAgICB5Y0wgPSB5Yy5sZW5ndGg7XHJcblxyXG4gICAgICAvLyBFbnN1cmUgeGMgcG9pbnRzIHRvIGxvbmdlciBhcnJheSBhbmQgeGNMIHRvIGl0cyBsZW5ndGguXHJcbiAgICAgIGlmICh4Y0wgPCB5Y0wpIHpjID0geGMsIHhjID0geWMsIHljID0gemMsIGkgPSB4Y0wsIHhjTCA9IHljTCwgeWNMID0gaTtcclxuXHJcbiAgICAgIC8vIEluaXRpYWxpc2UgdGhlIHJlc3VsdCBhcnJheSB3aXRoIHplcm9zLlxyXG4gICAgICBmb3IgKGkgPSB4Y0wgKyB5Y0wsIHpjID0gW107IGktLTsgemMucHVzaCgwKSk7XHJcblxyXG4gICAgICBiYXNlID0gQkFTRTtcclxuICAgICAgc3FydEJhc2UgPSBTUVJUX0JBU0U7XHJcblxyXG4gICAgICBmb3IgKGkgPSB5Y0w7IC0taSA+PSAwOykge1xyXG4gICAgICAgIGMgPSAwO1xyXG4gICAgICAgIHlsbyA9IHljW2ldICUgc3FydEJhc2U7XHJcbiAgICAgICAgeWhpID0geWNbaV0gLyBzcXJ0QmFzZSB8IDA7XHJcblxyXG4gICAgICAgIGZvciAoayA9IHhjTCwgaiA9IGkgKyBrOyBqID4gaTspIHtcclxuICAgICAgICAgIHhsbyA9IHhjWy0ta10gJSBzcXJ0QmFzZTtcclxuICAgICAgICAgIHhoaSA9IHhjW2tdIC8gc3FydEJhc2UgfCAwO1xyXG4gICAgICAgICAgbSA9IHloaSAqIHhsbyArIHhoaSAqIHlsbztcclxuICAgICAgICAgIHhsbyA9IHlsbyAqIHhsbyArICgobSAlIHNxcnRCYXNlKSAqIHNxcnRCYXNlKSArIHpjW2pdICsgYztcclxuICAgICAgICAgIGMgPSAoeGxvIC8gYmFzZSB8IDApICsgKG0gLyBzcXJ0QmFzZSB8IDApICsgeWhpICogeGhpO1xyXG4gICAgICAgICAgemNbai0tXSA9IHhsbyAlIGJhc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB6Y1tqXSA9IGM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjKSB7XHJcbiAgICAgICAgKytlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHpjLnNwbGljZSgwLCAxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5vcm1hbGlzZSh5LCB6YywgZSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgbmVnYXRlZCxcclxuICAgICAqIGkuZS4gbXVsdGlwbGllZCBieSAtMS5cclxuICAgICAqL1xyXG4gICAgUC5uZWdhdGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgeCA9IG5ldyBCaWdOdW1iZXIodGhpcyk7XHJcbiAgICAgIHgucyA9IC14LnMgfHwgbnVsbDtcclxuICAgICAgcmV0dXJuIHg7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogIG4gKyAwID0gblxyXG4gICAgICogIG4gKyBOID0gTlxyXG4gICAgICogIG4gKyBJID0gSVxyXG4gICAgICogIDAgKyBuID0gblxyXG4gICAgICogIDAgKyAwID0gMFxyXG4gICAgICogIDAgKyBOID0gTlxyXG4gICAgICogIDAgKyBJID0gSVxyXG4gICAgICogIE4gKyBuID0gTlxyXG4gICAgICogIE4gKyAwID0gTlxyXG4gICAgICogIE4gKyBOID0gTlxyXG4gICAgICogIE4gKyBJID0gTlxyXG4gICAgICogIEkgKyBuID0gSVxyXG4gICAgICogIEkgKyAwID0gSVxyXG4gICAgICogIEkgKyBOID0gTlxyXG4gICAgICogIEkgKyBJID0gSVxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIHBsdXMgdGhlIHZhbHVlIG9mXHJcbiAgICAgKiBCaWdOdW1iZXIoeSwgYikuXHJcbiAgICAgKi9cclxuICAgIFAucGx1cyA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHZhciB0LFxyXG4gICAgICAgIHggPSB0aGlzLFxyXG4gICAgICAgIGEgPSB4LnM7XHJcblxyXG4gICAgICB5ID0gbmV3IEJpZ051bWJlcih5LCBiKTtcclxuICAgICAgYiA9IHkucztcclxuXHJcbiAgICAgIC8vIEVpdGhlciBOYU4/XHJcbiAgICAgIGlmICghYSB8fCAhYikgcmV0dXJuIG5ldyBCaWdOdW1iZXIoTmFOKTtcclxuXHJcbiAgICAgIC8vIFNpZ25zIGRpZmZlcj9cclxuICAgICAgIGlmIChhICE9IGIpIHtcclxuICAgICAgICB5LnMgPSAtYjtcclxuICAgICAgICByZXR1cm4geC5taW51cyh5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHhlID0geC5lIC8gTE9HX0JBU0UsXHJcbiAgICAgICAgeWUgPSB5LmUgLyBMT0dfQkFTRSxcclxuICAgICAgICB4YyA9IHguYyxcclxuICAgICAgICB5YyA9IHkuYztcclxuXHJcbiAgICAgIGlmICgheGUgfHwgIXllKSB7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiDljaRJbmZpbml0eSBpZiBlaXRoZXIg5Y2kSW5maW5pdHkuXHJcbiAgICAgICAgaWYgKCF4YyB8fCAheWMpIHJldHVybiBuZXcgQmlnTnVtYmVyKGEgLyAwKTtcclxuXHJcbiAgICAgICAgLy8gRWl0aGVyIHplcm8/XHJcbiAgICAgICAgLy8gUmV0dXJuIHkgaWYgeSBpcyBub24temVybywgeCBpZiB4IGlzIG5vbi16ZXJvLCBvciB6ZXJvIGlmIGJvdGggYXJlIHplcm8uXHJcbiAgICAgICAgaWYgKCF4Y1swXSB8fCAheWNbMF0pIHJldHVybiB5Y1swXSA/IHkgOiBuZXcgQmlnTnVtYmVyKHhjWzBdID8geCA6IGEgKiAwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgeGUgPSBiaXRGbG9vcih4ZSk7XHJcbiAgICAgIHllID0gYml0Rmxvb3IoeWUpO1xyXG4gICAgICB4YyA9IHhjLnNsaWNlKCk7XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zIHRvIGVxdWFsaXNlIGV4cG9uZW50cy4gRmFzdGVyIHRvIHVzZSByZXZlcnNlIHRoZW4gZG8gdW5zaGlmdHMuXHJcbiAgICAgIGlmIChhID0geGUgLSB5ZSkge1xyXG4gICAgICAgIGlmIChhID4gMCkge1xyXG4gICAgICAgICAgeWUgPSB4ZTtcclxuICAgICAgICAgIHQgPSB5YztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYSA9IC1hO1xyXG4gICAgICAgICAgdCA9IHhjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdC5yZXZlcnNlKCk7XHJcbiAgICAgICAgZm9yICg7IGEtLTsgdC5wdXNoKDApKTtcclxuICAgICAgICB0LnJldmVyc2UoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYSA9IHhjLmxlbmd0aDtcclxuICAgICAgYiA9IHljLmxlbmd0aDtcclxuXHJcbiAgICAgIC8vIFBvaW50IHhjIHRvIHRoZSBsb25nZXIgYXJyYXksIGFuZCBiIHRvIHRoZSBzaG9ydGVyIGxlbmd0aC5cclxuICAgICAgaWYgKGEgLSBiIDwgMCkgdCA9IHljLCB5YyA9IHhjLCB4YyA9IHQsIGIgPSBhO1xyXG5cclxuICAgICAgLy8gT25seSBzdGFydCBhZGRpbmcgYXQgeWMubGVuZ3RoIC0gMSBhcyB0aGUgZnVydGhlciBkaWdpdHMgb2YgeGMgY2FuIGJlIGlnbm9yZWQuXHJcbiAgICAgIGZvciAoYSA9IDA7IGI7KSB7XHJcbiAgICAgICAgYSA9ICh4Y1stLWJdID0geGNbYl0gKyB5Y1tiXSArIGEpIC8gQkFTRSB8IDA7XHJcbiAgICAgICAgeGNbYl0gPSBCQVNFID09PSB4Y1tiXSA/IDAgOiB4Y1tiXSAlIEJBU0U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhKSB7XHJcbiAgICAgICAgeGMgPSBbYV0uY29uY2F0KHhjKTtcclxuICAgICAgICArK3llO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBObyBuZWVkIHRvIGNoZWNrIGZvciB6ZXJvLCBhcyAreCArICt5ICE9IDAgJiYgLXggKyAteSAhPSAwXHJcbiAgICAgIC8vIHllID0gTUFYX0VYUCArIDEgcG9zc2libGVcclxuICAgICAgcmV0dXJuIG5vcm1hbGlzZSh5LCB4YywgeWUpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIElmIHNkIGlzIHVuZGVmaW5lZCBvciBudWxsIG9yIHRydWUgb3IgZmFsc2UsIHJldHVybiB0aGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyBvZlxyXG4gICAgICogdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyLCBvciBudWxsIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyDljaRJbmZpbml0eSBvciBOYU4uXHJcbiAgICAgKiBJZiBzZCBpcyB0cnVlIGluY2x1ZGUgaW50ZWdlci1wYXJ0IHRyYWlsaW5nIHplcm9zIGluIHRoZSBjb3VudC5cclxuICAgICAqXHJcbiAgICAgKiBPdGhlcndpc2UsIGlmIHNkIGlzIGEgbnVtYmVyLCByZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzXHJcbiAgICAgKiBCaWdOdW1iZXIgcm91bmRlZCB0byBhIG1heGltdW0gb2Ygc2Qgc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0sIG9yXHJcbiAgICAgKiBST1VORElOR19NT0RFIGlmIHJtIGlzIG9taXR0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogc2Qge251bWJlcnxib29sZWFufSBudW1iZXI6IHNpZ25pZmljYW50IGRpZ2l0czogaW50ZWdlciwgMSB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICBib29sZWFuOiB3aGV0aGVyIHRvIGNvdW50IGludGVnZXItcGFydCB0cmFpbGluZyB6ZXJvczogdHJ1ZSBvciBmYWxzZS5cclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3NkfHJtfSdcclxuICAgICAqL1xyXG4gICAgUC5wcmVjaXNpb24gPSBQLnNkID0gZnVuY3Rpb24gKHNkLCBybSkge1xyXG4gICAgICB2YXIgYywgbiwgdixcclxuICAgICAgICB4ID0gdGhpcztcclxuXHJcbiAgICAgIGlmIChzZCAhPSBudWxsICYmIHNkICE9PSAhIXNkKSB7XHJcbiAgICAgICAgaW50Q2hlY2soc2QsIDEsIE1BWCk7XHJcbiAgICAgICAgaWYgKHJtID09IG51bGwpIHJtID0gUk9VTkRJTkdfTU9ERTtcclxuICAgICAgICBlbHNlIGludENoZWNrKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJvdW5kKG5ldyBCaWdOdW1iZXIoeCksIHNkLCBybSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghKGMgPSB4LmMpKSByZXR1cm4gbnVsbDtcclxuICAgICAgdiA9IGMubGVuZ3RoIC0gMTtcclxuICAgICAgbiA9IHYgKiBMT0dfQkFTRSArIDE7XHJcblxyXG4gICAgICBpZiAodiA9IGNbdl0pIHtcclxuXHJcbiAgICAgICAgLy8gU3VidHJhY3QgdGhlIG51bWJlciBvZiB0cmFpbGluZyB6ZXJvcyBvZiB0aGUgbGFzdCBlbGVtZW50LlxyXG4gICAgICAgIGZvciAoOyB2ICUgMTAgPT0gMDsgdiAvPSAxMCwgbi0tKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHRoZSBmaXJzdCBlbGVtZW50LlxyXG4gICAgICAgIGZvciAodiA9IGNbMF07IHYgPj0gMTA7IHYgLz0gMTAsIG4rKyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzZCAmJiB4LmUgKyAxID4gbikgbiA9IHguZSArIDE7XHJcblxyXG4gICAgICByZXR1cm4gbjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBzaGlmdGVkIGJ5IGsgcGxhY2VzXHJcbiAgICAgKiAocG93ZXJzIG9mIDEwKS4gU2hpZnQgdG8gdGhlIHJpZ2h0IGlmIG4gPiAwLCBhbmQgdG8gdGhlIGxlZnQgaWYgbiA8IDAuXHJcbiAgICAgKlxyXG4gICAgICogayB7bnVtYmVyfSBJbnRlZ2VyLCAtTUFYX1NBRkVfSU5URUdFUiB0byBNQVhfU0FGRV9JTlRFR0VSIGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2t9J1xyXG4gICAgICovXHJcbiAgICBQLnNoaWZ0ZWRCeSA9IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgIGludENoZWNrKGssIC1NQVhfU0FGRV9JTlRFR0VSLCBNQVhfU0FGRV9JTlRFR0VSKTtcclxuICAgICAgcmV0dXJuIHRoaXMudGltZXMoJzFlJyArIGspO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqICBzcXJ0KC1uKSA9ICBOXHJcbiAgICAgKiAgc3FydChOKSA9ICBOXHJcbiAgICAgKiAgc3FydCgtSSkgPSAgTlxyXG4gICAgICogIHNxcnQoSSkgPSAgSVxyXG4gICAgICogIHNxcnQoMCkgPSAgMFxyXG4gICAgICogIHNxcnQoLTApID0gLTBcclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSBzcXVhcmUgcm9vdCBvZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIsXHJcbiAgICAgKiByb3VuZGVkIGFjY29yZGluZyB0byBERUNJTUFMX1BMQUNFUyBhbmQgUk9VTkRJTkdfTU9ERS5cclxuICAgICAqL1xyXG4gICAgUC5zcXVhcmVSb290ID0gUC5zcXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgbSwgbiwgciwgcmVwLCB0LFxyXG4gICAgICAgIHggPSB0aGlzLFxyXG4gICAgICAgIGMgPSB4LmMsXHJcbiAgICAgICAgcyA9IHgucyxcclxuICAgICAgICBlID0geC5lLFxyXG4gICAgICAgIGRwID0gREVDSU1BTF9QTEFDRVMgKyA0LFxyXG4gICAgICAgIGhhbGYgPSBuZXcgQmlnTnVtYmVyKCcwLjUnKTtcclxuXHJcbiAgICAgIC8vIE5lZ2F0aXZlL05hTi9JbmZpbml0eS96ZXJvP1xyXG4gICAgICBpZiAocyAhPT0gMSB8fCAhYyB8fCAhY1swXSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKCFzIHx8IHMgPCAwICYmICghYyB8fCBjWzBdKSA/IE5hTiA6IGMgPyB4IDogMSAvIDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJbml0aWFsIGVzdGltYXRlLlxyXG4gICAgICBzID0gTWF0aC5zcXJ0KCt4KTtcclxuXHJcbiAgICAgIC8vIE1hdGguc3FydCB1bmRlcmZsb3cvb3ZlcmZsb3c/XHJcbiAgICAgIC8vIFBhc3MgeCB0byBNYXRoLnNxcnQgYXMgaW50ZWdlciwgdGhlbiBhZGp1c3QgdGhlIGV4cG9uZW50IG9mIHRoZSByZXN1bHQuXHJcbiAgICAgIGlmIChzID09IDAgfHwgcyA9PSAxIC8gMCkge1xyXG4gICAgICAgIG4gPSBjb2VmZlRvU3RyaW5nKGMpO1xyXG4gICAgICAgIGlmICgobi5sZW5ndGggKyBlKSAlIDIgPT0gMCkgbiArPSAnMCc7XHJcbiAgICAgICAgcyA9IE1hdGguc3FydChuKTtcclxuICAgICAgICBlID0gYml0Rmxvb3IoKGUgKyAxKSAvIDIpIC0gKGUgPCAwIHx8IGUgJSAyKTtcclxuXHJcbiAgICAgICAgaWYgKHMgPT0gMSAvIDApIHtcclxuICAgICAgICAgIG4gPSAnMWUnICsgZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbiA9IHMudG9FeHBvbmVudGlhbCgpO1xyXG4gICAgICAgICAgbiA9IG4uc2xpY2UoMCwgbi5pbmRleE9mKCdlJykgKyAxKSArIGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByID0gbmV3IEJpZ051bWJlcihuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByID0gbmV3IEJpZ051bWJlcihzICsgJycpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDaGVjayBmb3IgemVyby5cclxuICAgICAgLy8gciBjb3VsZCBiZSB6ZXJvIGlmIE1JTl9FWFAgaXMgY2hhbmdlZCBhZnRlciB0aGUgdGhpcyB2YWx1ZSB3YXMgY3JlYXRlZC5cclxuICAgICAgLy8gVGhpcyB3b3VsZCBjYXVzZSBhIGRpdmlzaW9uIGJ5IHplcm8gKHgvdCkgYW5kIGhlbmNlIEluZmluaXR5IGJlbG93LCB3aGljaCB3b3VsZCBjYXVzZVxyXG4gICAgICAvLyBjb2VmZlRvU3RyaW5nIHRvIHRocm93LlxyXG4gICAgICBpZiAoci5jWzBdKSB7XHJcbiAgICAgICAgZSA9IHIuZTtcclxuICAgICAgICBzID0gZSArIGRwO1xyXG4gICAgICAgIGlmIChzIDwgMykgcyA9IDA7XHJcblxyXG4gICAgICAgIC8vIE5ld3Rvbi1SYXBoc29uIGl0ZXJhdGlvbi5cclxuICAgICAgICBmb3IgKDsgOykge1xyXG4gICAgICAgICAgdCA9IHI7XHJcbiAgICAgICAgICByID0gaGFsZi50aW1lcyh0LnBsdXMoZGl2KHgsIHQsIGRwLCAxKSkpO1xyXG5cclxuICAgICAgICAgIGlmIChjb2VmZlRvU3RyaW5nKHQuYyAgKS5zbGljZSgwLCBzKSA9PT0gKG4gPVxyXG4gICAgICAgICAgICAgY29lZmZUb1N0cmluZyhyLmMpKS5zbGljZSgwLCBzKSkge1xyXG5cclxuICAgICAgICAgICAgLy8gVGhlIGV4cG9uZW50IG9mIHIgbWF5IGhlcmUgYmUgb25lIGxlc3MgdGhhbiB0aGUgZmluYWwgcmVzdWx0IGV4cG9uZW50LFxyXG4gICAgICAgICAgICAvLyBlLmcgMC4wMDA5OTk5IChlLTQpIC0tPiAwLjAwMSAoZS0zKSwgc28gYWRqdXN0IHMgc28gdGhlIHJvdW5kaW5nIGRpZ2l0c1xyXG4gICAgICAgICAgICAvLyBhcmUgaW5kZXhlZCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgIGlmIChyLmUgPCBlKSAtLXM7XHJcbiAgICAgICAgICAgIG4gPSBuLnNsaWNlKHMgLSAzLCBzICsgMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGUgNHRoIHJvdW5kaW5nIGRpZ2l0IG1heSBiZSBpbiBlcnJvciBieSAtMSBzbyBpZiB0aGUgNCByb3VuZGluZyBkaWdpdHNcclxuICAgICAgICAgICAgLy8gYXJlIDk5OTkgb3IgNDk5OSAoaS5lLiBhcHByb2FjaGluZyBhIHJvdW5kaW5nIGJvdW5kYXJ5KSBjb250aW51ZSB0aGVcclxuICAgICAgICAgICAgLy8gaXRlcmF0aW9uLlxyXG4gICAgICAgICAgICBpZiAobiA9PSAnOTk5OScgfHwgIXJlcCAmJiBuID09ICc0OTk5Jykge1xyXG5cclxuICAgICAgICAgICAgICAvLyBPbiB0aGUgZmlyc3QgaXRlcmF0aW9uIG9ubHksIGNoZWNrIHRvIHNlZSBpZiByb3VuZGluZyB1cCBnaXZlcyB0aGVcclxuICAgICAgICAgICAgICAvLyBleGFjdCByZXN1bHQgYXMgdGhlIG5pbmVzIG1heSBpbmZpbml0ZWx5IHJlcGVhdC5cclxuICAgICAgICAgICAgICBpZiAoIXJlcCkge1xyXG4gICAgICAgICAgICAgICAgcm91bmQodCwgdC5lICsgREVDSU1BTF9QTEFDRVMgKyAyLCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodC50aW1lcyh0KS5lcSh4KSkge1xyXG4gICAgICAgICAgICAgICAgICByID0gdDtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBkcCArPSA0O1xyXG4gICAgICAgICAgICAgIHMgKz0gNDtcclxuICAgICAgICAgICAgICByZXAgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAvLyBJZiByb3VuZGluZyBkaWdpdHMgYXJlIG51bGwsIDB7MCw0fSBvciA1MHswLDN9LCBjaGVjayBmb3IgZXhhY3RcclxuICAgICAgICAgICAgICAvLyByZXN1bHQuIElmIG5vdCwgdGhlbiB0aGVyZSBhcmUgZnVydGhlciBkaWdpdHMgYW5kIG0gd2lsbCBiZSB0cnV0aHkuXHJcbiAgICAgICAgICAgICAgaWYgKCErbiB8fCAhK24uc2xpY2UoMSkgJiYgbi5jaGFyQXQoMCkgPT0gJzUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVHJ1bmNhdGUgdG8gdGhlIGZpcnN0IHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAgICAgICAgICAgcm91bmQociwgci5lICsgREVDSU1BTF9QTEFDRVMgKyAyLCAxKTtcclxuICAgICAgICAgICAgICAgIG0gPSAhci50aW1lcyhyKS5lcSh4KTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcm91bmQociwgci5lICsgREVDSU1BTF9QTEFDRVMgKyAxLCBST1VORElOR19NT0RFLCBtKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpbiBleHBvbmVudGlhbCBub3RhdGlvbiBhbmRcclxuICAgICAqIHJvdW5kZWQgdXNpbmcgUk9VTkRJTkdfTU9ERSB0byBkcCBmaXhlZCBkZWNpbWFsIHBsYWNlcy5cclxuICAgICAqXHJcbiAgICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtkcHxybX0nXHJcbiAgICAgKi9cclxuICAgIFAudG9FeHBvbmVudGlhbCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgICAgaWYgKGRwICE9IG51bGwpIHtcclxuICAgICAgICBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuICAgICAgICBkcCsrO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmb3JtYXQodGhpcywgZHAsIHJtLCAxKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpbiBmaXhlZC1wb2ludCBub3RhdGlvbiByb3VuZGluZ1xyXG4gICAgICogdG8gZHAgZml4ZWQgZGVjaW1hbCBwbGFjZXMgdXNpbmcgcm91bmRpbmcgbW9kZSBybSwgb3IgUk9VTkRJTkdfTU9ERSBpZiBybSBpcyBvbWl0dGVkLlxyXG4gICAgICpcclxuICAgICAqIE5vdGU6IGFzIHdpdGggSmF2YVNjcmlwdCdzIG51bWJlciB0eXBlLCAoLTApLnRvRml4ZWQoMCkgaXMgJzAnLFxyXG4gICAgICogYnV0IGUuZy4gKC0wLjAwMDAxKS50b0ZpeGVkKDApIGlzICctMCcuXHJcbiAgICAgKlxyXG4gICAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7ZHB8cm19J1xyXG4gICAgICovXHJcbiAgICBQLnRvRml4ZWQgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICAgIGlmIChkcCAhPSBudWxsKSB7XHJcbiAgICAgICAgaW50Q2hlY2soZHAsIDAsIE1BWCk7XHJcbiAgICAgICAgZHAgPSBkcCArIHRoaXMuZSArIDE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZvcm1hdCh0aGlzLCBkcCwgcm0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGluIGZpeGVkLXBvaW50IG5vdGF0aW9uIHJvdW5kZWRcclxuICAgICAqIHVzaW5nIHJtIG9yIFJPVU5ESU5HX01PREUgdG8gZHAgZGVjaW1hbCBwbGFjZXMsIGFuZCBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvIHRoZSBwcm9wZXJ0aWVzXHJcbiAgICAgKiBvZiB0aGUgRk9STUFUIG9iamVjdCAoc2VlIEJpZ051bWJlci5zZXQpLlxyXG4gICAgICpcclxuICAgICAqIEZPUk1BVCA9IHtcclxuICAgICAqICAgICAgZGVjaW1hbFNlcGFyYXRvciA6ICcuJyxcclxuICAgICAqICAgICAgZ3JvdXBTZXBhcmF0b3IgOiAnLCcsXHJcbiAgICAgKiAgICAgIGdyb3VwU2l6ZSA6IDMsXHJcbiAgICAgKiAgICAgIHNlY29uZGFyeUdyb3VwU2l6ZSA6IDAsXHJcbiAgICAgKiAgICAgIGZyYWN0aW9uR3JvdXBTZXBhcmF0b3IgOiAnXFx4QTAnLCAgICAvLyBub24tYnJlYWtpbmcgc3BhY2VcclxuICAgICAqICAgICAgZnJhY3Rpb25Hcm91cFNpemUgOiAwXHJcbiAgICAgKiB9O1xyXG4gICAgICpcclxuICAgICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2RwfHJtfSdcclxuICAgICAqL1xyXG4gICAgUC50b0Zvcm1hdCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgICAgdmFyIHN0ciA9IHRoaXMudG9GaXhlZChkcCwgcm0pO1xyXG5cclxuICAgICAgaWYgKHRoaXMuYykge1xyXG4gICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgYXJyID0gc3RyLnNwbGl0KCcuJyksXHJcbiAgICAgICAgICBnMSA9ICtGT1JNQVQuZ3JvdXBTaXplLFxyXG4gICAgICAgICAgZzIgPSArRk9STUFULnNlY29uZGFyeUdyb3VwU2l6ZSxcclxuICAgICAgICAgIGdyb3VwU2VwYXJhdG9yID0gRk9STUFULmdyb3VwU2VwYXJhdG9yLFxyXG4gICAgICAgICAgaW50UGFydCA9IGFyclswXSxcclxuICAgICAgICAgIGZyYWN0aW9uUGFydCA9IGFyclsxXSxcclxuICAgICAgICAgIGlzTmVnID0gdGhpcy5zIDwgMCxcclxuICAgICAgICAgIGludERpZ2l0cyA9IGlzTmVnID8gaW50UGFydC5zbGljZSgxKSA6IGludFBhcnQsXHJcbiAgICAgICAgICBsZW4gPSBpbnREaWdpdHMubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAoZzIpIGkgPSBnMSwgZzEgPSBnMiwgZzIgPSBpLCBsZW4gLT0gaTtcclxuXHJcbiAgICAgICAgaWYgKGcxID4gMCAmJiBsZW4gPiAwKSB7XHJcbiAgICAgICAgICBpID0gbGVuICUgZzEgfHwgZzE7XHJcbiAgICAgICAgICBpbnRQYXJ0ID0gaW50RGlnaXRzLnN1YnN0cigwLCBpKTtcclxuXHJcbiAgICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSArPSBnMSkge1xyXG4gICAgICAgICAgICBpbnRQYXJ0ICs9IGdyb3VwU2VwYXJhdG9yICsgaW50RGlnaXRzLnN1YnN0cihpLCBnMSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGcyID4gMCkgaW50UGFydCArPSBncm91cFNlcGFyYXRvciArIGludERpZ2l0cy5zbGljZShpKTtcclxuICAgICAgICAgIGlmIChpc05lZykgaW50UGFydCA9ICctJyArIGludFBhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdHIgPSBmcmFjdGlvblBhcnRcclxuICAgICAgICAgPyBpbnRQYXJ0ICsgRk9STUFULmRlY2ltYWxTZXBhcmF0b3IgKyAoKGcyID0gK0ZPUk1BVC5mcmFjdGlvbkdyb3VwU2l6ZSlcclxuICAgICAgICAgID8gZnJhY3Rpb25QYXJ0LnJlcGxhY2UobmV3IFJlZ0V4cCgnXFxcXGR7JyArIGcyICsgJ31cXFxcQicsICdnJyksXHJcbiAgICAgICAgICAgJyQmJyArIEZPUk1BVC5mcmFjdGlvbkdyb3VwU2VwYXJhdG9yKVxyXG4gICAgICAgICAgOiBmcmFjdGlvblBhcnQpXHJcbiAgICAgICAgIDogaW50UGFydDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBzdHJpbmcgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBhcyBhIHNpbXBsZSBmcmFjdGlvbiB3aXRoXHJcbiAgICAgKiBhbiBpbnRlZ2VyIG51bWVyYXRvciBhbmQgYW4gaW50ZWdlciBkZW5vbWluYXRvci4gVGhlIGRlbm9taW5hdG9yIHdpbGwgYmUgYSBwb3NpdGl2ZVxyXG4gICAgICogbm9uLXplcm8gdmFsdWUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSBzcGVjaWZpZWQgbWF4aW11bSBkZW5vbWluYXRvci4gSWYgYSBtYXhpbXVtXHJcbiAgICAgKiBkZW5vbWluYXRvciBpcyBub3Qgc3BlY2lmaWVkLCB0aGUgZGVub21pbmF0b3Igd2lsbCBiZSB0aGUgbG93ZXN0IHZhbHVlIG5lY2Vzc2FyeSB0b1xyXG4gICAgICogcmVwcmVzZW50IHRoZSBudW1iZXIgZXhhY3RseS5cclxuICAgICAqXHJcbiAgICAgKiBbbWRdIHtudW1iZXJ8c3RyaW5nfEJpZ051bWJlcn0gSW50ZWdlciA+PSAxLCBvciBJbmZpbml0eS4gVGhlIG1heGltdW0gZGVub21pbmF0b3IuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9IDoge21kfSdcclxuICAgICAqL1xyXG4gICAgUC50b0ZyYWN0aW9uID0gZnVuY3Rpb24gKG1kKSB7XHJcbiAgICAgIHZhciBhcnIsIGQsIGQwLCBkMSwgZDIsIGUsIGV4cCwgbiwgbjAsIG4xLCBxLCBzLFxyXG4gICAgICAgIHggPSB0aGlzLFxyXG4gICAgICAgIHhjID0geC5jO1xyXG5cclxuICAgICAgaWYgKG1kICE9IG51bGwpIHtcclxuICAgICAgICBuID0gbmV3IEJpZ051bWJlcihtZCk7XHJcblxyXG4gICAgICAgIC8vIFRocm93IGlmIG1kIGlzIGxlc3MgdGhhbiBvbmUgb3IgaXMgbm90IGFuIGludGVnZXIsIHVubGVzcyBpdCBpcyBJbmZpbml0eS5cclxuICAgICAgICBpZiAoIW4uaXNJbnRlZ2VyKCkgJiYgKG4uYyB8fCBuLnMgIT09IDEpIHx8IG4ubHQoT05FKSkge1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ0FyZ3VtZW50ICcgK1xyXG4gICAgICAgICAgICAgIChuLmlzSW50ZWdlcigpID8gJ291dCBvZiByYW5nZTogJyA6ICdub3QgYW4gaW50ZWdlcjogJykgKyBtZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXhjKSByZXR1cm4geC50b1N0cmluZygpO1xyXG5cclxuICAgICAgZCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuICAgICAgbjEgPSBkMCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuICAgICAgZDEgPSBuMCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuICAgICAgcyA9IGNvZWZmVG9TdHJpbmcoeGMpO1xyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIGluaXRpYWwgZGVub21pbmF0b3IuXHJcbiAgICAgIC8vIGQgaXMgYSBwb3dlciBvZiAxMCBhbmQgdGhlIG1pbmltdW0gbWF4IGRlbm9taW5hdG9yIHRoYXQgc3BlY2lmaWVzIHRoZSB2YWx1ZSBleGFjdGx5LlxyXG4gICAgICBlID0gZC5lID0gcy5sZW5ndGggLSB4LmUgLSAxO1xyXG4gICAgICBkLmNbMF0gPSBQT1dTX1RFTlsoZXhwID0gZSAlIExPR19CQVNFKSA8IDAgPyBMT0dfQkFTRSArIGV4cCA6IGV4cF07XHJcbiAgICAgIG1kID0gIW1kIHx8IG4uY29tcGFyZWRUbyhkKSA+IDAgPyAoZSA+IDAgPyBkIDogbjEpIDogbjtcclxuXHJcbiAgICAgIGV4cCA9IE1BWF9FWFA7XHJcbiAgICAgIE1BWF9FWFAgPSAxIC8gMDtcclxuICAgICAgbiA9IG5ldyBCaWdOdW1iZXIocyk7XHJcblxyXG4gICAgICAvLyBuMCA9IGQxID0gMFxyXG4gICAgICBuMC5jWzBdID0gMDtcclxuXHJcbiAgICAgIGZvciAoOyA7KSAge1xyXG4gICAgICAgIHEgPSBkaXYobiwgZCwgMCwgMSk7XHJcbiAgICAgICAgZDIgPSBkMC5wbHVzKHEudGltZXMoZDEpKTtcclxuICAgICAgICBpZiAoZDIuY29tcGFyZWRUbyhtZCkgPT0gMSkgYnJlYWs7XHJcbiAgICAgICAgZDAgPSBkMTtcclxuICAgICAgICBkMSA9IGQyO1xyXG4gICAgICAgIG4xID0gbjAucGx1cyhxLnRpbWVzKGQyID0gbjEpKTtcclxuICAgICAgICBuMCA9IGQyO1xyXG4gICAgICAgIGQgPSBuLm1pbnVzKHEudGltZXMoZDIgPSBkKSk7XHJcbiAgICAgICAgbiA9IGQyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkMiA9IGRpdihtZC5taW51cyhkMCksIGQxLCAwLCAxKTtcclxuICAgICAgbjAgPSBuMC5wbHVzKGQyLnRpbWVzKG4xKSk7XHJcbiAgICAgIGQwID0gZDAucGx1cyhkMi50aW1lcyhkMSkpO1xyXG4gICAgICBuMC5zID0gbjEucyA9IHgucztcclxuICAgICAgZSAqPSAyO1xyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIGZyYWN0aW9uIGlzIGNsb3NlciB0byB4LCBuMC9kMCBvciBuMS9kMVxyXG4gICAgICBhcnIgPSBkaXYobjEsIGQxLCBlLCBST1VORElOR19NT0RFKS5taW51cyh4KS5hYnMoKS5jb21wYXJlZFRvKFxyXG4gICAgICAgICBkaXYobjAsIGQwLCBlLCBST1VORElOR19NT0RFKS5taW51cyh4KS5hYnMoKSkgPCAxXHJcbiAgICAgICAgICA/IFtuMS50b1N0cmluZygpLCBkMS50b1N0cmluZygpXVxyXG4gICAgICAgICAgOiBbbjAudG9TdHJpbmcoKSwgZDAudG9TdHJpbmcoKV07XHJcblxyXG4gICAgICBNQVhfRVhQID0gZXhwO1xyXG4gICAgICByZXR1cm4gYXJyO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgY29udmVydGVkIHRvIGEgbnVtYmVyIHByaW1pdGl2ZS5cclxuICAgICAqL1xyXG4gICAgUC50b051bWJlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuICt0aGlzO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIHJvdW5kZWQgdG8gc2Qgc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAgICAgKiB1c2luZyByb3VuZGluZyBtb2RlIHJtIG9yIFJPVU5ESU5HX01PREUuIElmIHNkIGlzIGxlc3MgdGhhbiB0aGUgbnVtYmVyIG9mIGRpZ2l0c1xyXG4gICAgICogbmVjZXNzYXJ5IHRvIHJlcHJlc2VudCB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSB2YWx1ZSBpbiBmaXhlZC1wb2ludCBub3RhdGlvbiwgdGhlbiB1c2VcclxuICAgICAqIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIFtzZF0ge251bWJlcn0gU2lnbmlmaWNhbnQgZGlnaXRzLiBJbnRlZ2VyLCAxIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtzZHxybX0nXHJcbiAgICAgKi9cclxuICAgIFAudG9QcmVjaXNpb24gPSBmdW5jdGlvbiAoc2QsIHJtKSB7XHJcbiAgICAgIGlmIChzZCAhPSBudWxsKSBpbnRDaGVjayhzZCwgMSwgTUFYKTtcclxuICAgICAgcmV0dXJuIGZvcm1hdCh0aGlzLCBzZCwgcm0sIDIpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGluIGJhc2UgYiwgb3IgYmFzZSAxMCBpZiBiIGlzXHJcbiAgICAgKiBvbWl0dGVkLiBJZiBhIGJhc2UgaXMgc3BlY2lmaWVkLCBpbmNsdWRpbmcgYmFzZSAxMCwgcm91bmQgYWNjb3JkaW5nIHRvIERFQ0lNQUxfUExBQ0VTIGFuZFxyXG4gICAgICogUk9VTkRJTkdfTU9ERS4gSWYgYSBiYXNlIGlzIG5vdCBzcGVjaWZpZWQsIGFuZCB0aGlzIEJpZ051bWJlciBoYXMgYSBwb3NpdGl2ZSBleHBvbmVudFxyXG4gICAgICogdGhhdCBpcyBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gVE9fRVhQX1BPUywgb3IgYSBuZWdhdGl2ZSBleHBvbmVudCBlcXVhbCB0byBvciBsZXNzIHRoYW5cclxuICAgICAqIFRPX0VYUF9ORUcsIHJldHVybiBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBbYl0ge251bWJlcn0gSW50ZWdlciwgMiB0byBBTFBIQUJFVC5sZW5ndGggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBCYXNlIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtifSdcclxuICAgICAqL1xyXG4gICAgUC50b1N0cmluZyA9IGZ1bmN0aW9uIChiKSB7XHJcbiAgICAgIHZhciBzdHIsXHJcbiAgICAgICAgbiA9IHRoaXMsXHJcbiAgICAgICAgcyA9IG4ucyxcclxuICAgICAgICBlID0gbi5lO1xyXG5cclxuICAgICAgLy8gSW5maW5pdHkgb3IgTmFOP1xyXG4gICAgICBpZiAoZSA9PT0gbnVsbCkge1xyXG5cclxuICAgICAgICBpZiAocykge1xyXG4gICAgICAgICAgc3RyID0gJ0luZmluaXR5JztcclxuICAgICAgICAgIGlmIChzIDwgMCkgc3RyID0gJy0nICsgc3RyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdHIgPSAnTmFOJztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3RyID0gY29lZmZUb1N0cmluZyhuLmMpO1xyXG5cclxuICAgICAgICBpZiAoYiA9PSBudWxsKSB7XHJcbiAgICAgICAgICBzdHIgPSBlIDw9IFRPX0VYUF9ORUcgfHwgZSA+PSBUT19FWFBfUE9TXHJcbiAgICAgICAgICAgPyB0b0V4cG9uZW50aWFsKHN0ciwgZSlcclxuICAgICAgICAgICA6IHRvRml4ZWRQb2ludChzdHIsIGUsICcwJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGludENoZWNrKGIsIDIsIEFMUEhBQkVULmxlbmd0aCwgJ0Jhc2UnKTtcclxuICAgICAgICAgIHN0ciA9IGNvbnZlcnRCYXNlKHRvRml4ZWRQb2ludChzdHIsIGUsICcwJyksIDEwLCBiLCBzLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzIDwgMCAmJiBuLmNbMF0pIHN0ciA9ICctJyArIHN0cjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYXMgdG9TdHJpbmcsIGJ1dCBkbyBub3QgYWNjZXB0IGEgYmFzZSBhcmd1bWVudCwgYW5kIGluY2x1ZGUgdGhlIG1pbnVzIHNpZ24gZm9yXHJcbiAgICAgKiBuZWdhdGl2ZSB6ZXJvLlxyXG4gICAgICovXHJcbiAgICBQLnZhbHVlT2YgPSBQLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHN0cixcclxuICAgICAgICBuID0gdGhpcyxcclxuICAgICAgICBlID0gbi5lO1xyXG5cclxuICAgICAgaWYgKGUgPT09IG51bGwpIHJldHVybiBuLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICBzdHIgPSBjb2VmZlRvU3RyaW5nKG4uYyk7XHJcblxyXG4gICAgICBzdHIgPSBlIDw9IFRPX0VYUF9ORUcgfHwgZSA+PSBUT19FWFBfUE9TXHJcbiAgICAgICAgPyB0b0V4cG9uZW50aWFsKHN0ciwgZSlcclxuICAgICAgICA6IHRvRml4ZWRQb2ludChzdHIsIGUsICcwJyk7XHJcblxyXG4gICAgICByZXR1cm4gbi5zIDwgMCA/ICctJyArIHN0ciA6IHN0cjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIFAuX2lzQmlnTnVtYmVyID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAoY29uZmlnT2JqZWN0ICE9IG51bGwpIEJpZ051bWJlci5zZXQoY29uZmlnT2JqZWN0KTtcclxuXHJcbiAgICByZXR1cm4gQmlnTnVtYmVyO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFBSSVZBVEUgSEVMUEVSIEZVTkNUSU9OU1xyXG5cclxuXHJcbiAgZnVuY3Rpb24gYml0Rmxvb3Iobikge1xyXG4gICAgdmFyIGkgPSBuIHwgMDtcclxuICAgIHJldHVybiBuID4gMCB8fCBuID09PSBpID8gaSA6IGkgLSAxO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFJldHVybiBhIGNvZWZmaWNpZW50IGFycmF5IGFzIGEgc3RyaW5nIG9mIGJhc2UgMTAgZGlnaXRzLlxyXG4gIGZ1bmN0aW9uIGNvZWZmVG9TdHJpbmcoYSkge1xyXG4gICAgdmFyIHMsIHosXHJcbiAgICAgIGkgPSAxLFxyXG4gICAgICBqID0gYS5sZW5ndGgsXHJcbiAgICAgIHIgPSBhWzBdICsgJyc7XHJcblxyXG4gICAgZm9yICg7IGkgPCBqOykge1xyXG4gICAgICBzID0gYVtpKytdICsgJyc7XHJcbiAgICAgIHogPSBMT0dfQkFTRSAtIHMubGVuZ3RoO1xyXG4gICAgICBmb3IgKDsgei0tOyBzID0gJzAnICsgcyk7XHJcbiAgICAgIHIgKz0gcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKGogPSByLmxlbmd0aDsgci5jaGFyQ29kZUF0KC0taikgPT09IDQ4Oyk7XHJcbiAgICByZXR1cm4gci5zbGljZSgwLCBqICsgMSB8fCAxKTtcclxuICB9XHJcblxyXG5cclxuICAvLyBDb21wYXJlIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXJzIHggYW5kIHkuXHJcbiAgZnVuY3Rpb24gY29tcGFyZSh4LCB5KSB7XHJcbiAgICB2YXIgYSwgYixcclxuICAgICAgeGMgPSB4LmMsXHJcbiAgICAgIHljID0geS5jLFxyXG4gICAgICBpID0geC5zLFxyXG4gICAgICBqID0geS5zLFxyXG4gICAgICBrID0geC5lLFxyXG4gICAgICBsID0geS5lO1xyXG5cclxuICAgIC8vIEVpdGhlciBOYU4/XHJcbiAgICBpZiAoIWkgfHwgIWopIHJldHVybiBudWxsO1xyXG5cclxuICAgIGEgPSB4YyAmJiAheGNbMF07XHJcbiAgICBiID0geWMgJiYgIXljWzBdO1xyXG5cclxuICAgIC8vIEVpdGhlciB6ZXJvP1xyXG4gICAgaWYgKGEgfHwgYikgcmV0dXJuIGEgPyBiID8gMCA6IC1qIDogaTtcclxuXHJcbiAgICAvLyBTaWducyBkaWZmZXI/XHJcbiAgICBpZiAoaSAhPSBqKSByZXR1cm4gaTtcclxuXHJcbiAgICBhID0gaSA8IDA7XHJcbiAgICBiID0gayA9PSBsO1xyXG5cclxuICAgIC8vIEVpdGhlciBJbmZpbml0eT9cclxuICAgIGlmICgheGMgfHwgIXljKSByZXR1cm4gYiA/IDAgOiAheGMgXiBhID8gMSA6IC0xO1xyXG5cclxuICAgIC8vIENvbXBhcmUgZXhwb25lbnRzLlxyXG4gICAgaWYgKCFiKSByZXR1cm4gayA+IGwgXiBhID8gMSA6IC0xO1xyXG5cclxuICAgIGogPSAoayA9IHhjLmxlbmd0aCkgPCAobCA9IHljLmxlbmd0aCkgPyBrIDogbDtcclxuXHJcbiAgICAvLyBDb21wYXJlIGRpZ2l0IGJ5IGRpZ2l0LlxyXG4gICAgZm9yIChpID0gMDsgaSA8IGo7IGkrKykgaWYgKHhjW2ldICE9IHljW2ldKSByZXR1cm4geGNbaV0gPiB5Y1tpXSBeIGEgPyAxIDogLTE7XHJcblxyXG4gICAgLy8gQ29tcGFyZSBsZW5ndGhzLlxyXG4gICAgcmV0dXJuIGsgPT0gbCA/IDAgOiBrID4gbCBeIGEgPyAxIDogLTE7XHJcbiAgfVxyXG5cclxuXHJcbiAgLypcclxuICAgKiBDaGVjayB0aGF0IG4gaXMgYSBwcmltaXRpdmUgbnVtYmVyLCBhbiBpbnRlZ2VyLCBhbmQgaW4gcmFuZ2UsIG90aGVyd2lzZSB0aHJvdy5cclxuICAgKi9cclxuICBmdW5jdGlvbiBpbnRDaGVjayhuLCBtaW4sIG1heCwgbmFtZSkge1xyXG4gICAgaWYgKG4gPCBtaW4gfHwgbiA+IG1heCB8fCBuICE9PSAobiA8IDAgPyBtYXRoY2VpbChuKSA6IG1hdGhmbG9vcihuKSkpIHtcclxuICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgIChiaWdudW1iZXJFcnJvciArIChuYW1lIHx8ICdBcmd1bWVudCcpICsgKHR5cGVvZiBuID09ICdudW1iZXInXHJcbiAgICAgICAgID8gbiA8IG1pbiB8fCBuID4gbWF4ID8gJyBvdXQgb2YgcmFuZ2U6ICcgOiAnIG5vdCBhbiBpbnRlZ2VyOiAnXHJcbiAgICAgICAgIDogJyBub3QgYSBwcmltaXRpdmUgbnVtYmVyOiAnKSArIG4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT0gJ1tvYmplY3QgQXJyYXldJztcclxuICB9XHJcblxyXG5cclxuICAvLyBBc3N1bWVzIGZpbml0ZSBuLlxyXG4gIGZ1bmN0aW9uIGlzT2RkKG4pIHtcclxuICAgIHZhciBrID0gbi5jLmxlbmd0aCAtIDE7XHJcbiAgICByZXR1cm4gYml0Rmxvb3Iobi5lIC8gTE9HX0JBU0UpID09IGsgJiYgbi5jW2tdICUgMiAhPSAwO1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHRvRXhwb25lbnRpYWwoc3RyLCBlKSB7XHJcbiAgICByZXR1cm4gKHN0ci5sZW5ndGggPiAxID8gc3RyLmNoYXJBdCgwKSArICcuJyArIHN0ci5zbGljZSgxKSA6IHN0cikgK1xyXG4gICAgIChlIDwgMCA/ICdlJyA6ICdlKycpICsgZTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiB0b0ZpeGVkUG9pbnQoc3RyLCBlLCB6KSB7XHJcbiAgICB2YXIgbGVuLCB6cztcclxuXHJcbiAgICAvLyBOZWdhdGl2ZSBleHBvbmVudD9cclxuICAgIGlmIChlIDwgMCkge1xyXG5cclxuICAgICAgLy8gUHJlcGVuZCB6ZXJvcy5cclxuICAgICAgZm9yICh6cyA9IHogKyAnLic7ICsrZTsgenMgKz0geik7XHJcbiAgICAgIHN0ciA9IHpzICsgc3RyO1xyXG5cclxuICAgIC8vIFBvc2l0aXZlIGV4cG9uZW50XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG5cclxuICAgICAgLy8gQXBwZW5kIHplcm9zLlxyXG4gICAgICBpZiAoKytlID4gbGVuKSB7XHJcbiAgICAgICAgZm9yICh6cyA9IHosIGUgLT0gbGVuOyAtLWU7IHpzICs9IHopO1xyXG4gICAgICAgIHN0ciArPSB6cztcclxuICAgICAgfSBlbHNlIGlmIChlIDwgbGVuKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLnNsaWNlKDAsIGUpICsgJy4nICsgc3RyLnNsaWNlKGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0cjtcclxuICB9XHJcblxyXG5cclxuICAvLyBFWFBPUlRcclxuXHJcblxyXG4gIEJpZ051bWJlciA9IGNsb25lKCk7XHJcbiAgQmlnTnVtYmVyWydkZWZhdWx0J10gPSBCaWdOdW1iZXIuQmlnTnVtYmVyID0gQmlnTnVtYmVyO1xyXG5cclxuICAvLyBBTUQuXHJcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkgeyByZXR1cm4gQmlnTnVtYmVyOyB9KTtcclxuXHJcbiAgLy8gTm9kZS5qcyBhbmQgb3RoZXIgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cy5cclxuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gQmlnTnVtYmVyO1xyXG5cclxuICAvLyBCcm93c2VyLlxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoIWdsb2JhbE9iamVjdCkge1xyXG4gICAgICBnbG9iYWxPYmplY3QgPSB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmID8gc2VsZiA6IHdpbmRvdztcclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWxPYmplY3QuQmlnTnVtYmVyID0gQmlnTnVtYmVyO1xyXG4gIH1cclxufSkodGhpcyk7Il19