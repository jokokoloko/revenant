import React from 'react';
import Basic from './section/Basic';

const _Home = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                <header>
                    <h1>Dashboard</h1>
                </header>
            </Basic>
        </div>
    </main>
);

export default _Home;
