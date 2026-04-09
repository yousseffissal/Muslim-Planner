// src/tools/Links.js
import { useTranslation } from 'react-i18next';

export function useLinks() {
  const { t } = useTranslation('links');

  const links = [
      { name: t('links.dashboard'), icon: '📊', path: '/app/dashboard' },
      { name: t('links.prayerTimes'), icon: '🕌', path: '/app/prayer-times' },
      { name: t('links.quran'), icon: '📖', path: '/app/quran' },
      { name: t('links.mySchedule'), icon: '🗓️', path: '/app/schedule' },
      { name: t('links.adkar'), icon: '📿', path: '/app/adkar' },
      { name: t('links.tasbih'), icon: '🤲', path: '/app/tasbih' },
      { name: t('links.calendar'), icon: '🗓️', path: '/app/calendar' },
      { name: t('links.about'), icon: 'ℹ️', path: '/app/about' },
    ];

  return links

}