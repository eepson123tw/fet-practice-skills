
import { useEffect,useCallback, useMemo } from "react";
import { GroupValue, } from "@src/types/link.ts";
import { useAppContext } from '@src/store/AppContext';

const useRoute = () => {

	const { urlHash, setUrlHash } = useAppContext();

	const  currentPage = urlHash.replace("#", "") as GroupValue | "";
	const watchRoute = useCallback(() => {
		const hash = window.location.hash.toLowerCase();
		const resFilterUrl = hash.replace("#", "") as GroupValue | "";
		setUrlHash(resFilterUrl === "" ? "js-trick" : resFilterUrl);
	}, [setUrlHash]);

	const isViewPage = useMemo(() => {
		return currentPage === "code" || currentPage === "info";
	},[currentPage])

	useEffect(() => {
		window.addEventListener("hashchange", watchRoute);
		return () => {
		window.removeEventListener("hashchange", watchRoute);
		};
	}, [watchRoute]);

	return { isViewPage,currentPage ,setCurrentPage:setUrlHash};
	

}

export default useRoute;
