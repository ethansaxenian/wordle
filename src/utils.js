import { toast } from "react-toastify";

export const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const sample = (collection) => collection[random(0, collection.length)];

export const range = (start, end, step = 1) => {
	const list = [];

	for (let i = start; i < end; i += step) {
		list.push(i);
	}
	return list;
};

export const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export const addLetter = (arr, i) => {
	return [...arr, i];
}

export const deleteLetter = (arr) => {
	return arr.slice(0, -1);
}

export const showToast = (msg, error) => {
	const fn = error ? toast.error : toast;
	fn(msg, {
		position: "top-center",
		autoClose: 4000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
}
