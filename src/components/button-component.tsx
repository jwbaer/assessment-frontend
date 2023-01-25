import { ButtonOptions, Component, PageSpec } from '../types';

import React from 'react';

const ButtonComponent = ({ pageSpec, component }: { pageSpec: PageSpec, component: Component }) => {
    const options = component?.options as ButtonOptions;
    const handleClick = () => {
        const variable = pageSpec?.variableIndex?.get(options.variable);
        if (variable) {
            console.log('button pressed');
            console.log(options.value);
            variable.value = options.value;
        }
    };

    return (
        options?
            <div 
                style={{display: 'flex', backgroundColor: '#36f', borderRadius: '1em', maxWidth: '300px', height: "130px", flexDirection: 'column', justifyContent: 'center', overflow: 'hidden'}}
                onClick={handleClick}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', justifySelf: 'left'}}>
                        {options.text}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', justifySelf: 'right', flexDirection:'row'}}>
                    </div>
                </div>
            </div>
            :
            <></>
    );
};

export default ButtonComponent;