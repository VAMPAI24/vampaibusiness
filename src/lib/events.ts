import axios from "axios";
import {
  getStorage,
  getBizBasicInfo,
  hashWord,
  isLocalOrStaging,
} from "./utils";
import mixpanel from "mixpanel-browser";
interface convData {
  eventName: string;
  email?: string;
  fullName?: string;
  customData?: Record<string, string | number>;
}

export const sendConversionEvent = async (data: convData) => {
  const otherUserInfo = getBizBasicInfo();

  //   console.log(otherUserInfo);
  const basicInfo = getStorage<{
    email: string;
    full_name: string;
    last_name: string;
  }>("userProfile");
  const eventData = {
    eventName: data.eventName,
    userData: {
      em: hashWord(basicInfo?.email ?? ""),
        ph: hashWord(basicInfo?.full_name ?? ""),
      fn: hashWord(basicInfo?.full_name ?? ""),
      ln: hashWord(basicInfo?.last_name ?? ""),
      client_ip_address: otherUserInfo?.ipAddress ?? "",
      country: hashWord(otherUserInfo?.location ?? ""),
      //   language: hashWord(otherUserInfo?.language ?? ""),
      client_user_agent: otherUserInfo?.device ?? "",
    },
    customData: data?.customData,
  };

  try {
    const response = await axios.post("/api/meta-events", eventData);

    if (!response.status) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending event:", error);
  }
};

interface EventData {
  eventName: string;
  customData?: Record<string, string | number>;
}
export const sendEvents = (data: EventData) => {
  const isProd = isLocalOrStaging();
  if (!isProd) {
    mixpanel.track(data.eventName, data.customData);
    sendConversionEvent(data);
  }
};
