// https://github.com/gazs/canvas-atkinson-dither/blob/master/worker.coffee
export default (pixels, r=0.2, g=0.5, b=0.2, contrast=5) => {
  let data = pixels.data;
  let len = data.length;
  let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  for(let i = 0; i < len; i += 4) {
    let v = data[i] * r + data[i + 1] * g + data[i + 2] * b;
    v = parseInt(v, 10);
    v = factor * (v - 128) + 128;
    data[i] = data[i + 1] = data[i + 2] = v;
  }
  return pixels;
};
