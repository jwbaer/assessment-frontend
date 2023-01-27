import './styles.scss';

import { ButtonOptions, Component } from '../types';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import React, { useContext } from 'react';

import { GoLocation } from 'react-icons/go';
import PageContext from '../contexts/page-context';

const ButtonComponent = ({ component }: { component: Component }) => {
    const { pageSpec, setPageSpec } = useContext(PageContext);
    const options = component?.options as ButtonOptions;

    const handleClick = () => {
        const variable = pageSpec?.variableIndex?.get(options.variable);
        if (variable) {
            variable.value = options.value;
            setPageSpec({...pageSpec});
        }
    };

    return (
        options?
            <div
                data-testid={`button-component-${component.id}`}
                className="component button"
                onClick={handleClick}
            >
                <div className="label">
                    {options.text}
                </div>
                <div className="icon">
                    { options.icon === 'location' &&
                        <GoLocation />
                    }
                    { options.icon === 'hide' &&
                        <IoEyeOffOutline />
                    }
                    { options.icon === 'show' &&
                        <IoEyeOutline />
                    }
                </div>
            </div>
            :
            <></>
    );
};

export default ButtonComponent;