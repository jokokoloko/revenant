import React from 'react';
import Basic from './section/Basic';
import FormLead from './form/FormLead';

const CampaignView = () => (
    <main id="main" role="main">
        <div className="container-fluid">
            <Basic space="space-xs-50 space-lg-80">
                <header className="text-center">
                    <h1>Lead</h1>
                </header>

                <section>
                    <FormLead />
                </section>
            </Basic>
        </div>
    </main>
);

export default CampaignView;
