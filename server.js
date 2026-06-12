const http = require('http');
const url = require('url');

function gcd(a, b) {
    return b === 0n ? a : gcd(b, a % b);
}

function lcm(a, b) {
    if (a === 0n || b === 0n) return 0n;
    return (a * b) / gcd(a, b);
}

function isNatural(str) {
    if (!str || typeof str !== 'string' || !/^\d+$/.test(str)) return false;
    return BigInt(str) > 0n;
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/shuhratabdurahmonov2004_gmail_com' && req.method === 'GET') {
        const { x, y } = parsedUrl.query;

        res.writeHead(200, { 'Content-Type': 'text/plain' });

        if (!isNatural(x) || !isNatural(y)) {
            return res.end('NaN');
        }

        try {
            const bigX = BigInt(x);
            const bigY = BigInt(y);
            const result = lcm(bigX, bigY);
            
            return res.end(result.toString());
        } catch (e) {
            return res.end('NaN');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});