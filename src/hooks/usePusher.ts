import { useEffect } from "react";
import pusher from "../services/pusher";

interface UsePusherProps {
  channelName: string;
  eventName: string;
  callback: (data: any) => void;
}

export const usePusher = ({
  channelName,
  eventName,
  callback,
}: UsePusherProps) => {
  useEffect(() => {
    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, callback);

    return () => {
      channel.unbind(eventName);
      pusher.unsubscribe(channelName);
    };
  }, [channelName, eventName, callback]);
};
