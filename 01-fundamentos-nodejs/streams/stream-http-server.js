import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed)
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullBuffer = Buffer.concat(buffers).toString();
    console.log(fullBuffer);

    return res.end(fullBuffer)
});

server.listen(3334);
