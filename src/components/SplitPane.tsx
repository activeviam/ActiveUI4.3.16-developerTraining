/** @jsx jsx */
import React from 'react';
import {ClassNames, jsx} from '@emotion/core';
import SplitPaneBase, {SplitPaneProps} from 'react-split-pane';

import styleConfiguration from '../configurations/style';

const SplitPane: React.FunctionComponent<SplitPaneProps> = (props) => (
  <ClassNames>
    {({css}) => (
      <SplitPaneBase
        // The SplitPane is absolutely positioned by default, hiding the application's left bar.
        style={{position: 'relative'}}
        resizerClassName={css`
          background: ${styleConfiguration.colors.barBackgroundColor};
          z-index: 1;
          box-sizing: border-box;
          background-clip: padding-box;

          &:hover {
            transition: all 0.25s ease;
          }

          &.vertical {
            width: 12px;
            margin: 0 -6px;
            border-left: 5.5px solid transparent;
            border-right: 5.5px solid transparent;
            cursor: col-resize;
          }

          &.disabled {
            display: none;
          }
        `}
        {...props}
      />
    )}
  </ClassNames>
);

export default SplitPane;
