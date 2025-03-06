import { Injectable } from '@angular/core';
import { Observable, interval, of, from } from 'rxjs';
import { concat, delay, ignoreElements, map, take, repeat, concatMap } from 'rxjs/operators';
import { TypeParams } from '../interfaces/type-params.interface';

@Injectable({
  providedIn: 'root'
})
export class TypeWriterServiceService {

  constructor() { }

  private type({ word, speed, backwards = false }: TypeParams) {
    return interval(speed).pipe(
      map(x => backwards ? word.substring(0, word.length - x) : word.substring(0, x + 1)),
      take(word.length)
    );
  }

  typeEffect(word: string) {
    return concat(
      this.type({ word, speed: 50 }),
      of('').pipe(delay(1200), ignoreElements()),
      this.type({ word, speed: 30, backwards: true }),
      of('').pipe(delay(300), ignoreElements())
    );
  }

}
