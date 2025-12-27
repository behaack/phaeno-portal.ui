export default function HeroSection() {
  const bannerUrl = 'https://7579-52288.el-alt.com/public/home-page-banner.webp';
  return (
    <section
      className="w-dvw h-dvh bg-cover bg-no-repeat overflow-hidden bg-center flex flex-col justify-center"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      <div className="absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pb-20 px-4 max-w-[90vw] w-full">
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl break-words w-full">
          Phaeno PSeq Portal
        </h1>
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl break-words">
          Exclusively for Phaeno Customers
        </h2>
      </div>
    </section>
  );
}
