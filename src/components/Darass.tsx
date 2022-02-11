import React, { useEffect } from "react";
import { init } from "../init";

interface Props {
  projectKey: string;
  darkMode?: boolean;
  primaryColor?: string;
  isShowSortOption?: boolean;
  isAllowSocialLogin?: boolean;
  isShowLogo?: boolean;
}

const Darass = ({
  projectKey,
  darkMode = false,
  primaryColor = "#0BC586",
  isShowSortOption = true,
  isAllowSocialLogin = true,
  isShowLogo = true
}: Props) => {
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
  }, [
    isSSR,
    projectKey,
    darkMode,
    primaryColor,
    isShowSortOption,
    isAllowSocialLogin,
    isShowLogo
  ]);

  if (isSSR) {
    return null;
  }

  return (
    <div
      id="darass"
      data-project-key={`${projectKey}`}
      data-dark-mode={`${darkMode}`}
      data-primary-color={`${primaryColor}`}
      data-show-sort-option={`${isShowSortOption}`}
      data-allow-social-login={`${isAllowSocialLogin}`}
      data-show-logo={`${isShowLogo}`}
    />
  );
};

export default Darass;
