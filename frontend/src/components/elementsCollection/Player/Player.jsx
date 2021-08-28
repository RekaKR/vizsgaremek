import React, { useState, useEffect } from "react"
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded'
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import music from "../../../Music.mp3"

const Player = () => {
  const [audio, setAudio] = useState(new Audio(music))
  const [playing, setPlaying] = useState(false)

  const pause = (audio) => {
    audio.pause()
    audio.currentTime = 0
  }

  useEffect(() => {
    playing
      ? audio.play()
      : pause(audio)
  }, [playing])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))

    return () => {
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [])

  return (
    <>
      {
        playing
          ? <div>
            <button className="link-button colored" onClick={() => setPlaying(!playing)}>Stop</button>
            <StopRoundedIcon className="play-icon"></StopRoundedIcon>
          </div>
          : <div>
            <button className="link-button colored" onClick={() => setPlaying(!playing)}>Vibe</button>
            <PlayArrowRoundedIcon className="play-icon"></PlayArrowRoundedIcon>
          </div>
      }
    </>
  )
}

export default Player