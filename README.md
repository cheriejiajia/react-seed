# react-seed
Seed project for React application using Flux architecture. 
Using gulp tasks for watching and compiling React and Less code.

##Installation:
- Install nodejs: https://nodejs.org/
- Install gulp globally: <pre><code>$ npm install gulp -g</code></pre>
- Go to the root of the project, install all the dependencies: <pre><code>$ npm install</code></pre>

##Use:
- For development, run: <pre><code>$ gulp</code></pre> This will watch the changes for both of your React and Less code and automatically compile them to build.js and build.css. A development server will be running at http://localhost:8080. If you make any changes to javascript or less files, the page will automatically reload.
- For production, run: <pre><code>$ gulp build</code></pre> This will compile and minify your React and Less code, and deploy everything to "/dist" folder. In this demo project, all the static assets are in '/src/static' folder, such as images, data, javascript libraries. Everything in this folder will be copied to '/dist/static' when doing build. If you want to start a server in dist folder after build, please run: <pre><code>$ gulp prod-server</code></pre>
