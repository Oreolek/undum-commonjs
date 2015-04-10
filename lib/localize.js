// Internationalization support based on the code provided by Oreolek.

var codesToTry = {};

/* Compiles a list of fallback languages to try if the given code
 * doesn't have the message we need. Caches it for future use. */
var getCodesToTry = function(languageCode) {
    var codeArray = codesToTry[languageCode];
    if (codeArray) return codeArray;

    codeArray = [];
    if (languageCode in languages) {
        codeArray.push(languageCode);
    }
    var elements = languageCode.split('-');
    for (var i = elements.length-2; i > 0; i--) {
        var thisCode = elements.slice(0, i).join('-');
        if (thisCode in languages) {
            codeArray.push(thisCode);
        }
    }
    codeArray.push("");
    codesToTry[languageCode] = codeArray;
    return codeArray;
};

var lookup = function(languageCode, message) {
    var languageData = languages[languageCode];
    if (!languageData) return null;
    return languageData[message];
};

var localize = function(languageCode, message) {
    var localized, thisCode;
    var languageCodes = getCodesToTry(languageCode);
    for (var i = 0; i < languageCodes.length; i++) {
        thisCode = languageCodes[i];
        localized = lookup(thisCode, message);
        if (localized) return localized;
    }
    return message;
};

// API
String.prototype.l = function(args) {
    // Get lang attribute from html tag.
    var lang = $("html").attr("lang") || "";

    // Find the localized form.
    var localized = localize(lang, this);

    // Merge in any replacement content.
    if (args) {
        for (var name in args) {
            localized = localized.replace(
                new RegExp("\\{"+name+"\\}"), args[name]
            );
        }
    }
    return localized;
};