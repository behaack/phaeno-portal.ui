interface KeyValueItem {
  label: React.ReactNode;
  value: React.ReactNode;
  action?: React.ReactNode;  
}

interface KeyValueListProps {
  items: KeyValueItem[];
}

export function KeyValueList({ items }: KeyValueListProps) {
  return (
    <dl className="kv-list">
      {items.map((item, i) => (
        <div key={i} className="kv-row">
          <dt className="kv-label">
            <div className="kv-label-inner">
              {item.label}
              {item.action && (
                <span className="kv-action kv-action--label">
                  {item.action}
                </span>
              )}
            </div>
          </dt>

          <dd className="kv-value">
            <div className="kv-value-inner">
              {item.value ?? "—"}
            </div>
          </dd>
        </div>
      ))}
    </dl>
  )
}
