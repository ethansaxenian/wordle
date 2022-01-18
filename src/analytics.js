import ReactGA from "react-ga4";

const analytics = () => {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.send(process.env.REACT_APP_WEBSITE_URL);
};

export default analytics;
