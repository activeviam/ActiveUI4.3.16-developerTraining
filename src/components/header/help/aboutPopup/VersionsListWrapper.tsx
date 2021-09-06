/** @jsx jsx */
import React from 'react';
import {jsx} from '@emotion/core';
import {useActiveUI} from '@activeviam/activeui-sdk';
import VersionsList from './VersionsList';
import {activePivotServerUrl} from '../../../../env';

export default function VersionsListWrapper() {
  const activeUI = useActiveUI();
  const {about} = activeUI;
  const [activePivotVersion, setActivePivotVersion] = React.useState('');
  React.useEffect(() => {
    async function getVersion() {
      const activePivotServer = activeUI.queries.serversPool.getActivePivotServer(
        activePivotServerUrl,
      );
      const serverVersionResponse = await activePivotServer.getVersions();
      const version = serverVersionResponse.serverVersion;
      setActivePivotVersion(version);
    }
    getVersion();
  }, [activeUI]);
  const versions = [
    {name: 'ActiveUI', version: about.packageVersion},
    {name: 'ActivePivot', version: activePivotVersion},
  ];
  return <VersionsList versions={versions} />;
}
