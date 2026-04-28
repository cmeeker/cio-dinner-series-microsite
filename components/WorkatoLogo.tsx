interface WorkatoLogoProps {
  className?: string;
}

export default function WorkatoLogo({ className }: WorkatoLogoProps) {
  return (
    <svg
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <polygon
        points="17,2 31,9.5 31,24.5 17,32 3,24.5 3,9.5"
        fill="#67EADD"
      />
      <polygon
        points="17,7 27,12.5 27,23.5 17,29 7,23.5 7,12.5"
        fill="#111010"
      />
      <circle cx="17" cy="18" r="3.5" fill="#67EADD" />
      <circle cx="11" cy="14" r="2" fill="#3EA2A8" />
      <circle cx="23" cy="14" r="2" fill="#3EA2A8" />
    </svg>
  );
}
