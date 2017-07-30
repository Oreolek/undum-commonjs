# Undum (npm package)

**2017 update:** If you are here and you need this… I recommend you to look at [Salet](https://salet.su) instead. It's an Undum-derived engine rewritten for extendability, packaged for NPM. It has all the features from here and then much more.

[Undum](http://undum.com) is a general game framework for building
a sophisticated form of hypertext interactive fiction.

Undum is a pure client-side library, HTML and Javascript.
It is compatible with pretty much every modern web browser.

## How is this repo different

Well, for starters, this is not a framework with docs and stuff here,
this is a `npm` package. That way it's suitable for use with 
[Raconteur.](https://sequitur.github.io/raconteur/)

Second, it's filled with custom modifications for my liking, such as:

- Animations are faster
- Got rid of `animateQuality` because I would never, ever use it
- Got rid of `loadHTMLSituations`, same reason
- Undum now exports `processClick` function - you can do custom interface with that!
- Situation cannot be an implicit choice of itself.
- Implicit choice optionText can be a piece of HTML, it's not escaped
  as text now. You can use text inputs!

## License

The code, documentation, styles, design and images are all distributed
under the MIT license. This permits you to modify and use them, even
for commercial use. A copy of the MIT license is found in the LICENSE
file.
