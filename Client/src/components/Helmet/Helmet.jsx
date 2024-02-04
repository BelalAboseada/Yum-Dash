const Helmet = (props) => {
  document.title = "YumDash -" + props.title;
  return <div className="w-100">{props.children}</div>;
};

export default Helmet;
