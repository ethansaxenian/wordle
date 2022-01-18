import ReactGa from "react-ga";

const analytics = () => {
	ReactGa.initialize(process.env.REACT_APP_GA_ID);
	ReactGa.pageview(window.location.pathname + window.location.search);
};

export default analytics;
