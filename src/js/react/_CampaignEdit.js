import React from 'react';
import PropTypes from 'prop-types';
import Basic from './section/Basic';
import FormCampaign from './form/FormCampaign';

const _CampaignEdit = ({ match }) => {
    const page = match.params.id ? 'Edit' : 'Add';
    return (
        <main id="main" role="main">
            <div className="container-fluid">
                <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                    <header className="node-xs-50">
                        <h1>{`Campaign - ${page}`}</h1>
                    </header>

                    <section className="node-xs-50">
                        <FormCampaign />
                    </section>
                </Basic>
            </div>
        </main>
    );
};

_CampaignEdit.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default _CampaignEdit;
