import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFile } from 'graceful-fs';
import * as path from 'path';
import { promisify} from 'util';
 
const readFileAsync = promisify(readFile);

const host = 'localhost';
const port = 3000;

const server = createServer(
    async (request: IncomingMessage, response: ServerResponse) => {

    try {
        const htmlPath = path.resolve(process.cwd(), 'index.html');
        const cssPath = path.resolve(process.cwd(), 'public/styles/style.css');
        const iconPath = path.resolve(process.cwd(), 'public/images/icon.svg');
        const jsPath = path.resolve(process.cwd(), 'dist/client.js');        
        

        if(request.url === '/favicon.ico'){
            const icon = await readFileAsync(iconPath);
            response.writeHead(200, {'Content-Type': 'image/svg+xml'});
            response.end(icon);
            return;
        }

        if(request.url === '/dist/client.js'){
            
            const js = await readFileAsync(jsPath, 'utf-8');
            response.writeHead(200, { 'Content-Type': 'application/javascript; module; charset=utf-8' });            
            response.end(js);
            return;
        }
    
        const [html, css] = await Promise.all([
            readFileAsync(htmlPath, 'utf-8'),
            readFileAsync(cssPath, 'utf-8'),
        ]);
        
        const content = html.replace('</head>', `<style>${css}</style></head>`);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(content);
        
    } catch (error) {
        console.log(error);
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.end("Internal Server Error");
    }
});
server.listen(port, host, () => {
    console.log(`Servidor rodando na porta 3000\n http://${host}:${port}`);
});