import ParticleDrift from "./particle-drift";

/**
 * Standalone showcase for the <ParticleDrift /> background.
 *
 * Render it anywhere inside a sized container, for example:
 *
 *    <div className="relative h-[650px] w-full overflow-hidden rounded-3xl border hairline">
 *      <ParticleDriftDemo />
 *    </div>
 */
export default function ParticleDriftDemo() {
  return (
    <div className="h-full w-full overflow-hidden rounded-3xl">
      <ParticleDrift className="h-full w-full" />
    </div>
  );
}