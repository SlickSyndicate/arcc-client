let Perlin = require('../util/PerlinNoise');

function generateOutdoorMap(seed, size) {
    if (size === undefined) size = 100;

    let noise = Perlin.generatePerlinNoise(seed, size, size);
    let map = [];

    for (let x = 0; x < size; x++) {
        map.push([]);
        for (let y = 0; y < size; y++) {
            let value = noise[y * size + x];
            if (value > 0.5) map[x][y] = 1;
            else map[x][y] = 0;
        }
    }

    return map;
}

module.exports = generateOutdoorMap;
