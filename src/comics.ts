import { Pages } from "./pages";
import { Item } from "./item";

export class Comics extends Item {
  public pages: Pages;
  public title: string;
  public author: string;
  public artist: string;

  constructor(title: string, author: string, artist: string, pages: Pages) {
    super();
    this.title = title;
    this.author = author;
    this.artist = artist;
    this.pages = pages;
  }

  public toString(): string {
    return `Comics: ${this.title} by ${this.author}, the artist is ${this.artist}, number of pages: ${this.pages.pages.length}, ${this.pages.pages[this.currentPage]}`;
  }

  public set setAuthor(author: string) {
    this.author = author;
  }

  public set setTitle(title: string) {
    this.title = title;
  }

  public set setArtist(artist: string) {
    this.artist = artist;
  }

  public get getAuthor(): string {
    return this.author;
  }

  public get getTitle(): string {
    return this.title;
  }

  public get getArtist(): string {
    return this.artist;
  }
}