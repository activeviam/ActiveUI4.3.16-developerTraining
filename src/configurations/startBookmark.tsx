import {startPluginKey} from '../components/Start';

export const startPageBookmark = (name: string): {} => ({
  layout: {
    ck: '1',
  },
  content: [
    {
      key: '1',
      bookmark: {
        name: '',
        type: 'container',
        writable: 'false',
        value: {
          showTitleBar: false,
          containerKey: startPluginKey,
          actions: ['remove-dock'],
        },
      },
    },
  ],
  name,
});

export const startBookmark = (startPageName: string) => ({
  name: '',
  type: 'container',
  value: {
    showTitleBar: false,
    body: {
      pages: [startPageBookmark(startPageName)],
    },
    containerKey: 'dashboard',
  },
  writable: true,
});
