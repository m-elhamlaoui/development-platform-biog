const PageTitleComponent = (props: { title: string }) => {
  return (
    <div className="container-fluid title-fluid">
      <div className="line"></div>
      <div className="page-title">{props.title}</div>
      <div className="line"></div>
    </div>
  );
};

export default PageTitleComponent;
