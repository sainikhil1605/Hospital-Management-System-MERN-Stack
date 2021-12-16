import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <h1>Something went wrong</h1>
        </Container>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
