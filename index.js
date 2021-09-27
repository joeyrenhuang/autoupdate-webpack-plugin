'use strict';
const compareVersions = require('compare-versions');
const { exec, execSync } = require('child_process')
const cmd = 'npm outdated -json'
const red = '\x1b[31m'
const green = '\x1b[32m'
const reset = '\x1b[0m'
function AutoupdateWebpackPlugin(options) {
  this.options = options 
}
AutoupdateWebpackPlugin.prototype.apply = function(c) {
  const P = this
  c.hooks.environment.tap('webpack-plugin-autoupdate', function(args){
    if (c.options.mode === 'development') {
      P.working()
    }
  })
}
AutoupdateWebpackPlugin.prototype.working = function () {
  const options = this.options
  exec(cmd, function(err, io, ioerr){
    if (io) io = JSON.parse(io)
    else return console.log(red, 'Err in ${cmd}', reset)
    console.log(`${green}**************autoupdate-webpack-plugin is working**************`, reset)
    if (typeof io === 'object') {
      let ns = Object.keys(io)
      let L = ns.length
      let tm = L > 20
      let pns = !tm ? ns : [...ns.slice(0, 10), `and ${L - 10} more...`]
      console.log(`${tm ? '' : L + ' '}packages${green} (${pns})${reset} are outdated, specify the packages name in a array to automatically update or just use ${green}*`, reset)
      if (options[0]) {
        ns.forEach((k) => {
          if(options.indexOf(k) !== -1 || options[0] === '*') {
            let v = io[k]
            let n = v.wanted
            if (compareVersions(n, v.latest) < 0) n = v.latest
            if (compareVersions(n, v.current) < 1) return
            console.log(`package ${green}${k}${reset} outdated, current: ${green}${v.current}${reset}, wanted: ${green}${n}${reset}`)
            console.log(`${green}Updating to`, n, '...')
            execSync(`npm i ${k}@${n}`, {stdio: [0, 1, 2]})
          }
        })
      }
    }
  })
}

module.exports = AutoupdateWebpackPlugin
