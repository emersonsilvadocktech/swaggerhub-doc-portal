import React from 'react';
import APILink from './APILink.js'

const Sidebar = props => {
    let organizationConfig = props.organizationConfig
    let apiLinks = []

    for (let i = 0; i < organizationConfig.apis.length; i++) {
        apiLinks.push(
            <APILink 
                key={i}
                apiLinkData={organizationConfig.apis[i]}
                updateDefinitionLink={props.updateDefinitionLink}
            />
        )
    }
    // if (!props.definitionList) {
    //     props.getOrganizationData(organizationConfig.orgName)
    // } else {
    //     for (let i = 0; i < props.definitionList.length; i++) {
    //         if (props.definitionList[i].default === true) {
    //             apiLinks.push(
    //                 <APILink 
    //                     key={i}
    //                     apiLinkData={props.definitionList[i]}
    //                     updateDefinitionLink={props.updateDefinitionLink}
    //                 />
    //             )
    //         }
    //     }
    // }

  return (
    <div className="side-bar">
        <div className="side-bar-header">
            <h1>{organizationConfig.displayName}</h1>
            <h3>{organizationConfig.displayTag}</h3>
        </div>
        <div className="side-bar-body">
            <h3>API DOCS</h3>
            {apiLinks}
        </div>
    </div>
  )
}

export default Sidebar;