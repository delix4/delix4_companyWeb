/** Reading-progress bar driven by a CSS scroll timeline (see `.scroll-progress` in globals.css). */
export default function ScrollProgress() {
  return (
    <div
      aria-hidden
      className="scroll-progress fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-[100] pointer-events-none"
    />
  );
}
