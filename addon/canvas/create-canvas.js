export default (width, height) => {
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext('2d');
  return { canvas, ctx, size: { width, height } };
}
