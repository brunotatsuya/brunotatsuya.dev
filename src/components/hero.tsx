import PixelBlast from './ui/pixel-blast'

export function Hero() {
  return (
    <section className="relative h-dvh overflow-hidden">
      <div className="flex h-dvh w-full flex-col gap-4 md:flex-row md:items-stretch md:gap-8">
        <div className="relative order-2 flex-[8_1_0%] min-h-0 md:order-2 md:flex-[8_1_0%]">
          <div className="relative h-full w-full min-h-0">
            <PixelBlast
              variant="square"
              pixelSize={3}
              color="#417ec0"
              patternScale={2}
              patternDensity={1.45}
              pixelSizeJitter={1.25}
              enableRipples
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              liquid={false}
              liquidStrength={0.12}
              liquidRadius={1.2}
              liquidWobbleSpeed={5}
              speed={1.65}
              edgeFade={0.25}
              transparent
            />
          </div>
        </div>
        <div className="relative order-1 flex flex-[4_1_0%] items-center min-h-0 pt-16 md:order-1 md:flex-[4_1_0%] md:pt-0">
          <div className="w-full px-6 text-left md:ml-12 md:mr-auto md:w-auto md:px-0 md:pl-12 lg:pl-16">
            <div className="py-6 md:p-0">
              <p className="text-3xl font-semibold tracking-tight md:text-4xl">
                hi, i'm
              </p>
              <p className="text-primary text-5xl leading-none font-bold md:text-6xl lg:text-7xl">
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
