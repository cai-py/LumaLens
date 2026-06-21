export type RoofShape = "gabled" | "hipped" | "flat";

export interface HouseFeatures {
  garage: boolean;
  porch: boolean;
  columns: number;
  chimney: boolean;
}

export interface HouseGeometry {
  stories: number;
  facadeWidth: number;
  roofShape: RoofShape;
  materials: string[];
  features: HouseFeatures;
}

export type LightingScenario =
  | "Curb Appeal"
  | "Security"
  | "Dramatic"
  | "Minimal";

export const LIGHTING_SCENARIOS: LightingScenario[] = [
  "Curb Appeal",
  "Security",
  "Dramatic",
  "Minimal",
];

export const MAX_PHOTOS = 5;

export const sampleHouseGeometry: HouseGeometry = {
  stories: 2,
  facadeWidth: 5,
  roofShape: "gabled",
  materials: ["brick", "wood siding", "shingle roof"],
  features: {
    garage: true,
    porch: true,
    columns: 2,
    chimney: true,
  },
};
