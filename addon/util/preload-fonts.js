import WebFont from 'webfont';
import { Promise } from 'rsvp';

export default (spec={}) => new Promise(resolve => {
  spec.active = () => resolve();
  WebFont.load(spec);
});
