import ReactGA from "react-ga";

const analytics = () => {
	ReactGA.initialize(process.env.REACT_APP_GA_ID);
	ReactGA.send('https://ethansaxenian.github.io/wordle/');
};

export default analytics;
