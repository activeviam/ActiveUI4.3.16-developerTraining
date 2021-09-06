/** @jsx jsx */
import React from 'react';
import {jsx} from '@emotion/core';
import Button from 'antd/lib/button';
import filesaver from 'file-saver';
import JSZip from 'jszip';
import bowser from 'bowser';

const isWindows = bowser.windows || bowser.windowsphone;

const availableReportKeys = [
  'environment',
  'stat',
  'console',
  'app-state',
  'screenshot',
];

type ReportGeneratorProps = {
  getReports: any;
  translate: any;
};

export default function ReportGenerator(props: ReportGeneratorProps) {
  const [generating, setGenerating] = React.useState(false);
  const {translate} = props;
  async function onSubmit() {
    setGenerating(true);
    const reports = await props.getReports(availableReportKeys);
    const zip = new JSZip();
    reports.forEach((report: {name: string; content: any}) => {
      zip.file(report.name, report.content);
    });
    const blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      platform: isWindows ? 'DOS' : 'UNIX',
    });
    filesaver.saveAs(
      blob,
      `ActiveUI_Report_${new Date()
        .toLocaleString()
        .replace(/[^a-z0-9]/gi, '_')}.zip`,
    );
    setGenerating(false);
  }
  return (
    <Button onClick={onSubmit} loading={generating}>
      {translate('popup.about.report')}
    </Button>
  );
}
