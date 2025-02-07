"use client";
import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIX_PANEL ?? "46d5ffddb3b632bfef810c0d57fcc21a", {
    debug: false,
    track_pageview: true,
    persistence: "localStorage",
  });

const MixPanelInit = () => {
  return null;
};

export default MixPanelInit;
