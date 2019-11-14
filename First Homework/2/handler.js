const fs = require('fs');

function _handler(request, response) {
    let filename = 'public' + request.url.slice(0, request.url.length - 1);
    if (request.url === '/favicon.ico') return;
    fs.readFile(filename, (err, data) => {
        if (err) {
            response.writeHead(500);
            response.end(err.toString());
            return;
        }
        response.writeHead(200, {
            'Content-Type':'text/plain; charset=utf-8'
        });
        response.end(data);
    })
}

module.exports = {
    handler : _handler,
    port    : 8080
}