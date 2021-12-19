import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(videoplayerCurrentTime, 1000));

function videoplayerCurrentTime(timeupdate) {
  localStorage.setItem('videoplayer-current-time', timeupdate.seconds);
  return timeupdate.seconds;
}

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
