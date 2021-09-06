/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import {IconComponent, IconProps} from 'antd/lib/icon';
import Tooltip, {TooltipPlacement} from 'antd/lib/tooltip';
import {useState} from 'react';

interface LeftBarTooltipProps extends IconProps {
  icon:
    | IconComponent<IconProps>
    | React.ComponentClass
    | React.FunctionComponent;
  tooltipPlacement: TooltipPlacement;
  tooltipTitle?: React.ReactNode;
}

const IconButton = ({
  icon: Icon,
  tooltipTitle,
  tooltipPlacement,
  ...props
}: LeftBarTooltipProps) => {
  const [visible, setVisible] = useState(false);
  const iconProps = {
    onClick: () => setVisible(false),
    onMouseEnter: () => setVisible(true),
    onMouseLeave: () => setVisible(false),
    ...props,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      ...props.style,
    },
  };
  return (
    <Tooltip
      visible={visible}
      placement={tooltipPlacement}
      title={tooltipTitle}
    >
      <Icon {...iconProps} />
    </Tooltip>
  );
};

export default IconButton;
