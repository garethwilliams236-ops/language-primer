import React from "react";

/** Russian stress: a "+" after a vowel marks it stressed. Renders the vowel red with an acute accent. */
export function Ru({ t }: { t: string }) {
  const parts = String(t ?? "").split(/([аеёиоуыэюяАЕЁИОУЫЭЮЯ])\+/);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="st">{p}{"́"}</span>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        )
      )}
    </>
  );
}

/** Course prose: [[word]] becomes a tappable spoken word, **text** is bold. */
export function Rich({ t }: { t: string }) {
  const s = String(t ?? "");
  const out: React.ReactNode[] = [];
  const re = /\[\[(.+?)\]\]|\*\*(.+?)\*\*/g;
  let last = 0, k = 0, m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(<React.Fragment key={k++}>{s.slice(last, m.index)}</React.Fragment>);
    if (m[1] !== undefined) out.push(<button type="button" key={k++} className="say-inline" data-say={m[1]}><Ru t={m[1]} /></button>);
    else out.push(<b key={k++}>{m[2]}</b>);
    last = re.lastIndex;
  }
  if (last < s.length) out.push(<React.Fragment key={k++}>{s.slice(last)}</React.Fragment>);
  return <>{out}</>;
}

export const PlayIcon = () => (
  <svg viewBox="0 0 12 14" aria-hidden="true"><path d="M0 0v14l12-7z" fill="currentColor" /></svg>
);
