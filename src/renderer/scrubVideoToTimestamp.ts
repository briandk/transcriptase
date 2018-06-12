import * as moment from "moment";
import { padToHoursMinutesSeconds as pad } from "./padTimestamp";

const scrubVideoToTimestamp: (e: any) => void = (event) => {
  const player: any = document.getElementsByTagName("video")[0];
  const rawTimestamp: string = event.target.innerText as string;
  const paddedTimestamp: string = pad(rawTimestamp);
  const timeToGoTo: number = moment.duration(paddedTimestamp).asSeconds();

  if (player !== null && player.duration !== null) {
    if (timeToGoTo >= 0 && timeToGoTo <= player.duration) {
      player.currentTime = timeToGoTo;
    }
  }
};

export { scrubVideoToTimestamp };
