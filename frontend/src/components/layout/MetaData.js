import React from 'react'
import { Helmet } from 'react-helmet'
const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`TUP-T LRC - ${title}`}</title>
        </Helmet>
    )
}
export default MetaData