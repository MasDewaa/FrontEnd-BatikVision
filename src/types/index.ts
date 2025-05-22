export interface BatikPattern {
  id: number;
  name: string;
  image: string;
  origin: string;
  description: string;
}

export interface ClassificationResult {
  className: string;
  probability: number;
}