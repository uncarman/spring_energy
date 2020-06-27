
var _path = process.cwd();
exports.getMime=function(fs,extname){  
    var data=fs.readFileSync(_path+'/mime.json');
    var Mimes=JSON.parse(data.toString());  
    return Mimes[extname] || 'text/html';
}