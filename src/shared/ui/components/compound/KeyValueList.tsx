interface KeyValueItem {
  label: React.ReactNode;
  value: React.ReactNode;
}

interface KeyValueListProps {
  items: KeyValueItem[];
}

export function KeyValueList({ items }: KeyValueListProps) {
  return (
    <dl className="kv-list">
      {items.map((item, i) => (
        <div key={i} className="kv-row">
          <dt className="kv-label">{item.label}</dt>
          <dd className="kv-value">{item.value ?? "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
