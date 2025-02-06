"use client";
import mixpanel from "mixpanel-browser";

mixpanel.init('', {
    debug: false,
    track_pageview: true,
    persistence: "localStorage",
  });

const MixPanelInit = () => {
  return null;
};

export default MixPanelInit;
