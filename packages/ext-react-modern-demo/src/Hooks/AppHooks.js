import React, { useState, useEffect } from "react";
import { Panel, Button } from '@sencha/ext-modern';

export default function AppHooks() {
  const [panelTitle, setPanelTitle] = useState("original Title");
  useEffect(() => {
    console.log("Using React Hook");
  })
  function handleTap() {
    return setPanelTitle("Thanks, been clicked!");
  }
  return (
    <Panel title={panelTitle}>
      <Button text='Click to change the Panel title' onTap={handleTap}></Button>
    </Panel>
  );
}
