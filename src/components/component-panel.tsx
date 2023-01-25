import { Component, ComponentType, ConditionOptions, ImageOptions, PageSpec } from '../types';

import ButtonComponent from './button-component'
import ListPanel from './list-panel';
import React from 'react';
import WeatherComponent from './weather-component'

const ComponentPanel = ({ pageSpec, id }: { pageSpec: PageSpec, id: number }) => {
    const compToRender: Component | undefined = pageSpec.componentIndex.get(id);
    console.log(compToRender);

    if (compToRender) {
        switch (compToRender.type) {
            case ComponentType.button:
                return(<ButtonComponent pageSpec={pageSpec} component={compToRender} />);
            case ComponentType.condition:
                const condition = compToRender.options as ConditionOptions;
                if (condition?.variable && pageSpec?.variableIndex?.get(condition.variable)?.value === condition.value && compToRender.children) {
                    return(<ListPanel pageSpec={pageSpec} id={compToRender.children} />);
                } else {
                    return (<></>);
                }
            case ComponentType.image:
                const image = compToRender.options as ImageOptions;
                return(<div style={{display: 'flex', backgroundColor: '#36f', borderRadius: '1em', maxWidth: '300px', height: "130px", flexDirection: 'column', justifyContent: 'center', overflow: 'hidden'}}><img style={{marginTop: '-20%', display:'flex', width: "100%", borderRadius: '2em'}} src={image.src} /></div>);
            case ComponentType.weather:
                return(<WeatherComponent component={compToRender} />);
            default:
                return(<></>);
        }
    } else {
        return(<></>);;
    }
};

export default ComponentPanel;