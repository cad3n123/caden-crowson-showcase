import { useState, useEffect } from 'react';

function App() {
  const [currentUrl, setCurrentUrl] = useState('./');
  const [isActive, setIsActive] = useState(false);
  const [insertingTape, setInsertingTape] = useState(null);
  const [animationLock, setAnimationLock] = useState(false);

  const projects = [
    { id: 'p1', url: './infinite-matter', title: 'Infinite Matter' },
    { id: 'p2', url: './infinite-factory', title: 'Infinite Factory' },
    { id: 'p3', url: './', title: 'This Website' }, 
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

    // UPDATED TIMING: Faster sequence (0.8s total)
    setTimeout(() => {
      // Switch URL halfway through (0.4s)
      setTimeout(() => {
          setCurrentUrl(project.url);
      }, 400); 

      // End animation (0.8s)
      setTimeout(() => {
        setInsertingTape(null); 
        setIsActive(true); 
        setAnimationLock(false); 
      }, 800); 

    }, 50); 
  };


  return (
    <div className="min-h-screen bg-theme-dark-2 font-mono text-theme-light overflow-hidden flex flex-col">
      <nav className="h-12 w-full flex items-center px-4 border-b border-theme-dark-3 bg-theme-dark-2 z-10 justify-between">
        <p className="m-0 text-base font-bold">Caden Crowson</p>
      </nav>

      <div className="flex-grow flex flex-col justify-evenly items-center py-4">
        
        {/* --- TV UNIT --- */}
        <div className="relative w-full max-w-3xl flex flex-col items-center">
          
          {/* Chassis */}
          <div className="bg-tv-plastic border-4 border-tv-bezel rounded-3xl p-4 shadow-[0_10px_20px_rgba(0,0,0,0.6)] w-[90vw] md:w-full max-w-2xl aspect-[4/3] relative flex z-20">
            
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
                
                <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 w-full h-full z-20 group">
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded text-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Launch Site ↗
                  </span>
                </a>
               
                <div className="crt-overlay absolute top-0 left-0 w-full h-full z-10 opacity-25 pointer-events-none animate-scan-lines"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] pointer-events-none z-30"></div>
              </div>
            </div>

            {/* Controls */}
            <div className="w-16 md:w-24 ml-4 flex flex-col justify-between py-4 bg-tv-bezel rounded-xl border-2 border-theme-dark-1">
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

           {/* VCR Slot - UPDATED: Taller and Labeled */}
          <div className={`relative w-2/3 max-w-md -mt-4 pt-6 h-24 bg-tv-plastic border-x-4 border-b-4 border-tv-bezel rounded-b-xl flex flex-col items-center justify-center z-10 ${insertingTape ? 'inserting' : ''}`}>
             
             {/* Animated Tape */}
             {insertingTape && (
                 <div className="animated-vhs-tape animate-insert-tape">
                     {insertingTape.title}
                 </div>
             )}

             {/* Slot Opening - Taller (h-16) */}
             <div className="vhs-slot-opening w-4/5 h-16 relative rounded-sm mb-2">
                 <div className="vhs-slot-flap"></div>
             </div>
          </div>

        </div>


        {/* --- TAPE RACK WITH HEADERS --- */}
        <div className="w-full flex flex-col items-center mt-6">
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-theme-light animate-blink">MY CREATIONS</h3>
                <p className="text-xs text-theme-dark-4 tracking-wider mt-1">CLICK A TAPE TO INSERT</p>
            </div>

            <div className="flex justify-center items-center gap-4 md:gap-8 w-full px-4 overflow-x-auto pb-4 no-scrollbar">
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
                    h-40 md:h-48 p-3 text-sm md:text-lg font-bold rounded-lg cursor-pointer overflow-hidden whitespace-nowrap
                    transition-all duration-300 ease-out border-2
                    ${isCurrentlyInserting ? 'opacity-0 scale-90' : 'opacity-100'}
                    ${isSelected 
                    ? 'bg-theme-dark-3 text-theme-dark-1 border-theme-dark-4 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] translate-y-2' 
                    : 'bg-theme-dark-1 text-theme-dark-4 border-theme-dark-2 hover:-translate-y-4 hover:bg-theme-dark-2 hover:text-theme-light hover:shadow-[0_10px_15px_rgba(0,0,0,0.5)] hover:border-theme-light'}
                `}
                >
                {/* Tape label appearance */}
                <div className={`w-full h-full border-2 ${isSelected ? 'border-theme-dark-4/30' : 'border-theme-dark-3/50 group-hover:border-theme-light'} rounded flex items-center justify-center`}>
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