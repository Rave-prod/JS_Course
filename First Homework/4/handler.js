const fs = require('fs');

function _handler(request, response) {
    let filename = 'public' + request.url.slice(0, request.url.length - 1);
    if (request.method === 'GET') {
        if (request.url === '/favicon.ico') return;
        if (request.url === '/') { response.end('Choose file...'); return; }
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
                'Content-Type': 'text/html; charset=utf-8'
            });

            response.end(result);
        });

    }
    else if (request.method === 'POST') {
        request.on('data', function (chunk) {
            console.log(decodeURI(chunk.toString().split('=')[1]).replace('+', ' ').trimLeft());
            console.log(filename);
            fs.writeFile(filename, decodeURI(chunk.toString().split('=')[1]).replace('+', ' ').trimLeft(), function (err) {
                if (err) return console.log(err);
            });
            setTimeout(() => {
                response.writeHead(302, {
                    'Location': 'http://localhost:8080'
                });
                response.end('File edited!');
            }, 3000);
            // response.write();
            
        });

    }
}

module.exports = {
    handler: _handler,
    port: 8080
}