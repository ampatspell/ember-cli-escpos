import { Promise } from 'rsvp';

export default canvas => new Promise(resolve => {
  canvas.toBlob(blob => resolve(blob), 'image/png');
});
