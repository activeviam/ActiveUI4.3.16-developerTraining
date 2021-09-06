import React from 'react';
import {useActiveUI} from '@activeviam/activeui-sdk';

import ReportGenerator from './ReportGenerator';

export default function ReportGeneratorWrapper() {
  const activeUI = useActiveUI();
  const translator = activeUI.i18n.getTranslator();
  const translate = translator.format.bind(translator);
  const {getReports} = activeUI;
  return <ReportGenerator getReports={getReports} translate={translate} />;
}
