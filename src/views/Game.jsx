import { useState } from 'react'
import Swal from 'sweetalert2'
import Board from '../components/Board'
import CommandInput from '../components/CommandInput'
import RobotReport from '../components/RobotReport'

const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST']

export default function Game() {
  const [robot, setRobot] = useState(null)
  const [walls, setWalls] = useState([])
  const [report, setReport] = useState('')

  const showError = (message) => {
    Swal.fire({
      title: '⚠️ Navigation error',
      text: message,
      icon: 'error',
      confirmButtonText: 'Roger that',
      confirmButtonColor: '#dc2626',
      background: '#1c1917',
      color: '#fbbf24',
      iconColor: '#dc2626',
    })
  }

  const showSuccess = (message) => {
    Swal.fire({
      title: '✓ Mission Update',
      text: message,
      icon: 'success',
      confirmButtonText: 'Continue',
      confirmButtonColor: '#ea580c',
      background: '#1c1917',
      color: '#fbbf24',
      iconColor: '#22c55e',
    })
  }

  const handleCommand = (command) => {
    const parts = command.trim().split(' ')
    const action = parts[0]
    const args = parts[1] ? parts[1].split(',') : []

    switch (action) {
      case 'PLACE_ROBOT': {
        const [row, col, facing] = args
        const r = parseInt(row)
        const c = parseInt(col)

        if (
          Number.isNaN(r) ||
          Number.isNaN(c) ||
          !facing ||
          !DIRECTIONS.includes(facing)
        ) {
          showError('PLACE_ROBOT requires: row,col,facing (NORTH/EAST/SOUTH/WEST).')
          return
        }

        if (r < 1 || r > 5 || c < 1 || c > 5) {
          showError('The R.O.V.E.R. must be placed inside the 5x5 grid.')
          return
        }

        setRobot({ row: r, col: c, facing })
        showSuccess('R.O.V.E.R. deployed on Martian surface.')
        break
      }
      case 'PLACE_WALL': {
        const [wRow, wCol] = args.map(Number)

        if (Number.isNaN(wRow) || Number.isNaN(wCol)) {
          showError('PLACE_WALL requires: row,col.')
          return
        }

        if (wRow < 1 || wRow > 5 || wCol < 1 || wCol > 5) {
          showError('The obstacle must be placed inside the 5x5 grid.')
          return
        }

        if (robot && robot.row === wRow && robot.col === wCol) {
          showError('Cannot place obstacle on rover position.')
          return
        }

        if (walls.some((w) => w.row === wRow && w.col === wCol)) {
          showError('Obstacle already detected at this location.')
          return
        }

        setWalls([...walls, { row: wRow, col: wCol }])
        showSuccess('Obstacle registered on terrain map.')
        break
      }
      case 'MOVE': {
        if (!robot) {
          showError('Deploy the rover before navigation.')
          return
        }

        let { row: mr, col: mc, facing: mf } = robot
        let newRow = mr
        let newCol = mc

        switch (mf) {
          case 'NORTH':
            newRow = mr === 5 ? 1 : mr + 1
            break
          case 'SOUTH':
            newRow = mr === 1 ? 5 : mr - 1
            break
          case 'EAST':
            newCol = mc === 5 ? 1 : mc + 1
            break
          case 'WEST':
            newCol = mc === 1 ? 5 : mc - 1
            break
        }

        if (walls.some((w) => w.row === newRow && w.col === newCol)) {
          showError('Obstacle detected. Rover cannot proceed.')
          return
        }

        setRobot({ row: newRow, col: newCol, facing: mf })
        break
      }
      case 'LEFT': {
        if (!robot) {
          showError('Deploy the rover first.')
          return
        }
        const index = DIRECTIONS.indexOf(robot.facing)
        setRobot({
          ...robot,
          facing: DIRECTIONS[(index + 3) % 4],
        })
        break
      }
      case 'RIGHT': {
        if (!robot) {
          showError('Deploy the rover first.')
          return
        }
        const index = DIRECTIONS.indexOf(robot.facing)
        setRobot({
          ...robot,
          facing: DIRECTIONS[(index + 1) % 4],
        })
        break
      }
      case 'REPORT': {
        if (!robot) {
          showError('Deploy the rover before requesting telemetry.')
          return
        }
        const value = `${robot.row},${robot.col},${robot.facing}`
        setReport(value)
        showSuccess(`R.O.V.E.R. telemetry: ${value}`)
        break
      }
      default: {
        showError('Unknown command. Please, use the briefing.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-orange-950 to-stone-900">
      
      <div className="border-b border-orange-900/50 bg-stone-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔴</div>
            <div>
              <h1 className="text-2xl font-bold tracking-wider text-orange-500">
                MARS R.O.V.E.R. CONTROL
              </h1>
              <p className="text-xs font-mono text-orange-300/70">
                Mission Sol 2847 // Terrain Mapping Active
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          
          
          <div className="space-y-4">
            <div className="rounded-lg border border-orange-800/50 bg-stone-950/60 p-4 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-orange-400">
                   Terrain Grid
                </h2>
                <div className="rounded bg-orange-950/50 px-2 py-1 text-xs font-mono text-orange-300">
                  5x5 km²
                </div>
              </div>
              <div className="flex justify-center">
                <Board robot={robot} walls={walls} />
              </div>
            </div>

            
            <div className="rounded-lg border border-orange-800/50 bg-stone-950/60 p-4 backdrop-blur">
              <h3 className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-orange-400">
                 R.O.V.E.R. Telemetry
              </h3>
              <RobotReport report={report} />
            </div>
          </div>

          
          <div className="space-y-4">
            
            
            <div className="rounded-lg border border-orange-800/50 bg-stone-950/60 p-4 backdrop-blur">
              <h3 className="mb-3 font-mono text-sm font-semibold uppercase tracking-wider text-orange-400">
                 Command Terminal
              </h3>
              <CommandInput onCommand={handleCommand} />
            </div>

            
            <div className="rounded-lg border border-orange-800/50 bg-stone-950/60 p-4 backdrop-blur">
              <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-orange-400">
                 Available Commands
              </h3>
              <div className="space-y-2 font-mono text-xs text-orange-200/80">
                <div className="rounded bg-stone-900/50 p-2 border border-orange-900/30">
                  <span className="text-orange-400 font-semibold">PLACE_ROBOT</span> X,Y,DIR
                  <div className="text-orange-300/60 text-[10px] mt-1">
                    DIR: NORTH, EAST, SOUTH, WEST
                  </div>
                </div>
                <div className="rounded bg-stone-900/50 p-2 border border-orange-900/30">
                  <span className="text-orange-400 font-semibold">PLACE_WALL</span> X,Y
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded bg-stone-900/50 p-2 border border-orange-900/30">
                    <span className="text-orange-400 font-semibold">MOVE</span>
                  </div>
                  <div className="rounded bg-stone-900/50 p-2 border border-orange-900/30">
                    <span className="text-orange-400 font-semibold">REPORT</span>
                  </div>
                  <div className="rounded bg-stone-900/50 p-2 border border-orange-900/30">
                    <span className="text-orange-400 font-semibold">LEFT</span>
                  </div>
                  <div className="rounded bg-stone-900/50 p-2 border border-orange-900/30">
                    <span className="text-orange-400 font-semibold">RIGHT</span>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="rounded-lg border border-orange-800/50 bg-gradient-to-br from-orange-950/40 to-red-950/40 p-4 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🛰️</div>
                <div>
                  <h4 className="font-mono text-xs font-semibold text-orange-400 mb-1">
                    MISSION TIPS
                  </h4>
                  <p className="text-[11px] text-orange-200/70 leading-relaxed">
                    Navigate the rover across the Martian terrain. Remeber to avoid walls!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}