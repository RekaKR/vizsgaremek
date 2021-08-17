import React, { useState, useEffect } from "react"
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
    <button onClick={() => setPlaying(!playing)}>{playing ? "Megállítás" : "Lejátszás"}</button>
  )
}

export default Player