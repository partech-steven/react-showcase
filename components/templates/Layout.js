import Menu from "../organisms/menu/Menu";

function Layout(props) {
  return (
    <div className='page'>
      {props.children}
    </div >
  );
}

export default Layout;