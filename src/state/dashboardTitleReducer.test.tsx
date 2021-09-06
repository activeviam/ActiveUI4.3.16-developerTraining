import {dashboardTitleReducer} from './dashboardTitleReducer';
import {onBookmarkChanged} from './events';

test('holds onto the title after change', () => {
  expect(
    dashboardTitleReducer(undefined, onBookmarkChanged({name: 'test'})),
  ).toBe('test');
});
