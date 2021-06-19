import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  parent: Element;

  constructor(params: any, _parent: Element) {
    super(params);
    this.setTitle("settings");
    this.parent = _parent;
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:button": this.buttonClick,
    };
  }

  buttonClick(): void {
    console.log("hi there");
  }

  template(): string {
    return `
            <div>
                <h1>this is setting</h1>
            </div>
        `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  async render() {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
