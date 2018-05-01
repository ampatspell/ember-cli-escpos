import { Promise } from 'rsvp';

const fullURL = (url, proxy) => {
  if(proxy) {
    return `/escpos/proxy?url=${encodeURIComponent(url)}`;
  }
  return url;
};

export default (url, proxy=false) => new Promise((resolve, reject) => {
  let image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error('Image load failed'));
  image.src = fullURL(url, proxy);
});
