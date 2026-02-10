import { useCallback, useRef, useState } from "react";
import type { ToastMessage, ToastType } from "./Toast";

type UseToastResult = {
	toasts: ToastMessage[];
	addToast: (text: string, type?: ToastType) => void;
	removeToast: (id: number) => void;
};

export function useToast(): UseToastResult {
	const [toasts, setToasts] = useState<ToastMessage[]>([]);
	const nextIdRef = useRef(1);

	const removeToast = useCallback((id: number) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	const addToast = useCallback((text: string, type: ToastType = "info") => {
		const id = nextIdRef.current++;
		setToasts((prev) => [...prev, { id, text, type }]);
	}, []);

	return { toasts, addToast, removeToast };
}
