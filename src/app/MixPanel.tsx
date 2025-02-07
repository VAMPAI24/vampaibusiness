"use client";
import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIX_PANEL ?? "", {
    debug: false,
    track_pageview: true,
    persistence: "localStorage",
  });

const MixPanelInit = () => {
  return null;
};

export default MixPanelInit;
