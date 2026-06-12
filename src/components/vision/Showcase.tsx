import { FadeIn } from './FadeIn';
import { AnimatedMockup } from './AnimatedMockup';
import { SearchMockup } from './SearchMockup';

export default function Showcase() {
  return (
    <div id="product" className="scroll-mt-24 w-full bg-zinc-950 overflow-hidden rounded-[2.5rem] my-12 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 01 */}
        <div className="mb-32">
          <FadeIn>
            <div className="mb-12 max-w-3xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
                Gather all of your data in one place
              </h2>
            </div>
            
            <div className="w-full flex justify-center">
              <div className="w-full max-w-5xl rounded-[2.5rem] bg-[#1d1d1f] p-4 shadow-2xl relative overflow-hidden">
                  <AnimatedMockup />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Section 02 */}
        <div>
          <FadeIn>
            <div className="mb-12 max-w-3xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
                Ask anything across your team and project memory
              </h2>
            </div>
            
            <div className="w-full flex justify-center">
              <div className="w-full max-w-5xl rounded-[2.5rem] bg-[#1d1d1f] p-4 shadow-2xl relative overflow-hidden">
                  <SearchMockup />
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}
