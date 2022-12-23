import React, { Component } from 'react';
import SwaggerUI from 'swagger-ui-react';
import Config from './organization_config.json';
import Sidebar from './Sidebar.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        organizationConfig: null,
        definitionList: [],
        definitionLink: {},
        baseUrl: "localhost:3000",
        lastDefinitionLink: null,
      }
      this.getOrganizationData = this.getOrganizationData.bind(this)
      this.updateDefinitionLink = this.updateDefinitionLink.bind(this)
      this.updateBaseUrl = this.updateBaseUrl.bind(this)
      this.updateNewBaseUrl = this.updateNewBaseUrl.bind(this)
    }

  componentWillMount() {
    this.setState({
      organizationConfig:  Config.orgData,
    })

    this.updateDefinitionLink(Config.orgData.apis.filter(a => a.default)[0].url);
  }

  getOrganizationData(organization) {
    this.setState({
      definitionList: organization.apis,
    });
  }

  updateDefinitionLink(newLink) {
    return fetch(newLink, {
        method: 'get'
    }).then(async response => {
      if (response.ok) {
        let response_json = await response.json()
        response_json.host = this.state.baseUrl
        this.setState({
          definitionLink: response_json,
          lastDefinitionLink: newLink
        });
        return;
      } 
      throw new Error('There was an issue requesting the API')
    })
  }

  updateBaseUrl(event) {
    this.setState({
      baseUrl: event.target.value
    })
  }

  updateNewBaseUrl() {
    this.updateDefinitionLink(this.state.lastDefinitionLink);
  }

  render() {
    return (
      <div className="App">
        <Sidebar 
          organizationConfig={this.state.organizationConfig}
          definitionList={this.state.definitionList}
          updateDefinitionLink={this.updateDefinitionLink}
          getOrganizationData={this.getOrganizationData}
        />
        
        <div id="api-data">
          <div>
            <input type="text" value={this.state.baseUrl} style={{ width: 300 }} onChange={this.updateBaseUrl} />
            <button onClick={this.updateNewBaseUrl}>Atualizar</button>
          </div>

          <SwaggerUI 
            spec={this.state.definitionLink}
            docExpansion="list"
          />
        </div>
      </div>
    );
  }
}

export default App;
