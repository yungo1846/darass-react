import React, { useEffect } from "react";
import { init } from "../init";

interface Props {
  projectKey: string;
}

const Darass = ({ projectKey }: Props) => {
  const isSSR = typeof window === "undefined";

  useEffect(() => {
    if (!isSSR) init();
  }, [isSSR]);

  if (isSSR) {
    return null;
  }

  return <div id="darass" data-projectkey={projectKey}></div>;
};

export default Darass;
