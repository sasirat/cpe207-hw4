const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    console.log(req.url);
    console.log(req.url.split('/'));
    if(req.url === '/'){
        fs.readFile('./public/index.html',(err,content) => {
            if(err) throw err;
            res.writeHead(200,{'content-type': 'text/html'});
            res.end(content);
        });
    }else if(req.url === '/css/style.css'){
        fs.readFile('./public/css/style.css',(err,content) => {
            if(err) throw err;
            res.writeHead(200,{'content-type': 'text/css'});
            res.end(content);
        });
    }else if(req.url === '/main.js'){
        fs.readFile('./public/main.js',(err,content) => {
            if(err) throw err;
            res.writeHead(200,{'content-type': 'text/javascript'});
            res.end(content);
        });
    }else if(req.url.split('/')[1] === 'img'){
        fs.readFile('./public' + req.url,(err,content) => {
            if(err) throw err;
            res.writeHead(200,{'content-type': 'text/jpg'});
            res.end(content);
        });
    }else {
        fs.readFile('./public/404.html',(err,content) => {
            if(err) throw err;
            res.writeHead(404,{'content-type': 'text/html'});
            res.end(content);
        });
    }       
})

server.listen(7777,() =>{
    console.log('Server is runing ... ');
})