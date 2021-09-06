import React from 'react';
import {
  useActiveUI,
  BookmarkDescription,
  BookmarkId,
} from '@activeviam/activeui-sdk';
import {useDispatch} from 'react-redux';
import {contentServerUrl} from '../env';

interface BookmarkInfo {
  isFetched: boolean;
  bookmark: BookmarkDescription | undefined;
}

const useSavedBookmark = function (bookmarkId?: BookmarkId): BookmarkInfo {
  const activeUI = useActiveUI();
  const dispatch = useDispatch();

  const [bookmark, setBookmark] = React.useState<BookmarkInfo>({
    isFetched: false,
    bookmark: undefined,
  });
  React.useEffect(() => {
    async function fetchBookmark() {
      if (!bookmarkId) {
        setBookmark({isFetched: true, bookmark: undefined});
        return;
      }
      const bookmarkFromContentServer = await activeUI
        .getBookmarksApi(contentServerUrl)
        .getBookmark(bookmarkId);
      setBookmark({isFetched: true, bookmark: bookmarkFromContentServer});
    }
    fetchBookmark();
  }, [activeUI, dispatch, bookmarkId]);
  return bookmark;
};

export default useSavedBookmark;
