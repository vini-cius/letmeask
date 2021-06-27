import { RoomCodeButton } from '../styles/room-code';

import copyImg from '../assets/images/copy.svg';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <RoomCodeButton onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>

      <span>Sala {props.code}</span>
    </RoomCodeButton>
  )
}