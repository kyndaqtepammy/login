import React from 'react'
import './modal.css'
import FontAwesome from 'react-fontawesome'

const Modal = (props) => {
    const { closeModal } = props;

    const icon = {
        margin: 'auto',
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        padding: '5%',
        textAlign: 'center',
        border: '.25em solid rgba(165,220,134,.3)'
    }

    const heading = {
        color: '#595959',
        fontSize: '1.875em',
        fontWeight: '600',
        textAlign: 'center',
        textTransform: 'none',
        wordWrap:' break-word',
    }

    const message = {
        color: '#595950',
        fontSize: '0.875em',
    }

    const closeIcon = () => (
        <FontAwesome
        name="error"
        onClick={closeModal}
        style={{
          color: 'pink',
          padding: '10px',
          backgroundColor: 'transparent',
          border: 0,
          fontSize: '4em'
       
        }}
        />
      );
    

    return(
        <div className="overlay">
            <div className="content" style={{textAlign:"center"}}>
                { closeIcon() }
                {/* { props.children } */}
                <div className="icon" style={icon}>
                    <i className={props.classsname}  style={{fontSize: '64px', color: props.color}}></i>
                </div>
                <div className="heading" style={heading}>{props.heading}</div>
                <div className="message" style={message}>{props.message}</div>
                <div style={{padding: '5%'}}> <button class="btn btn-primary btn-lg">OK</button></div>
            </div>
        </div>
    );
};

export default Modal;