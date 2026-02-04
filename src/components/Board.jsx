export default function Board({ robot, walls }) {
  const size = 5
  const rows = []

  for (let r = size; r >= 1; r--) {
    const cols = []
    for (let c = 1; c <= size; c++) {
      const isRobot = robot && robot.row === r && robot.col === c
      const isWall = walls.some((w) => w.row === r && w.col === c)

      cols.push(
        <div
          key={`${r}-${c}`}
          className={`flex items-center justify-center border border-slate-700 text-xs font-medium w-12 h-12
          ${isRobot ? 'bg-orange-500 text-slate-900' : ''}
          ${isWall ? 'bg-slate-600 text-slate-100' : ''}
          ${!isRobot && !isWall ? 'bg-slate-900 text-slate-500' : ''}
          `}
        >
          {isRobot ? robot.facing[0] : isWall ? 'W' : ''}
        </div>
      )
    }
    rows.push(
      <div key={r} className="grid grid-cols-5">
        {cols}
      </div>
    )
  }

  return (
    <div className="inline-block rounded-lg border border-slate-700 bg-slate-950 p-2 shadow-sm">
      <div className="grid grid-rows-5 gap-0">{rows}</div>
    </div>
  )
}
