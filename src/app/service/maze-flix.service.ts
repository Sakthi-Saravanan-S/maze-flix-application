import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CastListData } from '../model/cast-list-data.model';
import { SearchListData } from '../model/search-list-data.model';
import { ShowListData } from '../model/show-list-data.model';

@Injectable({
  providedIn: 'root',
})
export class MazeFlixService {
  constructor(private _http: HttpClient) {}
  private baseUrl: string = 'http://api.tvmaze.com/';

  getDefaultTvShowsInfo(): Observable<ShowListData[]> {
    return this._http.get<ShowListData[]>(`${this.baseUrl}shows`);
  }
  getRequestedShowInfo(showName: string): Observable<SearchListData[]> {
    return this._http.get<SearchListData[]>(
      `${this.baseUrl}search/shows?q=${showName}`
    );
  }
  getCastInfo(showId: number): Observable<CastListData[]> {
    return this._http.get<CastListData[]>(
      `${this.baseUrl}shows/${showId}/cast`
    );
  }
}
