import client, { type ClientError } from '@/services/client.service'
import { observableFactory } from '@/helpers/promise-to-observable.converter'
import { map } from 'rxjs/internal/operators/map'
import { catchError } from 'rxjs/internal/operators/catchError'
import type { InitialConfiguration } from '@/types/configuration.type'
import { throwError } from 'rxjs/internal/observable/throwError'

export default {
  getConfigurations() {
    return observableFactory(client.get("/configurations"))
      .pipe(
        map((data: any) => data),
        catchError((err) => this.handleError(err))
      )
      // TODO: pagination
  },

  addConfiguration(configuration: InitialConfiguration) {
    return observableFactory(client.put("/configurations", configuration))
      .pipe(
        map((data: any) => data),
        catchError((err) => this.handleError(err))
      )
  },

  deleteConfiguration(id: string) {
    return observableFactory(client.delete(`/configurations/${id}`))
      .pipe(
        map((data: any) => data),
        catchError((err) => this.handleError(err))
      )
  },

  handleError(error: ClientError) {
    console.error(`${error.config?.method?.toUpperCase()} call failed`, error)
    return throwError(() => new Error(`${error.name}: ${error.message}`))
  }
}