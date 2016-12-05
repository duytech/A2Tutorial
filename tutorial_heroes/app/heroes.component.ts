import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

// The (*) prefix to ngFor indicates that the <li> element and its children constitute a master template.
// The ngFor directive iterates over the heroes array returned by the AppComponent.heroes property and stamps out instances of this template.

// When there is no selectedHero, the ngIf directive removes the hero detail HTML from the DOM.
// There will be no hero detail elements and no bindings to worry about.

// Notice in the template that the class.selected is surrounded in square brackets ([]).
// This is the syntax for a PROPERTY BINDING, a binding in which data flows one way from the data source (the expression hero === selectedHero) to a property of class.
@Component({
  selector: 'my-heroes',
  // Set the moduleId property to module.id so that templateUrl and styleUrls are relative to the component.
  moduleId: module.id,
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  // We have to teach the injector how to make a HeroService by registering a HeroService provider.
  providers: [HeroService]
})

// implements The ngOnInit Lifecycle Hook.
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  // The constructor itself does nothing. It's for Dependency Injection. 
  // The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
  constructor(
    private router: Router,
    private heroService: HeroService) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  // Use this instead of call getHeroes() inside constructor.
  // Angular calls this method at the appropriate time.
  ngOnInit(): void {
    this.getHeroes();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }
}