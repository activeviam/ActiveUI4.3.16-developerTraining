import React from 'react';
import Spin from 'antd/lib/spin';
import {useActiveUI} from '@activeviam/activeui-sdk';

export default function DashboardLoadingBackground() {
  const {i18n} = useActiveUI();
  return (
    <Spin tip={i18n.getTranslator().format('general.loading')} size={'large'} />
  );
}
