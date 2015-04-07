// Random Number generation based on seedrandom.js code by David Bau.
// Copyright 2010 David Bau, all rights reserved.
//
// Redistribution and use in source and binary forms, with or
// without modification, are permitted provided that the following
// conditions are met:
//
//   1. Redistributions of source code must retain the above
//      copyright notice, this list of conditions and the
//      following disclaimer.
//
//   2. Redistributions in binary form must reproduce the above
//      copyright notice, this list of conditions and the
//      following disclaimer in the documentation and/or other
//      materials provided with the distribution.
//
//   3. Neither the name of this module nor the names of its
//      contributors may be used to endorse or promote products
//      derived from this software without specific prior written
//      permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
// CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
// NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
// HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

var width = 256;
var chunks = 6;
var significanceExponent = 52;
var startdenom = Math.pow(width, chunks);
var significance = Math.pow(2, significanceExponent);
var overflow = significance * 2;

var Random = (function () {
    var Random = function(seed) {
        this.random = null;
        if (!seed) throw {
            name: "RandomSeedError",
            message: "random_seed_error".l()
        };
        var key = [];
        mixkey(seed, key);
        var arc4 = new ARC4(key);
        this.random = function() {
            var n = arc4.g(chunks);
            var d = startdenom;
            var x = 0;
            while (n < significance) {
                n = (n + x) * width;
                d *= width;
                x = arc4.g(1);
            }
            while (n >= overflow) {
                n /= 2;
                d /= 2;
                x >>>= 1;
            }
            return (n + x) / d;
        };
    };
    // Helper type.
    var ARC4 = function(key) {
        var t, u, me = this, keylen = key.length;
        var i = 0, j = me.i = me.j = me.m = 0;
        me.S = [];
        me.c = [];
        if (!keylen) { key = [keylen++]; }
        while (i < width) { me.S[i] = i++; }
        for (i = 0; i < width; i++) {
            t = me.S[i];
            j = lowbits(j + t + key[i % keylen]);
            u = me.S[j];
            me.S[i] = u;
            me.S[j] = t;
        }
        me.g = function getnext(count) {
            var s = me.S;
            var i = lowbits(me.i + 1); var t = s[i];
            var j = lowbits(me.j + t); var u = s[j];
            s[i] = u;
            s[j] = t;
            var r = s[lowbits(t + u)];
            while (--count) {
                i = lowbits(i + 1); t = s[i];
                j = lowbits(j + t); u = s[j];
                s[i] = u;
                s[j] = t;
                r = r * width + s[lowbits(t + u)];
            }
            me.i = i;
            me.j = j;
            return r;
        };
        me.g(width);
    };
    // Helper functions.
    var mixkey = function(seed, key) {
        seed += '';
        var smear = 0;
        for (var j = 0; j < seed.length; j++) {
            var lb = lowbits(j);
            smear ^= key[lb];
            key[lb] = lowbits(smear*19 + seed.charCodeAt(j));
        }
        seed = '';
        for (j in key) {
            seed += String.fromCharCode(key[j]);
        }
        return seed;
    };
    var lowbits = function(n) {
        return n & (width - 1);
    };

    return Random;
})();

/* Returns a random floating point number between zero and
* one. NB: The prototype implementation below just throws an
* error, it will be overridden in each Random object when the
* seed has been correctly configured. */
Random.prototype.random = function() {
throw {
    name:"RandomError",
    message: "random_error".l()
};
};
/* Returns an integer between the given min and max values,
* inclusive. */
Random.prototype.randomInt = function(min, max) {
return min + Math.floor((max-min+1)*this.random());
};
/* Returns the result of rolling n dice with dx sides, and adding
* plus. */
Random.prototype.dice = function(n, dx, plus) {
var result = 0;
for (var i = 0; i < n; i++) {
    result += this.randomInt(1, dx);
}
if (plus) result += plus;
return result;
};
/* Returns the result of rolling n averaging dice (i.e. 6 sided dice
* with sides 2,3,3,4,4,5). And adding plus. */
Random.prototype.aveDice = (function() {
var mapping = [2,3,3,4,4,5];
return function(n, plus) {
    var result = 0;
    for (var i = 0; i < n; i++) {
        result += mapping[this.randomInt(0, 5)];
    }
    if (plus) result += plus;
    return result;
};
})();
/* Returns a dice-roll result from the given string dice
* specification. The specification should be of the form xdy+z,
* where the x component and z component are optional. This rolls
* x dice of with y sides, and adds z to the result, the z
* component can also be negative: xdy-z. The y component can be
* either a number of sides, or can be the special values 'F', for
* a fudge die (with 3 sides, +,0,-), '%' for a 100 sided die, or
* 'A' for an averaging die (with sides 2,3,3,4,4,5).
*/

Random.prototype.diceString = (function () {
var diceRe = /^([1-9][0-9]*)?d([%FA]|[1-9][0-9]*)([-+][1-9][0-9]*)?$/;
return function(def) {
    var match = def.match(diceRe);
    if (!match) {
        throw new Error(
            "dice_string_error".l({string:def})
        );
    }

    var num = match[1]?parseInt(match[1], 10):1;
    var sides;
    var bonus = match[3]?parseInt(match[3], 10):0;

    switch (match[2]) {
    case 'A':
        return this.aveDice(num, bonus);
    case 'F':
        sides = 3;
        bonus -= num*2;
        break;
    case '%':
        sides = 100;
        break;
    default:
        sides = parseInt(match[2], 10);
        break;
    }
    return this.dice(num, sides, bonus);
};
})();

module.exports = Random;
