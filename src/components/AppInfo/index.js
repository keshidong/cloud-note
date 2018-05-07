import React from 'react';


const AppInfo = () => {
    return (
        <div style={{
            bottom: '20px',
            position: "fixed",
            width: "80%",
            margin: "0 auto",
            left: "50%",
            transform: "translateX(-50%)"
        }}>
            You can keep your information on the <a href="https://nebulas.io/">Nebulas</a> and never lose it!
        </div>
    );
};

export default AppInfo;
