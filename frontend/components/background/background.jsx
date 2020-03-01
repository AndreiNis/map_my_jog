import React from 'react';

const Background = () => {
    return(
        <div className="outer-div">
            {/* <span className="bar-1">___________</span> */}
            {/* <span className="bar-2">___________</span> */}
            <div className="background">
                <span className="bkg-line-1">_____</span>
                <span className="bkg-text-1">MAKE EVERY MILE COUNT</span>
                <span className="bkg-line-2">_____</span>
                <p className="bkg-text-2">
                    The best mobile run tracking &nbsp;&nbsp;&nbsp;experience,
                    backed by the &nbsp;world's largest digital 
                    health <br /> &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;and fitness community.
                </p>
                <div className="text2-container">
                    <span className="bkg-line-1-1">_____</span>
                    <span className="bkg-text-1-1">SYNC WITH UNDER<br/>
                    ARMOUR SMART SHOES</span>
                    <span className="bkg-line-2-1">_____</span>
                <p className="bkg-text-2-2">
                    The best mobile run tracking experience,<br />
                    backed by the world's largest digital<br />
                    health and fitness community.
                </p>
                </div>
                <span className="stack-img">
                    <img className="women-img" src="https://mapmy.uastatic.com/7ca8061f7a49ffa4c0a53685482b14aa.png" alt="women jogging"/>
                    <img className="sky-img" src="https://mapmy.uastatic.com/9b2217b59621acf4f24bfd26d9c2c3ca.png" alt="cloudy sky over city"/>            
                    <img className = "sneaker-add" src="https://mapmy.uastatic.com/646485d1f91b975423404dadbe0ebf5e.png" alt="sneaker advertisement" />
                    {/* <img className="cool-map" src="https://mapmy.uastatic.com/b721f1f31d6c01f7e2e6e3e3dcb9bc4d.png" alt="map showing location"/> */}
                </span>
            </div>
        </div>
    )
}

export default Background;