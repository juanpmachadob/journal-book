export const LoadingScreen = () => {
  return (
    <div class="loader">
      <div className="loader__balls">
        <div className="loader__ball"></div>
        <div className="loader__ball"></div>
        <div className="loader__ball"></div>
      </div>
      <div class="typewriter">
        <h1>Loading...</h1>
      </div>
    </div>
  );
};
