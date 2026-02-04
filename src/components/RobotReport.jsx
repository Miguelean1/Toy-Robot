export default function RobotReport({ report }) {
  if (!report) {
    return (
      <p className="text-xs text-slate-500">
        No report yet. Use the REPORT command to view the R.O.V.E.R. position.
      </p>
    )
  }

  return (
    <p className="text-sm">
      <span className="text-slate-400">Don't panic! R.O.V.E.R. was last seen on: </span>{' '}
      <span className="font-mono text-orange-400">{report}</span>
    </p>
  )
}
