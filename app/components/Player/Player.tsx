import { useState } from 'react'

import ReactPlayer from 'react-player'

// @ts-ignore bundling issue with react-player
const Player = ReactPlayer.default as typeof ReactPlayer;

export function PlayerVideo() {
  const [hasVideoLoaded, setHasIsVideoLoaded] = useState(false)

  return (
    <div className={`${hasVideoLoaded ? 'opacity-100' : 'opacity-0'} transition`}>
      <Player
        url='https://www.youtube.com/watch?v=LXb3EKWsInQ'
        playing={true}
        muted={true}
        playsinline={true}
        onReady={() => setHasIsVideoLoaded(true)}
      />
    </div>
  )
}