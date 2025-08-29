import React from 'react';
import ExampleComponent from './components/ExampleComponent';

const App: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Storybook App</h1>
            <ExampleComponent title="Welcome to Storybook" description="This is an example component." />
        </div>
    );
};

export default App;