import * as moment from "moment";
import { padToHoursMinutesSeconds as padTimestamp } from "./padTimestamp";

export function scrubVideoToTimestamp() {
  const player = document.getElementsByTagName("video")[0];
  const timestamp = padTimestamp(this.innerHTML);
  const timeToGoTo = moment
    .duration(timestamp)
    .asSeconds();

  if (player !== null && player.duration !== null) {
    if (timeToGoTo >= 0 && timeToGoTo <= player.duration) {
      player.currentTime = timeToGoTo;
    }
  }
}
