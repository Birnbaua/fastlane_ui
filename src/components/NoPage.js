const NoPage = () => {
    return <div>
        <h1>404</h1>
        <br/>
        <span>Following resource not found: {new URLSearchParams(window.location.search).get("url")}</span>
      </div>;
  };
  
  export default NoPage;