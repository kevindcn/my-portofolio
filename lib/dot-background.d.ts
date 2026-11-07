export interface DotBackgroundOptions {
  mode?: 'float' | 'net' | 'grid';
  color?: string;
  maxParticles?: number;
  density?: number;
  gap?: number;
  radius?: number;
  power?: number;
  stiffness?: number;
  damping?: number;
  [key: string]: any;
}

export interface DotBackgroundInstance {
  setMode(mode: 'float' | 'net' | 'grid'): void;
  destroy(): void;
}

export function createDotBackground(
  hero: HTMLElement,
  options?: DotBackgroundOptions
): DotBackgroundInstance;
