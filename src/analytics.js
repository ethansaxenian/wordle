import ReactGA from "react-ga";

const analytics = () => {
	ReactGA.initialize(process.env.GA_ID);
	ReactGA.pageview(window.location.pathname + window.location.search);
};

export default analytics;
