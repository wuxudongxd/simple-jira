import { worker } from "./mocks/browser";

function DevTool(foo: () => void) {
  if (process.env.NODE_ENV === "development") {
    worker.start({
      onUnhandledRequest: "bypass",
    });
    console.log("mock worker started");
    
  }
  console.log("dev tool");
  console.log(process.env.NODE_ENV);

  foo();
}

export default DevTool;
