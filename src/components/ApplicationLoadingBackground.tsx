/** @jsx jsx */
import {css, jsx} from '@emotion/core';

const ApplicationLoadingBackground = () => (
  <div
    css={css`
      background-color: #00aeef;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}
  >
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100%"
      height="80%"
      viewBox="0 0 1920 1080"
    >
      <polygon
        fill="#66CEF5"
        points="959.987,1.208 959.987,270.784 1193.475,405.594 1194.156,405.977 959.987,540.275 959.987,809.937 1660.493,405.594 959.987,1.208 "
      />
      <polygon
        fill="#0083B3"
        points="259.396,675.127 959.987,1079.641 959.987,809.937 725.86,675.511 726.457,675.127 959.987,540.275 959.987,270.614 "
      />
    </svg>
    <div
      css={css`
        color: #fff;
        font-size: 16px;
        text-align: center;
      `}
    >
      Loading...
    </div>
  </div>
);

export default ApplicationLoadingBackground;
