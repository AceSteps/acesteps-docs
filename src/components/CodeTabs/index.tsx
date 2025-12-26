import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

interface CodeTabsProps {
  tabs: Array<{
    label: string;
    language: string;
    code: string;
  }>;
}

export default function CodeTabs({ tabs }: CodeTabsProps): JSX.Element {
  return (
    <Tabs>
      {tabs.map((tab, idx) => (
        <TabItem key={idx} value={tab.label.toLowerCase().replace(/\s+/g, '-')} label={tab.label}>
          <CodeBlock language={tab.language}>{tab.code}</CodeBlock>
        </TabItem>
      ))}
    </Tabs>
  );
}
