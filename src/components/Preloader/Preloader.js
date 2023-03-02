import './Preloader.css'

const Preloader = (props) => {
  console.log(props);
    return (
        <div className={`preloader${props.handle?' preloader__visible':''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader;
