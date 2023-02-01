import React from 'react'
import { Helmet } from 'react-helmet'
const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - TUP-T Online Library`}</title>
        </Helmet>
    )
}
export default MetaData