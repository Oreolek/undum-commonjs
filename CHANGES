# Version 3.2.0

- Content added to the page via `System.write()` and related functions now has the `.new` element class attached to it (until a new batch of content is written by another call to `doWrite()`).
- The scrolling code has been mostly rewritten, resulting in smarter and more consistent behaviour; it now uses `.new` to be able to know with greater precision what region of the page contains new content, and makes a smarter attempt at positioning that content in a way that is readable to the player.
- Refreshing the page is now the only way to restart the game; erasing a saved game now forces a page reload. Previously, authors had to store every single piece of game state inside the Character object, to avoid bugs caused by state carrying over across a save/erase cycle.

This last change bears a little more explanation: The previous behaviour was undesirable because it tended to induce inexperienced authors to write bugs, while forcing authors to use a single data structure to store all game state, sometimes in ways that inhibit extending the engine or tooling.

There are two ways to fix this. Either we add more designated places to hold game state, and we write a bunch of complicated code to make sure those designated places are cleared correctly when game restarts happen; or we make "refresh the page" our default way of restarting games. The latter is so much simpler for Undum that it seems hard to justify doing the other. Reloading the page is already the default, expected way for game restarts to happen (both in Undum and in Twine), so taking away the bug-inducing special case created by the erase button seems adequate.

# Version 3.0.0

- This fork of Undum is now a commonjs module.