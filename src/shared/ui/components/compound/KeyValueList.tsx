import React from 'react'

export interface KeyValueItem {
  label: React.ReactNode
  value: React.ReactNode

  /** Action rendered next to the label (key side) */
  labelAction?: React.ReactNode

  /** Action rendered at the far-right end of the row (value side end) */
  valueAction?: React.ReactNode
}

export interface KeyValueListProps {
  items: KeyValueItem[]
  /** Optional placeholder for null/undefined values */
  emptyValue?: React.ReactNode
}

export function KeyValueList({ items, emptyValue = '—' }: KeyValueListProps) {
  return (
    <dl className="kv-list">
      {items.map((item, i) => (
        <div key={i} className="kv-row">
          <dt className="kv-label">
            <div className="kv-label-inner">
              <span className="kv-label-text">{item.label}</span>

              {item.labelAction ? (
                <span className="kv-action kv-action--label">{item.labelAction}</span>
              ) : null}
            </div>
          </dt>

          <dd className="kv-value">
            <div className="kv-value-inner">
              <span className="kv-value-text">{item.value ?? emptyValue}</span>

              {item.valueAction ? (
                <span className="kv-action kv-action--value">{item.valueAction}</span>
              ) : null}
            </div>
          </dd>
        </div>
      ))}
    </dl>
  )
}
