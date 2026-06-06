import { useState, useEffect } from 'react';

function App() {
  const [currentUrl, setCurrentUrl] = useState('./');
  const [isActive, setIsActive] = useState(false);
  const [insertingTape, setInsertingTape] = useState(null);
  const [animationLock, setAnimationLock] = useState(false);

  const projects = [
    { id: 'p1', url: './infinite-matter', title: 'Infinite Matter' },
    { id: 'p2', url: './infinite-factory', title: 'Infinite Factory' },
    { id: 'p3', url: './sand-timer', title: 'Sand Timer' },
    { id: 'p4', url: './', title: 'This Website' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleTapeClick = (project) => {
    if (animationLock || project.url === currentUrl) return;

    setAnimationLock(true);
    setIsActive(false);
    setInsertingTape(project);

    setTimeout(() => {
      setTimeout(() => {
          setCurrentUrl(project.url);
      }, 400);

      setTimeout(() => {
        setInsertingTape(null);
        setIsActive(true);
        setAnimationLock(false);
      }, 800);

    }, 50);
  };

  // The "Launch Site" link should navigate same-tab for external projects,
  // but for "This Website" (./home) it just stays put.
  const launchHref = currentUrl === './' ? '#' : currentUrl;
  const isThisSite = currentUrl === './';

  return (
    <div className="min-h-screen bg-theme-dark-2 font-mono text-theme-light overflow-x-hidden flex flex-col">
      <nav className="h-12 w-full flex items-center px-4 border-b border-theme-dark-3 bg-theme-dark-2 z-10 justify-between">
        <p className="m-0 text-base font-bold">Caden Crowson</p>
        <div className="flex items-center gap-4 text-xs text-theme-dark-4">
          <a href="/about.html" className="hover:text-theme-light">About</a>
          <a href="/privacy.html" className="hover:text-theme-light">Privacy</a>
          <a href="/contact.html" className="hover:text-theme-light">Contact</a>
        </div>
      </nav>

      <div className="flex-grow flex flex-col justify-evenly items-center py-6 pt-12">

        {/* --- TV UNIT --- */}
        <div className="relative w-full max-w-5xl flex flex-col items-center">

          {/* Chassis - made larger */}
          <div className="bg-tv-plastic border-4 border-tv-bezel rounded-3xl p-5 shadow-[0_10px_20px_rgba(0,0,0,0.6)] w-[95vw] md:w-full max-w-4xl aspect-[4/3] relative flex z-20">

            {/* Screen */}
            <div className="flex-grow relative h-full">
              <div
                className={`
                  relative border-[6px] border-theme-dark-1 rounded-[2rem]
                  h-full w-full overflow-hidden bg-black
                  transition-all duration-500 ease-in-out
                  ${isActive ? 'brightness-110' : 'brightness-[0.3]'}
                `}
                id="video-content"
              >
                <iframe
                  src={currentUrl}
                  scrolling="no"
                  className={`w-full h-full border-none blur-[0.6px] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  title="Project Showcase"
                />

                {!isThisSite && (
                  <a
                    href={launchHref}
                    className="absolute top-0 left-0 w-full h-full z-20 group"
                  >
                    <span className="absolute bottom-3 right-3 bg-black/80 text-white px-4 py-2 rounded text-lg md:text-xl font-bold shadow-lg pointer-events-none border border-white/20">
                      Launch Site ↗
                    </span>
                  </a>
                )}

                <div className="crt-overlay absolute top-0 left-0 w-full h-full z-10 opacity-25 pointer-events-none animate-scan-lines"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] pointer-events-none z-30"></div>
              </div>
            </div>

            {/* Controls */}
            <div className="w-16 md:w-28 ml-4 flex flex-col justify-between py-4 bg-tv-bezel rounded-xl border-2 border-theme-dark-1">
                <div className="flex flex-col gap-2 items-center">
                    <div className="w-8 h-8 rounded-full bg-theme-dark-3 border-2 border-theme-dark-1 shadow-inner flex items-center justify-center text-xs">CH</div>
                     <div className="w-10 h-10 rounded bg-theme-dark-1 border border-theme-dark-3 shadow-inner flex items-center justify-center font-bold text-green-500">
                        {projects.findIndex(p => p.url === currentUrl) + 1}
                     </div>
                </div>
                <div className="h-32 w-full speaker-grille border-y border-theme-dark-1 mx-auto opacity-70"></div>
                <div className="flex flex-col items-center gap-1">
                    <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${isActive ? 'bg-red-600 shadow-[0_0_8px_red]' : 'bg-red-900'}`}></div>
                    <span className="text-xs text-theme-dark-4">POWER</span>
                </div>
            </div>
          </div>

           {/* VCR Slot */}
          <div className={`relative w-2/3 max-w-md -mt-4 pt-6 h-24 bg-tv-plastic border-x-4 border-b-4 border-tv-bezel rounded-b-xl flex flex-col items-center justify-center z-10 ${insertingTape ? 'inserting' : ''}`}>

             {insertingTape && (
                 <div className="animated-vhs-tape animate-insert-tape">
                     {insertingTape.title}
                 </div>
             )}

             <div className="vhs-slot-opening w-4/5 h-16 relative rounded-sm mb-2">
                 <div className="vhs-slot-flap"></div>
             </div>
          </div>

        </div>


        {/* --- TAPE RACK --- */}
        <div className="w-full flex flex-col items-center mt-10 pt-6">
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-theme-light animate-blink">MY CREATIONS</h3>
                <p className="text-xs text-theme-dark-4 tracking-wider mt-1">CLICK A TAPE TO INSERT</p>
            </div>

            <div className="flex justify-center items-center gap-4 md:gap-8 w-full px-4 pt-8 pb-4 overflow-x-auto no-scrollbar">
            {projects.map((project) => {
                const isSelected = currentUrl === project.url;
                const isCurrentlyInserting = insertingTape && insertingTape.id === project.id;

                return (
                <button
                key={project.id}
                onClick={() => handleTapeClick(project)}
                disabled={animationLock}
                title="Click to Insert Tape"
                className={`
                    group relative
                    writing-sideways
                    h-56 md:h-64 p-3 text-sm md:text-lg font-bold rounded-lg cursor-pointer overflow-hidden whitespace-nowrap
                    transition-all duration-300 ease-out border-2
                    ${isCurrentlyInserting ? 'opacity-0 scale-90' : 'opacity-100'}
                    ${isSelected
                    ? 'bg-theme-dark-3 text-theme-dark-1 border-theme-dark-4 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] translate-y-2'
                    : 'bg-theme-dark-1 text-theme-dark-4 border-theme-dark-2 hover:-translate-y-4 hover:bg-theme-dark-2 hover:text-theme-light hover:shadow-[0_10px_15px_rgba(0,0,0,0.5)] hover:border-theme-light'}
                `}
                >
                <div className="w-full h-full flex items-center justify-center">
                    {project.title}
                </div>
                </button>
            )})}
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
