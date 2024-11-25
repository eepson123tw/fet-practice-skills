import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch  } from 'react';


// Define the type for context value
interface AppContextType {
	urlHash: string;
	setUrlHash: Dispatch<SetStateAction<string>>;
}

type ContextProviderProps = {
    children?: ReactNode
}

// Create the context with initial value
const AppContext = createContext<AppContextType>({
	urlHash: '',
	setUrlHash: () => {}
});

// Create a provider component
export const AppProvider = ({ children }: ContextProviderProps) => {	
	const [urlHash, setUrlHash] = useState<string>('');
	return (
		<AppContext.Provider value={{ urlHash,setUrlHash}}>
			{children}
		</AppContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = ()=> {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error('useAppStatus must be used within an AppProvider');
	}
	return context;
}



