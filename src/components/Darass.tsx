import React, { useEffect } from "react";
import { init } from "../init";

interface Props {
  projectKey: string;
  darkMode: boolean;
}

const Darass = ({ projectKey, darkMode }: Props) => {
  const isSSR = typeof window === "undefined";

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

  return (
    <div
      id="darass"
      data-project-key={projectKey}
      data-dark-mode={darkMode}
    ></div>
  );
};

export default Darass;
