import ReactGA from "react-ga";

const analytics = () => {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.send(window.location.pathname + window.location.search);
	console.log(window.location.pathname + window.location.search);
};

export default analytics;
