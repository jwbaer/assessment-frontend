import './styles.scss';

import { Component, ComponentType } from '../types';
import React, { useContext } from 'react';

import ButtonComponent from './button-component';
import ConditionComponent from './condition-component';
import ImageComponent from './image-component';
import PageContext from "../contexts/page-context";
import WeatherComponent from './weather-component';

const ComponentPanel = ({ componentId }: { componentId: number }) => {
    const { pageSpec } = useContext(PageContext);
    const compToRender: Component | undefined = pageSpec.componentIndex.get(componentId);

    if (compToRender) {
        switch (compToRender.type) {
            case ComponentType.button:
                return(<ButtonComponent component={compToRender} />);
            case ComponentType.condition:
                return(<ConditionComponent component={compToRender} />);
            case ComponentType.image:
                return(<ImageComponent component={compToRender} />);
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