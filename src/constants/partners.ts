export interface Partner {
  title: string;
  img: string;
  baseFilter?: string;
  hoverFilter?: string;
  color?: string;
  size?: string;
  scaleClass?: string;
  original?: boolean;
}

export const partners: Partner[] = [
  { 
    title: "CRA-SP", 
    img: "/imgs/partners/crasp.svg", 
    baseFilter: "brightness(0) invert(1) opacity(0.7)", 
    hoverFilter: "brightness(1) opacity(1)",
    color: "#003366", 
    size: "38.5%"
  },
  { 
    title: "ANGRAD", 
    img: "/imgs/partners/angrad.png", 
    baseFilter: "brightness(0) invert(1) opacity(0.7)", 
    hoverFilter: "brightness(1) opacity(1)",
    scaleClass: "scale-[1.2]",
    color: "#005b8f", 
    size: "82.5%", 
    original: true
  },
  { 
    title: "ETHOS", 
    img: "/imgs/partners/ethos.png", 
    baseFilter: "brightness(0) invert(1) opacity(0.7)", 
    hoverFilter:
      'brightness(0) invert(55%) sepia(100%) saturate(3500%) hue-rotate(175deg) ' +
      'brightness(105%) contrast(110%) opacity(1)',
    color: "#00acffff", 
    size: "65.25%"
  },
  { 
    title: "IBGC", 
    img: "/imgs/partners/ibgc.png", 
    baseFilter: "brightness(0) invert(1) opacity(0.7)", 
    hoverFilter:
      'brightness(0) invert(18%) sepia(100%) saturate(3500%) hue-rotate(205deg) ' +
      'brightness(90%) contrast(120%) opacity(1)',
    scaleClass: "scale-[2.0]",
    color: "#0045b7", 
    size: "105%"
  },
  { 
    title: "PRME", 
    img: "/imgs/partners/prme.png", 
    baseFilter: "brightness(0) invert(1) opacity(0.7)", 
    hoverFilter: "brightness(1) opacity(1)",
    scaleClass: "scale-[1.0]",
    color: "#1e314f", 
    size: "55%"
  },
];
