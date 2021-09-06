/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import List from 'antd/lib/list';

type ItemProps = {
  name: string;
  version: string;
};

const Item = ({name, version}: ItemProps) => (
  <div
    css={css`
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
    `}
  >
    <span>{name}</span>
    <span>{version}</span>
  </div>
);

type VersionsListProps = {
  versions: Array<ItemProps>;
};

const VersionsList = ({versions}: VersionsListProps) => (
  <List
    style={{
      marginBottom: 20,
      marginTop: 20,
    }}
    dataSource={versions}
    renderItem={Item}
  />
);

export default VersionsList;
