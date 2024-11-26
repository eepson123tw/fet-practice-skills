import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer
} from "@codesandbox/sandpack-react";

const CodeExperimentPage = () => {
	return (
	<SandpackProvider template="react-ts" >
		<SandpackLayout className="!block !rounded-none sm:!rounded-lg !-mx-4 sm:!mx-0">
			<SandpackFileExplorer />
			<SandpackCodeEditor closableTabs showTabs />
			<SandpackPreview  />
		</SandpackLayout>
    </SandpackProvider>
		
	);
}


export default CodeExperimentPage;
