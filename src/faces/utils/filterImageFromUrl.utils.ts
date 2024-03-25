import Jimp from 'jimp';
import * as path from 'path';

export async function filterImageFromURL(inputURL: string): Promise<string> {
    return new Promise((resolve, reject) => {
        Jimp.read(inputURL)
            .then(photo => {
                const outputFileName = `filtered_${Date.now()}.jpg`; // Generate output file name
                const outputPath = path.join(path.dirname(inputURL), outputFileName); // Construct output path
                photo
                    .resize(256, 256) // resize
                    .quality(60) // set JPEG quality
                    .greyscale() // set greyscale
                    .write(outputPath, () => {
                        resolve(outputPath); // Resolve with the output path
                    });
            })
            .catch(err => {
                console.error(err);
                reject("Could not read image.");
            });
    });
}
