import { Observable } from 'rxjs/internal/Observable'
import { from } from 'rxjs/internal/observable/from'
import { map } from 'rxjs/internal/operators/map'

export function observableFactory<T = any>(promise: Promise<T>): Observable<T> {
  return from(promise).pipe(map(({ data }) => data))
}