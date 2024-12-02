// https://github.com/codesandbox/sandpack/discussions/314

import { Fragment, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import code from '@utils/memoize?raw';

const files = {
  "/argsType.ts": code
};

const Editor = () => {
  const { sandpack } = useSandpack();
  useEffect(() => {
    // *************************************** //
    //      UPDATED CODE FROM STATE!!         //
    // *************************************** //
    console.log(sandpack.files);
  }, [sandpack.files]);

  return (
    <Fragment>
      <SandpackLayout>
        <SandpackCodeEditor
          style={{ height: "600px" }}
          showLineNumbers={true}
          showRunButton={true}
          showTabs={true}
        />
        <SandpackPreview
          style={{ height: "600px" }}
          showOpenInCodeSandbox={false}
          showRefreshButton={true}
          showRestartButton={true}
        >
          <SandpackConsole style={{ height: "300px" }} />
        </SandpackPreview>
      </SandpackLayout>
    </Fragment>
  );
};

const CodeExperimentPage = () => {
  return (
    <SandpackProvider
      lang="vanilla-ts"
      files={files}
      options={{
        activeFile: "/argsType.ts",
        visibleFiles: ["/argsType.ts"],
      }}
      customSetup={{
        entry: "/argsType.ts",
      }}
    >
      <SandpackLayout className="!block !rounded-none sm:!rounded-lg !-mx-4 sm:!mx-0">
        <Editor />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default CodeExperimentPage;
