
import { useState,useEffect,useCallback, useMemo } from "react";
import { GroupValue, } from "@src/types/link.ts";

const useRoute = () => {
	const [currentPage, setCurrentPage] = useState<GroupValue>("js-trick");

	const watchRoute = useCallback(() => {
		const hash = window.location.hash.toLowerCase();
		const resFilterUrl = hash.replace("#", "") as GroupValue | "";
		setCurrentPage(resFilterUrl === "" ? "js-trick" : resFilterUrl);
	}, []);

	const isViewPage = useMemo(() => {
		return currentPage === "code" || currentPage === "info";
	},[currentPage])

	useEffect(() => {
		window.addEventListener("hashchange", watchRoute);
		return () => {
		window.removeEventListener("hashchange", watchRoute);
		};
	}, [watchRoute]);

	return { isViewPage,currentPage ,setCurrentPage};
	

}

export default useRoute;
