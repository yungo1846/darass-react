import React, { useEffect, useRef } from "react";
import { hideElement, postParentClickEventToIframe, resizeElementHeight, showElement } from "./common.js";
import { POST_MESSAGE_TYPE } from "./constants.js";
import { getModalURL, getReplyModuleURL } from "./getURL.js";
import { IFRAME_STYLE } from "./style.js";

const Darass = ({ projectKey }) => {
  const $replyModule = useRef(null);
  const $modal = useRef(null);

  useEffect(() => {
    if (!($replyModule.current && $modal.current)) return;

    $replyModule.current.style = IFRAME_STYLE.REPLY_MODULE;
    $modal.current.style = IFRAME_STYLE.MODAL;

    const onPostParentClickEventToIframe = () => {
      postParentClickEventToIframe($replyModule.current);
    };

    const onMessage = ({ data: { type, data } }) => {
      if (!type) return;

      if (type === POST_MESSAGE_TYPE.SCROLL_HEIGHT) {
        resizeElementHeight({ element: $replyModule.current, height: data });
        return;
      }

      if (type === POST_MESSAGE_TYPE.OPEN_LIKING_USERS_MODAL) {
        $modal.current.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.OPEN_LIKING_USERS_MODAL, data }, "*");
        showElement($modal.current);
        return;
      }

      if (type === POST_MESSAGE_TYPE.CLOSE_MODAL) {
        $replyModule.current.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.CLOSE_MODAL }, "*");
        hideElement($modal.current);
        return;
      }

      if (type === POST_MESSAGE_TYPE.ALERT) {
        alert(data);

        return;
      }

      if (type === POST_MESSAGE_TYPE.OPEN_CONFIRM) {
        $modal.current.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.OPEN_CONFIRM, data }, "*");
        showElement($modal.current);
        return;
      }

      if (type === POST_MESSAGE_TYPE.CLOSE_CONFIRM) {
        $replyModule.current.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.CLOSE_CONFIRM }, "*");
        hideElement($modal.current);
        return;
      }

      if (type === POST_MESSAGE_TYPE.CONFIRM_OK) {
        $replyModule.current.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.CONFIRM_OK, data }, "*");
        hideElement($modal.current);
        return;
      }
    };

    window.addEventListener("click", onPostParentClickEventToIframe);
    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("click", onPostParentClickEventToIframe);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <div id="darass">
      <iframe title="darass-reply-module" src={getReplyModuleURL(projectKey)} ref={$replyModule} scrolling="no" />
      <iframe title="darass-modal" src={getModalURL()} ref={$modal} />
    </div>
  );
};

export default Darass;
