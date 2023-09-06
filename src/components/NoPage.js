const NoPage = (props) => {
    return <div>
        <h1>404</h1>
        <br/>
        <span>Following resource not found: {new URLSearchParams(window.location.search).get("url") != null ? new URLSearchParams(window.location.search).get("url") : props.resource}</span>
      </div>;
  };
  
  export default NoPage;