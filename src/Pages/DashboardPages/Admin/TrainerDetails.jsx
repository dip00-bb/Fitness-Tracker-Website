import React from 'react';
import { useParams } from 'react-router';

const TrainerDetails = () => {

    const {id}=useParams()

    return (
        <div>
            <p>{id}</p>
        </div>
    );
};

export default TrainerDetails;