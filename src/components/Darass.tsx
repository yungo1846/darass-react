import React, { useEffect, useRef } from "react";
import { init } from "../init";

interface Props {
  projectKey: string;
}

const Darass = ({ projectKey }: Props) => {
  const isSSR = typeof window === "undefined";
  const eventRef = useRef();

  useEffect(() => {
    if (isSSR) return;
    const onMessageForRequestPort = init();

    if (!onMessageForRequestPort) return;
    window.addEventListener("message", onMessageForRequestPort);

    return () => {
      document.querySelector("#darass-reply-comment-area")?.remove();
      document.querySelector("#darass-reply-comment-modal")?.remove();
      window.removeEventListener("message", onMessageForRequestPort);
    };
  }, [isSSR]);

  if (isSSR) {
    return null;
  }

  return <div id="darass" data-projectkey={projectKey}></div>;
};

export default Darass;
