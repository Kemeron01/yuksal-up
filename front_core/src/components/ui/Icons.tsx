import { ArrowUpRight, Award, Briefcase, Globe, MessageCircle, Search, Send, SquareCheckBig, Bookmark, FileText, BookOpen } from 'lucide-react';
import heart28 from '@/assets/icons/heart-28.svg';
import heart24 from '@/assets/icons/heart-24.svg';
import book28 from '@/assets/icons/book-28.svg';
import calendar44 from '@/assets/icons/calendar-44.svg';
import building24 from '@/assets/icons/building-24.svg';
import bookmarkFilled24 from '@/assets/icons/bookmark-filled-24.svg';
import calendar24 from '@/assets/icons/calendar-24.svg';
import menu24 from '@/assets/icons/menu-24.svg';

/** Icon sizes are given by the container (width/height 100%), so they scale per breakpoint. */
interface IconProps {
  className?: string;
  color?: string;
}

const STROKE = 1.7;

export function ArrowIcon({ className, color = 'var(--navy)' }: IconProps) {
  return <ArrowUpRight className={className} color={color} size="100%" strokeWidth={STROKE} aria-hidden />;
}
export function BriefcaseIcon({ className, color = 'var(--navy)' }: IconProps) {
  return <Briefcase className={className} color={color} size="100%" strokeWidth={STROKE} aria-hidden />;
}
export function DebateIcon({ className, color = 'var(--navy)' }: IconProps) {
  return <MessageCircle className={className} color={color} size="100%" strokeWidth={STROKE} aria-hidden />;
}
export function AwardIcon({ className, color = 'var(--navy)' }: IconProps) {
  return <Award className={className} color={color} size="100%" strokeWidth={STROKE} aria-hidden />;
}
export function GlobeIcon({ className, color = 'var(--navy)' }: IconProps) {
  return <Globe className={className} color={color} size="100%" strokeWidth={STROKE} aria-hidden />;
}

export function SendIcon({ className, color = 'var(--navy)' }: IconProps) {
  return <Send className={className} color={color} size="100%" strokeWidth={STROKE} aria-hidden />;
}
export function CheckSquareIcon({ className, color = 'var(--navy)' }: IconProps) {
  return <SquareCheckBig className={className} color={color} size="100%" strokeWidth={STROKE} aria-hidden />;
}

export function SearchIcon({ className, color = 'var(--navy)' }: IconProps) {
  return <Search className={className} color={color} size="100%" strokeWidth={STROKE} aria-hidden />;
}
export function BookmarkIcon({ className, color = 'var(--navy)' }: IconProps) {
  return <Bookmark className={className} color={color} size="100%" strokeWidth={STROKE} aria-hidden />;
}

export function FileTextIcon({ className, color = 'var(--navy)' }: IconProps) {
  return <FileText className={className} color={color} size="100%" strokeWidth={STROKE} aria-hidden />;
}
export function BookOpenIcon({ className, color = 'var(--navy)' }: IconProps) {
  return <BookOpen className={className} color={color} size="100%" strokeWidth={STROKE} aria-hidden />;
}

/** Icons exported from Figma as static SVG assets (stroke colour is baked into the files). */
function Asset({ src, className }: { src: string; className?: string }) {
  return <img src={src} alt="" className={className} style={{ width: '100%', height: '100%' }} />;
}
/** Muted (#737373) heart, used in the category strip. */
export const HeartMutedIcon = ({ className }: { className?: string }) => <Asset src={heart28} className={className} />;
/** Navy heart, used on topic cards. */
export const HeartIcon = ({ className }: { className?: string }) => <Asset src={heart24} className={className} />;
export const BookIcon = ({ className }: { className?: string }) => <Asset src={book28} className={className} />;
export const CalendarIcon = ({ className }: { className?: string }) => <Asset src={calendar44} className={className} />;
export const MenuIcon = ({ className }: { className?: string }) => <Asset src={menu24} className={className} />;
export const CalendarSmallIcon = ({ className }: { className?: string }) => <Asset src={calendar24} className={className} />;
export const BuildingIcon = ({ className }: { className?: string }) => <Asset src={building24} className={className} />;
export const BookmarkFilledIcon = ({ className }: { className?: string }) => <Asset src={bookmarkFilled24} className={className} />;
