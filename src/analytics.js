import ReactGA from "react-ga";

const analytics = () => {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.send(process.env.REACT_APP_WEBSITE_URL);
	console.log(process.env.REACT_APP_GA_ID, process.env.REACT_APP_WEBSITE_URL);
};

export default analytics;
