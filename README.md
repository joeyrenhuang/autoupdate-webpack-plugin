For some reason you may want to keep some packages updated always. 

1. Install
```
  npm i -D autoupdate-webpack-plugin
```
2. Add to webpack plugin
```
  new (require('autoupdate-webpack-plugin'))(['the-name']) # keep the package 'the-name' autoupdate when run webpack
```
