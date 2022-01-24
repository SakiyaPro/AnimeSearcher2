import React from 'react';

export default function EditProfile() {
    return (
        <>
            <React.Fragment>
                <img id="user_icon" className={`${styles.moveable}`} src={user_icon} />
                <Moveable
                    target={user_icon && document.querySelector('#user_icon')}
                    draggable={true}
                    scalable={true}
                    origin={false}
                    throttleDrag={0}
                    keepRatio={true}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onScale={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
                <p>{width}</p>
                <p>{targetImg?.style.transform}</p>
            </React.Fragment>
        </>
    )
}
