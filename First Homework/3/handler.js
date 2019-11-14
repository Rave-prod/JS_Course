const fs = require('fs');

function _handler(request, response) {
    let filename = 'public' + request.url.slice(0, request.url.length - 1);
    if (request.url === '/favicon.ico') return;
    fs.readFile('./template.html', 'utf8', (err_template, data_template) => {
        if (err_template) {
            response.writeHead(500);
            response.end(err_template.toString());
            return;
        }
        if (fs.existsSync(filename)) {
            var data = fs.readFileSync(filename, 'utf8');
        }
        else {
            response.writeHead(404);
            response.end('404 File ' + filename + ' Not Found');
            return;
        }
        let result = data_template.replace(/%read-file%/g, data).replace(/%file-name%/g, request.url.slice(0, request.url.length - 1).slice(1));

        response.writeHead(200, {
            'Content-Type':'text/html; charset=utf-8'
        });

        response.end(result);
    });
}

module.exports = {
    handler : _handler,
    port    : 8080
}