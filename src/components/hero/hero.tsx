import HeroAnimation from './hero-animation'

export function Hero() {
  return (
    <section className="relative h-dvh overflow-hidden">
      <div className="relative z-10 flex h-dvh w-full flex-col justify-center gap-6 md:flex-row md:items-stretch md:justify-start md:gap-8">
        <div className="relative order-2 flex min-h-0 flex-[4_1_0%] items-center justify-center pr-8 md:order-2 md:justify-end md:pr-12 lg:pr-16">
          <HeroAnimation className="h-[320px] w-[320px] max-w-full md:h-[360px] md:w-[360px]" />
        </div>
        <div className="relative order-1 flex min-h-0 flex-[8_1_0%] items-center justify-center pt-0 md:order-1 md:justify-start md:pt-0">
          <div className="w-full px-8 text-left md:mr-auto md:ml-0 md:w-auto md:px-12 lg:px-16">
            <div className="py-6 md:p-0">
              <p className="text-3xl font-semibold tracking-tight md:text-4xl">
                hi, i'm
              </p>
              <p className="text-5xl leading-none font-bold md:text-6xl lg:text-7xl">
                Bruno Tatsuya
              </p>
              <p className="text-2xl font-semibold tracking-tight md:text-3xl">
                Software Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
