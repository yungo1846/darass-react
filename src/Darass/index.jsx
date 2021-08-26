import React from "react";
import { hideElement, postParentClickEventToIframe, resizeElementHeight, showElement } from "./common.js";
import { POST_MESSAGE_TYPE } from "./constants.js";
import { getModalURL, getReplyModuleURL } from "./getURL.js";
import { IFRAME_STYLE } from "./style.js";

export default class Darass extends React.Component {
  constructor(props) {
    super(props);
    this.projectKey = props.projectKey;
    this.$replyModule = React.createRef(null);
    this.$modal = React.createRef(null);
  }

  componentDidMount() {
    if (!(this.$replyModule.current && this.$modal.current)) return;

    this.$replyModule.current.style = IFRAME_STYLE.REPLY_MODULE;
    this.$modal.current.style = IFRAME_STYLE.MODAL;

    const _onPostParentClickEventToIframe = () => {
      postParentClickEventToIframe(this.$replyModule.current);
    };

    this.onPostParentClickEventToIframe = _onPostParentClickEventToIframe.bind(this);

    const _onMessage = ({ data: { type, data } }) => {
      if (!type) return;

      if (type === POST_MESSAGE_TYPE.SCROLL_HEIGHT) {
        resizeElementHeight({ element: this.$replyModule.current, height: data });
        return;
      }

      if (type === POST_MESSAGE_TYPE.OPEN_LIKING_USERS_MODAL) {
        this.$modal.current.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.OPEN_LIKING_USERS_MODAL, data }, "*");
        showElement(this.$modal.current);
        return;
      }

      if (type === POST_MESSAGE_TYPE.CLOSE_MODAL) {
        this.$replyModule.current.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.CLOSE_MODAL }, "*");
        hideElement(this.$modal.current);
        return;
      }

      if (type === POST_MESSAGE_TYPE.ALERT) {
        alert(data);

        return;
      }

      if (type === POST_MESSAGE_TYPE.OPEN_CONFIRM) {
        this.$modal.current.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.OPEN_CONFIRM, data }, "*");
        showElement(this.$modal.current);
        return;
      }

      if (type === POST_MESSAGE_TYPE.CLOSE_CONFIRM) {
        this.$replyModule.current.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.CLOSE_CONFIRM }, "*");
        hideElement(this.$modal.current);
        return;
      }

      if (type === POST_MESSAGE_TYPE.CONFIRM_OK) {
        this.$replyModule.current.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.CONFIRM_OK, data }, "*");
        hideElement(this.$modal.current);
        return;
      }
    };

    this.onMessage = _onMessage.bind(this);

    window.addEventListener("click", this.onPostParentClickEventToIframe);
    window.addEventListener("message", this.onMessage);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onPostParentClickEventToIframe);
    window.removeEventListener("message", this.onMessage);
  }

  render() {
    return (
      <div id="darass" style={{ width: "100%" }}>
        <iframe
          title="darass-reply-module"
          src={getReplyModuleURL(this.projectKey)}
          ref={this.$replyModule}
          scrolling="no"
        />
        <iframe title="darass-modal" src={getModalURL()} ref={this.$modal} />
      </div>
    );
  }
}
