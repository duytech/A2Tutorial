import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

import { OnInit } from '@angular/core';

// The (*) prefix to ngFor indicates that the <li> element and its children constitute a master template.
// The ngFor directive iterates over the heroes array returned by the AppComponent.heroes property and stamps out instances of this template.

// When there is no selectedHero, the ngIf directive removes the hero detail HTML from the DOM.
// There will be no hero detail elements and no bindings to worry about.

// Notice in the template that the class.selected is surrounded in square brackets ([]).
// This is the syntax for a PROPERTY BINDING, a binding in which data flows one way from the data source (the expression hero === selectedHero) to a property of class.
@Component({
  selector: 'my-app',
  template: `
        <h1>{{title}}</h1>
        <h2>My Heroes</h2>
        <ul class="heroes">
            <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
                <span class="badge">{{hero.id}}</span> {{hero.name}}
            </li>
        </ul>
        <my-hero-detail [hero]="selectedHero"></my-hero-detail>
        `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  // We have to teach the injector how to make a HeroService by registering a HeroService provider.
  providers: [HeroService]
})

// implements The ngOnInit Lifecycle Hook.
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  //heroes = HEROES;
  heroes: Hero[];
  selectedHero: Hero;

  // The constructor itself does nothing. It's for Dependency Injection. 
  // The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
  constructor(private heroService: HeroService) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  // Use this instead of call getHeroes() inside constructor.
  // Angular calls this method at the appropriate time.
  ngOnInit(): void {
    this.getHeroes();
  }
}