const Loading = () => {
  const dotCount = 3; // Define the number of dots
  return (
    <div className="flex justify-center items-center h-24">
      <style>
        {`
          @keyframes loading {
            from {
              width: 2px;
              height: 2px;
              border-radius: 5px;
              opacity: 0.5;
            }
            to {
              width: 20px;
              height: 20px;
              border-radius: 20px;
              opacity: 1;
            }
          }
          .dot {
            animation-name: loading;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            background-color: black; 
          }
        `}
      </style>
      <div className="flex items-center justify-center">
        {Array.from({ length: dotCount }, (_, index) => (
          <div
            key={index}
            className="dot m-1"
            style={{ animationDelay: `${(index + 1) * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
