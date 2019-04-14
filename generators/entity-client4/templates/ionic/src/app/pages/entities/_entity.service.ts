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
<%_
    let hasDate = false;
    if (fieldsContainInstant || fieldsContainZonedDateTime || fieldsContainLocalDate) {
        hasDate = true;
    }
_%>
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
<%_ if (hasDate) { _%>
// todo: handle dates
<%_ } _%>

import { <%= entityAngularName %> } from './<%= entityFileName %>.model';

@Injectable({ providedIn: 'root'})
export class <%= entityAngularName %>Service {
    private resourceUrl = ApiService.API_URL<% if (locals.microserviceName) { %>.replace('api', '<%= microserviceName.toLowerCase() %>/api')<% } %> + '/<%= entityApiUrl %>';

    constructor(protected http: HttpClient) { }

    <%_ if (entityAngularName.length <= 30) { _%>

    create(<%= entityInstance %>: <%= entityAngularName %>): Observable<HttpResponse<<%= entityAngularName %>>> {
    <%_ } else { _%>

    create(<%= entityInstance %>: <%= entityAngularName %>):
        Observable<HttpResponse<<%= entityAngularName %>>> {
    <%_ } _%>
        return this.http.post<<%= entityAngularName %>>(this.resourceUrl, <%= entityInstance %>, { observe: 'response'});
    }
    <%_ if (entityAngularName.length <= 30) { _%>

    update(<%= entityInstance %>: <%= entityAngularName %>): Observable<HttpResponse<<%= entityAngularName %>>> {
    <%_ } else { _%>

    update(<%= entityInstance %>: <%= entityAngularName %>):
        Observable<HttpResponse<<%= entityAngularName %>>> {
    <%_ } _%>
        return this.http.put(this.resourceUrl, <%= entityInstance %>, { observe: 'response'});
    }

    find(id: <% if (pkType === 'String') { %>string<% } else { %>number<% } %>): Observable<HttpResponse<<%= entityAngularName %>>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<<%= entityAngularName %>[]>> {
        const options = createRequestOption(req);
        return this.http.get<<%= entityAngularName %>[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: <% if (pkType === 'String') { %>string<% } else { %>number<% } %>): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
