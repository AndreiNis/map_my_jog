import React from 'react';

const Background = () => {
    return(
        <div className="outer-div">
            <div className="background">
            <img src="https://mapmy.uastatic.com/7ca8061f7a49ffa4c0a53685482b14aa.png" alt="women jogging"/>
            <img src="https://mapmy.uastatic.com/9b2217b59621acf4f24bfd26d9c2c3ca.png" alt="cloudy sky over city"/>            
            </div>
            <span>
                <img className = "sneaker-add" src="https://mapmy.uastatic.com/646485d1f91b975423404dadbe0ebf5e.png" alt="sneaker advertisement" />
            </span>
            <span className="jackie">
                <img src="https://mapmy.uastatic.com/b721f1f31d6c01f7e2e6e3e3dcb9bc4d.png" alt="map showing location"/>
            </span>
            {/* <span>
                <Link exact path="/signup" className="splash-signup">Sign Up</Link>
            </span> */}
        </div>
    )
}

export default Background;