// https://github.com/gazs/canvas-atkinson-dither/blob/master/worker.coffee
export default pixels => {
  let { data, width } = pixels;
  let len = data.length;
  for(let i = 0; i < len; i += 4) {
    let neighbours = [ i + 4, i + 8, i + (4 * width) - 4, i + (4 * width), i + (4 * width) + 4, i + (8 * width) ];
    let mono = data[i] <= 128 ? 0 : 255
    let err = parseInt((data[i] - mono) / 8, 10);
    for(let n = 0; n < neighbours.length; n++) {
      data[neighbours[n]] += err;
    }
    data[i] = mono;
    data[i + 1] = data[i + 2] = data[i];
    data[i + 3] = mono ? 0 : 255;
  }
  return pixels;
};
