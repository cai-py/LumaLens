"use client";

import Scene from "./Scene";
import { sampleHouseGeometry } from "../lib/house";

export default function SceneWrapper() {
  return (
    <div className="w-full h-[520px] sm:h-[420px] lg:h-[560px]">
      <Scene house={sampleHouseGeometry} lightingScenario={"Curb Appeal"} />
    </div>
  );
}
