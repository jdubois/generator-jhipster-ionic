<%#
    Copyright 2013-2018 the original author or authors from the JHipster project.

    This file is part of the JHipster project, see http://www.jhipster.tech/
    for more information.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
-%>
package <%=packageName%>.web.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Resource to return information about OAuth properties
 */
@RestController
@RequestMapping("/api")
public class AuthInfoResource {

    @Value("${security.oauth2.client.access-token-uri:}")
    private String accessTokenUri;
    @Value("${security.oauth2.client.client-id:}")
    private String clientId;
    @Value("${security.oauth2.client.scope:}")
    private String scope;

    @GetMapping("/auth-info")
    public AuthInfoVM getAuthInfo() {
        String issuer = accessTokenUri;
        // if Keycloak, uri has protocol/openid-connect/token, chop it off
        if (accessTokenUri.contains("/protocol")) {
            issuer = accessTokenUri.substring(0, accessTokenUri.indexOf("/protocol"));
        } else if (accessTokenUri.contains("/v1/token")) {
            // If Okta, uri has /v1/token
            issuer = accessTokenUri.substring(0, accessTokenUri.indexOf("/v1/token"));
        }

        return new AuthInfoVM(issuer, clientId, scope);
    }

    class AuthInfoVM {
        private String issuer;
        private String clientId;
        private String scope;

        AuthInfoVM(String issuer, String clientId, String scope) {
            this.issuer = issuer;
            this.clientId = clientId;
            this.scope = scope;
        }

        public String getIssuer() {
            return this.issuer;
        }

        public void setIssuer(String issuer) {
            this.issuer = issuer;
        }

        public String getClientId() {
            return clientId;
        }

        public void setClientId(String clientId) {
            this.clientId = clientId;
        }

        public String getScope() {
            return scope;
        }

        public void setScope(String scope) {
            this.scope = scope;
        }
    }
}
