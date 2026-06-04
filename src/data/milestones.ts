export interface LoveMilestone {
  id: string
  emoji: string
  title: string
  date: string
  dateLabel: string
}

export const LOVE_MILESTONES: LoveMilestone[] = [
  {
    id: 'first-meeting',
    emoji: '📍',
    title: 'Our first meeting',
    date: '15.10.2024',
    dateLabel: '15 October 2024',
  },
  {
    id: 'cherished-milestone',
    emoji: '💖',
    title: 'A cherished milestone in our love story',
    date: '12.01.2026',
    dateLabel: '12 January 2026',
  },
  {
    id: 'marriage',
    emoji: '💍',
    title: 'Our marriage',
    date: '06.06.2026',
    dateLabel: '6 June 2026',
  },
]
