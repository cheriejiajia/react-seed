# react-seed
Seed project for React application using Flux architecture and Less. 
Using gulp tasks for watching and compiling React and Less code.

##Installation:
- Install nodejs: https://nodejs.org/
- Install gulp globally: <pre><code>$ npm install gulp -g</code></pre>
- Go to the root of the project, install all the dependencies: <pre><code>$ npm install</code></pre>
- If you get error when installing jest-cli on windows, please install the latest version of Visual Studio and run: <pre><code>$ npm install --msvs-version=[version]</code></pre>The [version] should be the version of your installed Visual Studio (e.g.2013)

##Use:
- Before developing, run: <pre><code>$ gulp</code></pre> This will watch the changes for both of your React and Less code and automatically compile them to build.js and build.css. If there are errors during developing, you need to re-run this command.
- Before deployment, run: <pre><code>$ gulp build</code></pre> This will compile your React and Less code and minify them.
