const Hero = () => {
  return (
    <div className="w-full -top-16 relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 40%, #475569 100%)",
        }}
      />
      <div className="flex flex-col gap-y-4 items-center justify-center h-screen z-10 relative px-6 ">
        <h1 className="  font-bricolage   drop-shadow-2xl text-3xl md:text-4xl lg:text-6xl font-semibold max-w-5xl mx-auto text-center  relative z-20 py-6 bg-clip-text text-transparent bg-linear-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800">
          Convert Your Resume to a Professional Portfolio
        </h1>
        <h4 className="font-manrope text-black text-center px-8 mb-8">
          Turn Your Resume Into a Stunning Portfolio Website
        </h4>
        <div className="flex items-center justify-center gap-x-4 ">
          <button className="bg-radial-[at_25%_25%] from-white to-zinc-900 to-25% h-10 font-manrope text-white px-6 py-2 text-sm rounded-lg font-bold hover:bg-gray-800 transition-colors text-center cursor-pointer">
            Get Started
          </button>
          <button className="bg-gray-200 text-black px-6 py-2 h-10 font-manrope rounded-lg font-light text-sm hover:bg-gray-400 transition-colors text-center cursor-pointer">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
