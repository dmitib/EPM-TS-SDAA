import { Pages } from "./pages";
import { Item } from "./item";

export class Book extends Item {
  public pages: Pages;
  public title: string;
  public author: string;

  constructor(title: string, author: string, pages: Pages) {
    super();
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  public toString(): string {
    return `Book: ${this.title} by ${this.author} with number of pages: ${this.pages.pages.length}, ${this.pages.pages[this.currentPage]}`;
  }

  public set setAuthor(author: string) {
    this.author = author;
  }

  public set setTitle(title: string) {
    this.title = title;
  }

  public get getAuthor(): string {
    return this.author;
  }

  public get getTitle(): string {
    return this.title;
  }
}