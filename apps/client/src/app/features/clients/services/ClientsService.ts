import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'apps/client/src/environments/environment.prod';
import { ClientDto, CreateClientDto, UpdateClientDto } from '@mmschemas/client.schema';
import { GenericResponse } from '@mmtypes/server/APIResponses';
import { GenericFilter } from '@mmtypes/GenericFilter';
import { GenericFilterResponse } from '@mmtypes/GenericFilterResponse';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private http = inject(HttpClient);

  /**
   * Get all clients.
   */
  getClients() {
    return this.http.get<ClientDto[]>(`${environment.apiUrl}/clients`);
  }

  /**
   * Get client by ID.
   * @param id Client ID
   */
  getClientById(id: number) {
    return this.http.get<GenericResponse<ClientDto>>(`${environment.apiUrl}/clients/${id}`);
  }

  /**
   * Search clients with filters.
   * @param queryParams Search filters
   */
  searchClients(queryParams: GenericFilter<ClientDto>) {
    return this.http.get<GenericFilterResponse<ClientDto[]>>(`${environment.apiUrl}/clients/search`, {
      params: new HttpParams({ fromObject: queryParams }),
    });
  }

  /**
   * Create a new client.
   * @param createData Data to create a client
   */
  createClient(createData: CreateClientDto) {
    return this.http.post<GenericResponse<{ client: ClientDto }>>(`${environment.apiUrl}/clients`, createData);
  }

  /**
   * Update a client by ID.
   * @param id Client ID
   * @param updateData Data to update a client
   */
  updateClient(id: number, updateData: UpdateClientDto) {
    return this.http.put<GenericResponse<{ client: ClientDto }>>(`${environment.apiUrl}/clients/${id}`, updateData);
  }

  /**
   * Delete a client by ID.
   * @param id Client ID
   */
  deleteClient(id: number) {
    return this.http.delete<GenericResponse<{ client: ClientDto }>>(`${environment.apiUrl}/clients/${id}`);
  }
}
