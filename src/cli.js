const ExifTransformer  = require("exif-be-gone");
const fs = require("fs");
const sharp = require("sharp");

export async function cli(args) {
    const filename = args[2];
    const tempName = "tmp.jpg";
    await new Promise((resolve) => {
        const reader = fs.createReadStream(filename);
        const writer = fs.createWriteStream(tempName);
        
        reader.pipe(new ExifTransformer()).pipe(writer);
        reader.on("end", () => {
            resolve();
        });
    });

    sharp(tempName)
        .rotate(90)
        .toBuffer(function (err, outputBuffer, info) {
            fs.writeFileSync(filename, outputBuffer);
            fs.rmSync(tempName);
        });
}