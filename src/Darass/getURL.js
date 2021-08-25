import { END_POINT } from "./constants.js";

export const getReplyModuleURL = (projectKey) => {
  const replyModuleURL = END_POINT + "/index.html?";
  const currentURL = window.location.href;

  const urlParams = new URLSearchParams(replyModuleURL);
  urlParams.set("url", currentURL);
  urlParams.set("projectKey", projectKey);

  return decodeURIComponent(urlParams.toString());
};

export const getModalURL = () => {
  return `${END_POINT}/modal.html`;
};
