import {createReducer} from '@reduxjs/toolkit';
import {onBookmarkChanged} from './events';

export type DashboardTitleState = string;

export const dashboardTitleReducer = createReducer<DashboardTitleState>(
  '',
  (builder) =>
    builder.addCase(onBookmarkChanged, (state, event) => event.payload.name),
);

export const getTitle = (state: {title: DashboardTitleState}) => state.title;
