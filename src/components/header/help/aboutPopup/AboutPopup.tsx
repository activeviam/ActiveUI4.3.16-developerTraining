/** @jsx jsx */
import {jsx} from '@emotion/core';

import ReportGeneratorWrapper from './ReportGeneratorWrapper';
import VersionsListWrapper from './VersionsListWrapper';

const AboutPopup = () => (
  <div>
    <VersionsListWrapper />
    <ReportGeneratorWrapper />
  </div>
);

export default AboutPopup;
