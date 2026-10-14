'use client';

import dynamic from 'next/dynamic';

// next/dynamic only splits code when called from a Client Component, so the carousel (and the
// animation library it uses) is downloaded only on pages that actually render it.
const LazyTestimonialCarousel = dynamic(() => import('./TestimonialCarousel'));

export default LazyTestimonialCarousel;
