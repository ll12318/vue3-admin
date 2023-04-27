import { debounce } from "lodash";

class WirelessScroll {
  constructor({ debounceTime = 100 }) {
    this.el = window;
    this.dom = document.documentElement;
    this.callback = () => {};
    this.handleScroll = this.handleScroll.bind(this); // Bind this here
    this.debouncedHandleScroll = debounce(this.handleScroll, debounceTime); // Store the debounced function
  }

  init(el, callback) {
    if (typeof el === "function") {
      this.callback = el;
    } else if (!el) {
      new Error("callback is required");
    } else {
      this.dom = el;
      this.el = el;
      this.callback = callback;
    }

    this.initEvent();
  }

  initEvent() {
    this.el.addEventListener("scroll", this.debouncedHandleScroll); // Use the debounced function
  }

  handleScroll() {
    const scrollTop = this.dom.scrollTop;
    const scrollHeight = this.dom.scrollHeight;
    const clientHeight = this.dom.clientHeight;
    if (scrollHeight - (scrollTop + clientHeight) < 200) {
      if (scrollHeight == clientHeight) return;
      this.callback();
    }
  }

  destroy() {
    this.el.removeEventListener("scroll", this.debouncedHandleScroll); // Remove the debounced function
  }
}

export default WirelessScroll;
