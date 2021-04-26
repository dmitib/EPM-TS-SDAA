import { Pages } from "./pages";
import { Item } from "./item";

export class Magazine extends Item {
  public pages: Pages;
  public title: string;

  constructor(title: string, pages: Pages) {
    super();
    this.title = title;
    this.pages = pages;
  }

  public toString(): string {
    return `Magazine: ${this.title} with number of pages: ${this.pages.pages.length}, ${this.pages.pages[this.currentPage]}`;
  }

  public set setTitle(title: string) {
    this.title = title;
  }

  public get getTitle(): string {
    return this.title;
  }
}