import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { curriculumLessons } from '@/data/curriculumData';
import { JAVA_MODULES, OOP_MODULES } from '../curriculumModulesData';

export interface LessonNavigationFooterProps {
  currentLessonId?: string;
  track?: 'java' | 'oop';
  className?: string;
}

interface NavItem {
  id: string;
  title: string;
  route: string;
}

export const LessonNavigationFooter: React.FC<LessonNavigationFooterProps> = ({
  currentLessonId,
  track: propTrack,
  className = '',
}) => {
  const [searchParams] = useSearchParams();
  const trackParam = (searchParams.get('track') as 'java' | 'oop' | null) || propTrack;

  // Flatten concepts from curriculumModulesData for each track
  const javaSubConcepts: NavItem[] = React.useMemo(() => {
    return JAVA_MODULES.flatMap((mod) =>
      mod.concepts.map((c) => ({
        id: c.id,
        title: c.title,
        route: `/app/concepts/${c.id}?track=java`,
      }))
    );
  }, []);

  const oopSubConcepts: NavItem[] = React.useMemo(() => {
    return OOP_MODULES.flatMap((mod) =>
      mod.concepts.map((c) => ({
        id: c.id,
        title: c.title,
        route: `/app/concepts/${c.id}?track=oop`,
      }))
    );
  }, []);

  // Canonical curriculum lessons sequence
  const canonicalLessons: NavItem[] = React.useMemo(() => {
    return curriculumLessons.map((l) => ({
      id: l.id,
      title: l.title,
      route: trackParam ? `/app/concepts/${l.id}?track=${trackParam}` : `/app/concepts/${l.id}`,
    }));
  }, [trackParam]);

  // Determine active sequence
  const { prevLesson, nextLesson } = React.useMemo(() => {
    if (!currentLessonId) {
      return { prevLesson: null, nextLesson: null };
    }

    // 1. Check if currentLessonId is a Java sub-concept
    const javaIdx = javaSubConcepts.findIndex((c) => c.id === currentLessonId);
    if (javaIdx !== -1) {
      return {
        prevLesson: javaIdx > 0 ? javaSubConcepts[javaIdx - 1] : null,
        nextLesson: javaIdx < javaSubConcepts.length - 1 ? javaSubConcepts[javaIdx + 1] : null,
      };
    }

    // 2. Check if currentLessonId is an OOP sub-concept
    const oopIdx = oopSubConcepts.findIndex((c) => c.id === currentLessonId);
    if (oopIdx !== -1) {
      return {
        prevLesson: oopIdx > 0 ? oopSubConcepts[oopIdx - 1] : null,
        nextLesson: oopIdx < oopSubConcepts.length - 1 ? oopSubConcepts[oopIdx + 1] : null,
      };
    }

    // 3. Fallback to canonical core curriculum lessons
    const coreIdx = canonicalLessons.findIndex((c) => c.id === currentLessonId);
    if (coreIdx !== -1) {
      return {
        prevLesson: coreIdx > 0 ? canonicalLessons[coreIdx - 1] : null,
        nextLesson: coreIdx < canonicalLessons.length - 1 ? canonicalLessons[coreIdx + 1] : null,
      };
    }

    return { prevLesson: null, nextLesson: null };
  }, [currentLessonId, javaSubConcepts, oopSubConcepts, canonicalLessons]);

  // Handle smooth scroll-to-top on navigation
  const handleNavigate = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainContainer = document.getElementById('main-scroll-container');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Do not render anything if neither prev nor next exists
  if (!prevLesson && !nextLesson) {
    return null;
  }

  return (
    <nav
      aria-label="Previous and Next Lesson Navigation"
      className={`w-full border-t border-[#E5E7EB] pt-8 mt-10 select-none ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 sm:gap-8">
        {/* PREVIOUS LESSON (LEFT-ALIGNED) */}
        {prevLesson ? (
          <Link
            to={prevLesson.route}
            onClick={handleNavigate}
            className="group flex flex-col items-start text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#075CF5] focus-visible:ring-offset-2 rounded-lg p-2 -ml-2 transition-colors flex-1 max-w-full sm:max-w-[45%]"
            aria-label={`Previous lesson: ${prevLesson.title}`}
          >
            {/* Small uppercase label with left arrow icon */}
            <span className="flex items-center space-x-1.5 text-xs font-mono font-medium tracking-wider text-[#64748B] group-hover:text-[#075CF5] transition-colors uppercase">
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2] transition-transform group-hover:-translate-x-1" />
              <span>PREVIOUS</span>
            </span>

            {/* Near-black previous lesson title underneath */}
            <span className="text-sm sm:text-base font-bold text-[#17191D] group-hover:text-[#075CF5] transition-colors mt-1.5 line-clamp-2">
              {prevLesson.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block flex-1 max-w-[45%]" aria-hidden="true" />
        )}

        {/* NEXT LESSON (RIGHT-ALIGNED) */}
        {nextLesson ? (
          <Link
            to={nextLesson.route}
            onClick={handleNavigate}
            className="group flex flex-col items-end text-right focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#075CF5] focus-visible:ring-offset-2 rounded-lg p-2 -mr-2 transition-colors flex-1 max-w-full sm:max-w-[45%] ml-auto"
            aria-label={`Next lesson: ${nextLesson.title}`}
          >
            {/* Small uppercase label with right arrow icon */}
            <span className="flex items-center space-x-1.5 text-xs font-mono font-medium tracking-wider text-[#64748B] group-hover:text-[#075CF5] transition-colors uppercase">
              <span>NEXT</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2] transition-transform group-hover:translate-x-1" />
            </span>

            {/* Near-black next lesson title underneath */}
            <span className="text-sm sm:text-base font-bold text-[#17191D] group-hover:text-[#075CF5] transition-colors mt-1.5 line-clamp-2">
              {nextLesson.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block flex-1 max-w-[45%]" aria-hidden="true" />
        )}
      </div>
    </nav>
  );
};

