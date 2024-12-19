export default function PointPlus({ className }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="5" fill="#FFD100" />
      <g filter="url(#filter0_d_4_376)">
        <mask
          id="path-2-outside-1_4_376"
          maskUnits="userSpaceOnUse"
          x="6"
          y="6"
          width="11"
          height="11"
          fill="black"
        >
          <rect fill="white" x="6" y="6" width="11" height="11" />
          <path d="M10.6875 10.75V7.625H12.25V10.75H15.375V12.3125H12.25V15.4375H10.6875V12.3125H7.5625V10.75H10.6875Z" />
        </mask>
        <path
          d="M10.6875 10.75V7.625H12.25V10.75H15.375V12.3125H12.25V15.4375H10.6875V12.3125H7.5625V10.75H10.6875Z"
          fill="#FBFBFB"
        />
        <path
          d="M10.6875 10.75V11.75C11.2398 11.75 11.6875 11.3023 11.6875 10.75H10.6875ZM10.6875 7.625V6.625C10.1352 6.625 9.6875 7.07272 9.6875 7.625H10.6875ZM12.25 7.625H13.25C13.25 7.07272 12.8023 6.625 12.25 6.625V7.625ZM12.25 10.75H11.25C11.25 11.3023 11.6977 11.75 12.25 11.75V10.75ZM15.375 10.75H16.375C16.375 10.1977 15.9273 9.75 15.375 9.75V10.75ZM15.375 12.3125V13.3125C15.9273 13.3125 16.375 12.8648 16.375 12.3125H15.375ZM12.25 12.3125V11.3125C11.6977 11.3125 11.25 11.7602 11.25 12.3125H12.25ZM12.25 15.4375V16.4375C12.8023 16.4375 13.25 15.9898 13.25 15.4375H12.25ZM10.6875 15.4375H9.6875C9.6875 15.9898 10.1352 16.4375 10.6875 16.4375V15.4375ZM10.6875 12.3125H11.6875C11.6875 11.7602 11.2398 11.3125 10.6875 11.3125V12.3125ZM7.5625 12.3125H6.5625C6.5625 12.8648 7.01022 13.3125 7.5625 13.3125V12.3125ZM7.5625 10.75V9.75C7.01022 9.75 6.5625 10.1977 6.5625 10.75H7.5625ZM11.6875 10.75V7.625H9.6875V10.75H11.6875ZM10.6875 8.625H12.25V6.625H10.6875V8.625ZM11.25 7.625V10.75H13.25V7.625H11.25ZM12.25 11.75H15.375V9.75H12.25V11.75ZM14.375 10.75V12.3125H16.375V10.75H14.375ZM15.375 11.3125H12.25V13.3125H15.375V11.3125ZM11.25 12.3125V15.4375H13.25V12.3125H11.25ZM12.25 14.4375H10.6875V16.4375H12.25V14.4375ZM11.6875 15.4375V12.3125H9.6875V15.4375H11.6875ZM10.6875 11.3125H7.5625V13.3125H10.6875V11.3125ZM8.5625 12.3125V10.75H6.5625V12.3125H8.5625ZM7.5625 11.75H10.6875V9.75H7.5625V11.75Z"
          fill="#221E22"
          mask="url(#path-2-outside-1_4_376)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_4_376"
          x="7.5625"
          y="7.625"
          width="9.8125"
          height="9.8125"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.133333 0 0 0 0 0.117647 0 0 0 0 0.133333 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_376"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_376"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
