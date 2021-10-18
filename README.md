# SVG Play


### What is this?
This is a silly little controlled animation of a bouncing ball. It creates a pattern as it traces its own path.
There are a few controls available to modify the path and angle of bounce.


### But... Why?
As I was "looking into" (really going through some SVG documentation), I wanted to prototype something to understand it features. One thing led to another and this (whatever you decide to call it) was created. It turned out that my daughters liked to play with it (for reasons I cannot fathom), so why not release this (monstrosity?) over to the world. What harm can it do?


### And... How?
For most part (I think) the code is pretty self-explanatory. In order to run it you would need a simple webserver. If you have python installed on your machine you cna just run `python3 -m http.server` or `python -m SimpleHTTPServer
` (depending on the version of python you have installed) in the `${project-root}/src` directory and open up `index.html`. It should work fine.
> (Sorry, I did not include a server, because I wanted to keep it very light-weight)

Unfortunately, since I am using js module, the `file:///` protocol won't work.

### Feedback?

- Love to hear from all of you. (For issues, you can use Github issues and PRs.)


