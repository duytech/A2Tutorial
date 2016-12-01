import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

// TypeScript sees the @Injectable() decorator and emits metadata about our service, 
// metadata that Angular may need to inject other dependencies into this service.
@Injectable()
export class HeroService {
    // A Promise is ... well it's a promise to call us back later when the results are ready. 
    // We ask an asynchronous service to do some work and give it a callback function. 
    // It does that work (somewhere) and eventually it calls our function with the results of the work or an error.
    getHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }
}