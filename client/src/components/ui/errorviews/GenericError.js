import React from 'react';

const GenericError = (props) => {
    const iconWrapper = {
        margin: 'auto',
        padding: '15%',
        textAlign: 'center',
        
    }

    return(
        <div style={iconWrapper}>
            <h4>Something went wrong! Please try again later</h4>

            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="150" height="150"
            viewBox="0 0 172 172"
            style={{fill:"#000000"}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#95a5a6"><path d="M26.56706,16.43294l-10.13411,10.13411l24.00553,24.00553c-22.79492,3.01898 -40.43848,22.57494 -40.43848,46.17741c0,25.68533 20.898,46.58333 46.58333,46.58333h86c0.19861,0 0.39001,-0.02497 0.58789,-0.02799l12.26172,12.26172l10.13411,-10.13411zM86,28.66667c-7.71133,0 -15.16243,1.86154 -21.89193,5.15104l10.97395,10.98796c3.49017,-1.13233 7.15547,-1.80566 10.91797,-1.80566c17.52967,0 32.37777,12.55611 35.28743,29.85645l0.99382,5.97689h10.30208c13.83167,0 25.08333,11.25167 25.08333,25.08333c0,6.50017 -2.5501,12.37403 -6.62077,16.83886l10.16211,10.17611c6.665,-7.06633 10.79199,-16.55881 10.79199,-27.01497c0,-21.242 -16.8981,-38.62184 -37.96094,-39.38867c-6.22067,-21.10583 -25.5429,-35.86133 -48.03906,-35.86133zM46.58333,64.5h7.78255l64.5,64.5h-72.28256c-17.7805,0 -32.25,-14.4695 -32.25,-32.25c0,-17.7805 14.4695,-32.25 32.25,-32.25z"></path></g></g></svg>
        </div>
    )
}

export default GenericError;