import { Promise } from 'rsvp';

export default url => new Promise((resolve, reject) => {
  let image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error('Image load failed'));
  image.src = url;
});
