'use client';

import { useEffect, useState } from 'react';

interface EventLog {
  type: 'blocked' | 'allowed' | 'flagged';
  badge: string;
  email: string;
  reason: string;
  timeAgo: string;
}

export function LiveDashboard() {
  const [blockedCount, setBlockedCount] = useState(2841);
  const [allowedCount, setAllowedCount] = useState(18492);
  const [events, setEvents] = useState<EventLog[]>([
    { type: 'blocked', badge: 'Blocked', email: 'j***@yopmail.com', reason: 'Disposable domain', timeAgo: '0s ago' },
    { type: 'flagged', badge: 'Flagged', email: 'm***@gmail.com', reason: 'Residential proxy', timeAgo: '2s ago' },
    { type: 'allowed', badge: 'Allowed', email: 's***@acme.com', reason: 'Score: 0.97', timeAgo: '4s ago' },
    { type: 'blocked', badge: 'Blocked', email: 'a***@guerrillamail.com', reason: 'Bot fingerprint', timeAgo: '6s ago' },
    { type: 'allowed', badge: 'Allowed', email: 't***@stripe.com', reason: 'Score: 0.99', timeAgo: '8s ago' },
  ]);

  const eventPool = [
    { type: 'blocked' as const, email: 'k***@guerrillamail.io', reason: 'Disposable domain' },
    { type: 'allowed' as const, email: 'p***@notion.so', reason: 'Score: 0.99' },
    { type: 'flagged' as const, email: 'r***@protonmail.com', reason: 'Datacenter IP' },
    { type: 'blocked' as const, email: 'x***@tempmail.org', reason: 'Bot fingerprint' },
    { type: 'allowed' as const, email: 'd***@shopify.com', reason: 'Score: 0.98' },
  ];

  useEffect(() => {
    let eIdx = 0;
    const interval = setInterval(() => {
      const event = eventPool[eIdx % eventPool.length];
      setEvents(prev => [
        {
          type: event.type,
          badge: event.type[0].toUpperCase() + event.type.slice(1),
          email: event.email,
          reason: event.reason,
          timeAgo: 'now',
        },
        ...prev.slice(0, 4),
      ]);

      if (event.type === 'blocked') {
        setBlockedCount(c => c + 1);
      } else if (event.type === 'allowed') {
        setAllowedCount(c => c + 1);
      }

      eIdx++;
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="live-section reveal">
      <div className="live-layout">
        <div className="live-left">
          <div className="section-label">Live Intelligence</div>
          <h2 className="section-title">
            See every threat,
            <br />
            in real time
          </h2>
          <p className="section-sub">
            A live stream of every signup attempt, decision, and the reason why — all in a single dashboard your team can trust.
          </p>
          <ul className="check-list">
            <li>Sub-50ms decision latency</li>
            <li>Zero false-positive SLA</li>
            <li>Webhook + REST API native</li>
            <li>Full audit log per decision</li>
          </ul>
        </div>

        <div className="dashboard-frame">
          <div className="dash-topbar">
            <div className="dot dot-r"></div>
            <div className="dot dot-y"></div>
            <div className="dot dot-g"></div>
            <span className="dash-url">SignalMesh.io/dashboard</span>
            <div className="live-pill">
              <span className="live-dot"></span>
              LIVE
            </div>
          </div>
          <div className="dash-body">
            <div className="dash-stats">
              <div className="stat-card">
                <div className="stat-lbl">Blocked today</div>
                <div className="stat-val red">{blockedCount.toLocaleString()}</div>
                <div className="stat-delta"><span className="dn">↑12%</span> vs yesterday</div>
              </div>
              <div className="stat-card">
                <div className="stat-lbl">Allowed</div>
                <div className="stat-val green">{allowedCount.toLocaleString()}</div>
                <div className="stat-delta"><span className="up">↑4%</span> vs yesterday</div>
              </div>
              <div className="stat-card">
                <div className="stat-lbl">Flagged</div>
                <div className="stat-val yellow">394</div>
                <div className="stat-delta">under review</div>
              </div>
              <div className="stat-card">
                <div className="stat-lbl">Avg latency</div>
                <div className="stat-val dark">42ms</div>
                <div className="stat-delta">p99: 88ms</div>
              </div>
            </div>

            <div className="event-log-wrap">
              <div className="event-log">
                {events.map((event, idx) => (
                  <div key={idx} className={`event-row ${event.type}`}>
                    <span className={`ev-badge ${event.type[0]}`}>{event.badge}</span>
                    <span className="ev-email">{event.email}</span>
                    <span className="ev-reason">{event.reason}</span>
                    <span className="ev-time">{event.timeAgo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
