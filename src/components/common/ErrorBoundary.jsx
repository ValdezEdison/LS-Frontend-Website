// ErrorBoundary.js
import React, { Component } from 'react';
import PageNotFound from './PageNotFound';
import { useTranslation } from 'react-i18next';

class ErrorBoundary extends Component {
  constructor(props) {
 
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger rendering of fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
  }

  render() {
    if (this.state.hasError) {
     
      // Render the PageNotFound component when an error occurs
      return <PageNotFound type="Oops!" content ="Something went wrong. Please try again later." message="We apologize for any inconvenience caused and kindly ask for your patience as we strive to provide a seamless experience."/>;

      // return <h1>Error occurred</h1>
      // return <div>Error occurred</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
