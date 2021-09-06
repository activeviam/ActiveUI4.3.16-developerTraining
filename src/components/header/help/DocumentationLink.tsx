/** @jsx jsx */
import {jsx} from '@emotion/core';

interface DocumentationLinkProps {
  version: string;
  page: string;
  children: React.ReactNode;
}

export const DocumentationLink = (props: DocumentationLinkProps) => {
  return (
    <a
      href={`https://activeviam.com/activeui/documentation/${props.version}/${props.page}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
};
