import { DateTime } from 'luxon'

export interface Props {
  startValue: string
  stopValue: string
}

export function DisplayTimeSpan({ startValue, stopValue }: Props) {
  const start = DateTime.fromISO(startValue)
  const stop = DateTime.fromISO(stopValue)
  const difference = stop.diff(start, ['hours', 'minutes', 'seconds', 'milliseconds'])

  const hourLabel = difference.hours === 1 ? 'Hour' : 'Hours'
  const minuteLabel = difference.minutes === 1 ? 'Minute' : 'Minutes'
  const secondLabel = difference.seconds === 1 ? 'Second' : 'Seconds'
  const millisecondLabel = difference.milliseconds === 1 ? 'Millisecond' : 'Milliseconds'

  return (
    <div className="flex gap-2 items-center">
      {difference.hours ? (
        <div>
          {difference.hours} <span className="text-fg-muted">{hourLabel}</span>
        </div>
      ) : null}
      {difference.minutes ? (
        <div>
          {difference.minutes} <span className="text-fg-muted">{minuteLabel}</span>
        </div>
      ) : null}
      {difference.seconds ? (
        <div>
          {difference.seconds} <span className="text-fg-muted">{secondLabel}</span>
        </div>
      ) : null}
      {difference.milliseconds ? (
        <div>
          {difference.milliseconds} <span className="text-fg-muted">{millisecondLabel}</span>
        </div>
      ) : null}
    </div>
  )
}
