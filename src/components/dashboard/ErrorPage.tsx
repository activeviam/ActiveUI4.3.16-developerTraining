import React from 'react';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';
import {Link} from 'react-router-dom';
import {useActiveUI} from '@activeviam/activeui-sdk';

const ErrorPage = function ({reason}: {reason?: string}) {
  const activeUI = useActiveUI();
  const translator = activeUI.i18n.getTranslator();
  const prefix = translator.format('project.invalidUrl.prefix');
  const suffix = translator.format('project.invalidUrl.suffix');
  return (
    <Result
      status="info"
      title={prefix}
      subTitle={`${reason || ''} ${suffix}`}
      extra={
        <Link to={'/'}>
          <Button type={'primary'}>{`${translator.format(
            'project.invalidUrl.goToHomePage',
          )}`}</Button>
        </Link>
      }
    />
  );
};

export default ErrorPage;
