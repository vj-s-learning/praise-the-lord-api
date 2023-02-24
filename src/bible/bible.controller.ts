import { Controller, Get, Param, Query } from '@nestjs/common';
import { BibleService } from './bible.service';

@Controller('api/v1/bible')
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @Get('/')
  async getBooks() {
    const bible = await this.bibleService.getBooks();
    console.log(bible);
    return bible;
  }

  @Get('/testaments')
  async getTestaments() {
    const testaments = await this.bibleService.getTestaments();
    console.log(testaments);
    return testaments;
  }

  @Get('/books')
  async getBooksByTestament(@Query('testament') testament: number) {
    console.log('testament', testament);
    const books = await this.bibleService.getBooksByTestament(testament);
    console.log(books);
    return books;
  }

  @Get('/books/:bookId')
  async getBook(@Param('bookId') bookId: number) {
    const book = await this.bibleService.getBook(bookId);
    console.log(book);
    return book;
  }

  @Get('/search')
  async search(
    @Query('book') book: number,
    @Query('chapter') chapter: number,
    @Query('verse') verse: number,
  ) {
    console.log('book', book);
    console.log('chapter', chapter);
    console.log('verse', verse);
    const verseResult = await this.bibleService.search(book, chapter, verse);
    console.log(verseResult);
    return { query: { book, chapter, verse }, result: verseResult };
  }
}
