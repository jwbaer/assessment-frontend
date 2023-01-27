import Page from './components/page';
import React from 'react';
import { useParams } from 'react-router';

const App = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page id={id} />
    );
};

export default App;
