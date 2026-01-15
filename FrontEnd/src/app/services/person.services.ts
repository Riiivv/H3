import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PersonDTORequest, PersonDTOResponse } from "../interfaces/person.dto";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PersonService {
    private readonly baseUrl = `${environment.apiBaseUrl}/api/People`;

    constructor(private http: HttpClient) { }

    getAllPersons(): Observable<PersonDTOResponse[]> {
        return this.http.get<PersonDTOResponse[]>(this.baseUrl);
    }
    getPersonById(personId: number): Observable<PersonDTOResponse> {
        return this.http.get<PersonDTOResponse>(`${this.baseUrl}/${personId}`);
    }
    createPerson(person: PersonDTORequest): Observable<PersonDTOResponse> {
        return this.http.post<PersonDTOResponse>(this.baseUrl, person);
    }
    updatePerson(personId: number, person: PersonDTORequest): Observable<PersonDTOResponse> {
        return this.http.put<PersonDTOResponse>(`${this.baseUrl}/${personId}`, person);
    }
    deletePerson(personId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${personId}`);
    }
}