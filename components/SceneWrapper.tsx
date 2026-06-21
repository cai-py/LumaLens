"use client";

import Scene from "./Scene";
import { sampleHouseGeometry } from "../lib/house";

export default function SceneWrapper() {
  return (
    <div className="w-full h-screen">
      <Scene house={sampleHouseGeometry} lightingScenario={"Curb Appeal"} />
    </div>
  );
}
