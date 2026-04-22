'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for detecting the currently visible section on the page.
 * Uses IntersectionObserver API to track which section is in the viewport.
 * 
 * @param sectionIds - Array of section IDs to observe
 * @returns The ID of the currently active/visible section
 * 
 * @example
 * const activeSection = useScrollSpy(['hero', 'about', 'services', 'contact']);
 */
export const useScrollSpy = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // IntersectionObserver callback to handle section visibility changes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a section becomes visible, update the active section
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // rootMargin adjusts the intersection area:
        // - Top offset (-100px) accounts for fixed header
        // - Bottom offset (-80%) ensures section is considered active when near the top
        rootMargin: '-100px 0px -80% 0px',
        // Threshold of 0 means trigger as soon as any part is visible
        threshold: 0,
      }
    );

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup: disconnect observer when component unmounts or dependencies change
    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};
