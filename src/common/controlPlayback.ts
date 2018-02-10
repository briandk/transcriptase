import { ipcRenderer } from "electron";
import { duration } from "moment";
import { Player } from "video.js";

const toggleMessage = "User has toggled Play/Pause";
const jumpBackwardsMessage = "User wants to rewind";

const handlePlayPauseToggle = (player: Player) => {
  ipcRenderer.on(toggleMessage, () => {
    if (player.paused() === false) {
      player.pause();
    } else {
      player.play();
    }
  });
};

const getTimeToRewindTo = (player: Player) => {
  const currentTime = duration(player.currentTime(), "seconds");
  const rewindAmount = duration(3, "seconds");
  let soughtTime = currentTime.subtract(rewindAmount).asSeconds();
  if (soughtTime < 0) {
    soughtTime = 0;
  }
  return soughtTime;
};

const handleJumpingBackNSeconds = (player: Player) => {
  ipcRenderer.on(jumpBackwardsMessage, () => {
    player.currentTime(getTimeToRewindTo(player));
  });
};

export { handlePlayPauseToggle, handleJumpingBackNSeconds };
