const fs = require('fs')

const loadFileData = () => {


  const roster = read('roster.dat.json')
  //console.log(roster.toString())
  return roster
}


const write = () => {

}

const read = (file) => {
  return fs.readFileSync(`data/${file}`)
}

loadFileData()

exports.loadFileData = loadFileData