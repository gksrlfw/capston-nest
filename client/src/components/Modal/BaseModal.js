export class BaseModal {
  emit;
  constructor(emit) {
    this.emit = emit;
  }

  onClickClose() {
    window.onkeydown = null;
    this.emit("onClickClose", false);
  }
  onPressEsc() {
    window.onkeydown = (e) => {
      if (e.key === "Escape") this.onClickClose();
    };
  }
}
