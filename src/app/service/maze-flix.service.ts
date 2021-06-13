import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MazeFlixService {
  constructor(private _http: HttpClient) {}
  private baseUrl: string = 'http://api.tvmaze.com/';

  getShowsInfoByPage(pageNumber: number): Observable<any> {
    return this._http.get(this.baseUrl + 'shows?page=' + pageNumber);
  }
  getRequestedShowInfo(showName: string): Observable<any> {
    return this._http.get(this.baseUrl + 'search/shows?q=' + showName);
  }
  getCastInfo(showId: string): Observable<any> {
    return this._http.get(this.baseUrl + 'shows/' + showId + 'cast');
  }
  getCrewInfo(showId: string): Observable<any> {
    return this._http.get(this.baseUrl + 'shows/' + showId + 'crew');
  }
}
