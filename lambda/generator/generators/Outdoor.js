var Perlin = require('../util/PerlinNoise');

function generateOutdoorMap(seed, size) {
    if (size === undefined) size = 100;

    var noise = Perlin.generatePerlinNoise(seed, size, size);
    var map = [];

    for (var x = 0; x < size; x++) {
        map.push([]);
        for (var y = 0; y < size; y++) {
            var value = noise[y * size + x];
            if (value > 0.9) map[x][y] = 3;
            else if (value > 0.8) map[x][y] = 2;
            else if (value > 0.3) map[x][y] = 1;
            else map[x][y] = 0;
        }
    }

    return map;
}

module.exports = generateOutdoorMap;
