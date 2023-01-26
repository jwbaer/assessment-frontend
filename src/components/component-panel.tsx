import './styles.scss';

import { Component, ComponentType, ConditionOptions, ImageOptions } from '../types';
import React, { useContext } from 'react';

import ButtonComponent from './button-component';
import ConditionComponent from './condition-component';
import ImageComponent from './image-component';
import ListPanel from './list-panel';
import { PageContext } from './page';
import WeatherComponent from './weather-component';

const ComponentPanel = ({ id }: { id: number }) => {
    const { pageSpec } = useContext(PageContext);
    const compToRender: Component | undefined = pageSpec.componentIndex.get(id);

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