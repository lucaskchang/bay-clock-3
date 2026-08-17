export const SCHEDULE_EXPORT_VERSION = 1;

export interface ScheduleExport {
  version: number
  schedule: Record<string, unknown>
}

export function wrapScheduleExport(schedule: Record<string, unknown>): ScheduleExport {
  return { version: SCHEDULE_EXPORT_VERSION, schedule };
}

export function encodeScheduleForUrl(schedule: Record<string, unknown>): string {
  const json = JSON.stringify(wrapScheduleExport(schedule));
  const base64 = btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16)),
  ));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeScheduleFromUrl(param: string): Record<string, unknown> {
  const base64 = param.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const json = decodeURIComponent(
    atob(padded)
      .split('')
      .map(char => '%' + char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join(''),
  );
  const parsed = JSON.parse(json);
  if (!parsed || typeof parsed !== 'object' || typeof parsed.schedule !== 'object' || parsed.schedule === null) {
    throw new Error('Invalid schedule link');
  }
  return parsed.schedule;
}
