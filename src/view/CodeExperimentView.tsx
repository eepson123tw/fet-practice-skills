import { Fragment, useEffect, useRef } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackConsole,
  SandpackPreviewRef,
} from "@codesandbox/sandpack-react";
import code from "@utils/memoize?raw";
import asyncReplaceAll from "@utils/asyncReplaceAll?raw";

const files = {
  "/index.ts": `import "./argsType.ts";`, // Initial import
  "/argsType.ts": code,
  "/asyncReplaceAll.ts": asyncReplaceAll,
};

const Editor = () => {
  const { sandpack } = useSandpack();
  const previewRef = useRef<SandpackPreviewRef>(null);
  const { activeFile, files ,updateFile} = sandpack;
    useEffect(() => {
      const newIndexContent = `import "${activeFile}";`;
      // Check if the content is different before updating
      if (files["/index.ts"]?.code !== newIndexContent) {
        updateFile("/index.ts", newIndexContent);
      }
    }, [activeFile,files,updateFile]);

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
          ref={previewRef}
          style={{ height: "600px" }}
          showOpenInCodeSandbox={true}
          showRefreshButton={true}
        >
          <SandpackConsole style={{ height: "600px" }} showHeader />
        </SandpackPreview>
      </SandpackLayout>
    </Fragment>
  );
};

const CodeExperimentPage = () => {
  return (
    <SandpackProvider
      files={files}
      options={{
        activeFile: "/argsType.ts",
        visibleFiles: Object.keys(files),
      }}
      customSetup={{
        entry: "/index.ts", 
      }}
    >
      <SandpackLayout className="!block !rounded-none sm:!rounded-lg !-mx-4 sm:!mx-0">
        <Editor />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default CodeExperimentPage;
