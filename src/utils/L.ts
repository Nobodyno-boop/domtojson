class L {
  private config: any = {
    info: {
      bg: "#a29bfe",
      txt: "white",
    },
    error: {
      bg: "#ff7675",
      txt: "white",
    },
    warn: {
      bg: "#fdcb6e",
      txt: "black",
    },
    debug: {
      bg: "#00b894",
      txt: "black",
    },
  };

  public info(...args: any) {
    this.out("info", ...args);
  }

  public debug(...args: any) {
    this.out("debug", ...args);
  }

  public warn(...args: any) {
    this.out("warn", ...args);
  }

  public error(...args: any) {
    this.out("error", ...args);
  }

  public group(label: string, f: { (l: L): void }) {
    console.group(label);
    f(this);
    console.groupEnd();
  }

  private out(type: string, ...args: any) {
    switch (type) {
      case "debug":
        console.log(
          `%c  ${type.toUpperCase()}  %c %o`,
          `background-color: ${this.config[type]["bg"]}; font-weight:bold;`,
          `font-color:${this.config[type]["txt"]};`,
          ...args
        );
        break;

      default:
        console.log(
          `%c  ${
            type.length === 4 ? type.toUpperCase() + " " : type.toUpperCase()
          }  %c %s`,
          `background-color: ${this.config[type]["bg"]}; font-weight:bold;`,
          `font-color:${this.config[type]["txt"]};`,
          ...args
        );
        break;
    }
  }
}

export default new L();
