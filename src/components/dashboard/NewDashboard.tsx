import React, {useEffect} from 'react';
import Dashboard from './Dashboard';
import {
  ContainerFullValue,
  useDisplayMode,
  DisplayMode,
} from '@activeviam/activeui-sdk';
import {useDispatch} from 'react-redux';
import {onCreatedDashboard} from '../../state/events';

const emptyDashboardBookmark: ContainerFullValue = {
  name: '',
  type: 'container',
  writable: true,
  value: {
    showTitleBar: false,
    body: {
      pages: [
        {
          layout: {ck: '0'},
          content: [],
          name: 'Page 1',
        },
      ],
    },
    containerKey: 'dashboard',
  },
};

const NewDashboard = function () {
  const {setDisplayMode} = useDisplayMode();
  const dispatch = useDispatch();

  useEffect(() => {
    setDisplayMode(DisplayMode.EDIT).then(() => dispatch(onCreatedDashboard()));
    // setDisplayMode is not a stable reference because it depends on the current display mode.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <Dashboard bookmark={emptyDashboardBookmark} />;
};

export default NewDashboard;
