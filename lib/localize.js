// Internationalization support based on the code provided by Oreolek.

var $ = require('jquery'),
    languages = {};

// -----------------------------------------------------------------------
// Default Messages
// -----------------------------------------------------------------------

var en = {
    terrible: "terrible",
    poor: "poor",
    mediocre: "mediocre",
    fair: "fair",
    good: "good",
    great: "great",
    superb: "superb",
    yes: "yes",
    no: "no",
    choice: "Choice {number}",
    no_group_definition: "Couldn't find a group definition for {id}.",
    link_not_valid: "The link '{link}' doesn't appear to be valid.",
    link_no_action: "A link with a situation of '.', must have an action.",
    unknown_situation: "You can't move to an unknown situation: {id}.",
    existing_situation: "You can't override situation {id} in HTML.",
    erase_message: "This will permanently delete this character and immediately return you to the start of the game. Are you sure?",
    no_current_situation: "I can't display, because we don't have a current situation.",
    no_local_storage: "No local storage available.",
    random_seed_error: "You must provide a valid random seed.",
    random_error: "Initialize the Random with a non-empty seed before use.",
    dice_string_error: "Couldn't interpret your dice string: '{string}'."
};

// Set this data as both the default fallback language, and the english
// preferred language.
languages[""] = en;
languages["en"] = en;

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

module.exports = languages;