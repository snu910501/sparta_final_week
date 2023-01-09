let file = 'routes.index.js.Png';

let fileDot = file.lastIndexOf('.');
console.log(fileDot);

let fileType = file.substring(fileDot + 1, file.length).toLowerCase();

console.log(fileType);