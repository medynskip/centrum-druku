const ContentBox = ({ title, children }) => {
  return (
    <div className="content-box">
      <h4>{title}</h4>
      {children}
    </div>
  );
};

export default ContentBox;
