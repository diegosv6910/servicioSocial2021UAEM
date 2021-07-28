class readDirectory{
    readFiles() {
        const fs = require('fs');
        var files = fs.readdirSync('./uploads')
        console.log('files')
    }
}

module.exports = readDirectory;