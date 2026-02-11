import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

function ParticlesBackground({ darkMode }) {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const options = useMemo(() => ({
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    background: {
      color: {
        value: 'transparent'
      }
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: darkMode ? ['#5B8BD9', '#F7941D'] : ['#3B6BC7', '#F7941D']
      },
      links: {
        color: darkMode ? '#5B8BD9' : '#3B6BC7',
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: false,
        straight: false,
        outModes: {
          default: 'bounce'
        }
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.6
      },
      shape: {
        type: 'circle'
      },
      size: {
        value: { min: 1, max: 4 }
      }
    },
    detectRetina: true
  }), [darkMode])

  if (!init) return null

  return <Particles id="tsparticles" options={options} />
}

export default ParticlesBackground