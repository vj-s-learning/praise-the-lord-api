import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

const getHolyBible = (...args) =>
  import('@jjkavalam/holy-bible-ml').then(({ default: getHolyBible }) =>
    getHolyBible(...args),
  );
@Injectable()
export class BibleService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    getHolyBible().then((books) => {
      this.cacheManager.set('books', books);
    });
  }

  async getBooks() {
    const booksCache = await this.cacheManager.get('books');
    if (booksCache) {
      return booksCache;
    } else {
      const bible = await getHolyBible();
      await this.cacheManager.set('books', bible);
      return bible;
    }
  }

  async getTestaments() {
    const testaments = [
      {
        id: 1,
        name: 'പഴയ നിയമം',
      },
      {
        id: 2,
        name: 'പുതിയ നിയമം',
      },
    ];

    return testaments;
  }

  async getBooksByTestament(testamentId) {
    console.log('testamentId', testamentId);
    const books = await this.getBooks();
    if (testamentId) {
      return books.filter((book) => book.testamentId === testamentId);
    } else {
      return books;
    }
  }
  async getBook(bookId: number) {
    const books = await this.getBooks();
    return books.find((book) => book.bookId === bookId);
  }

  async search(book: number, chapter: number, verse: number) {
    const filteredBook = await this.getBook(book);
    console.log(filteredBook);
    const filteredChapter = filteredBook.chapters.find(
      (c) => c.chapterId === chapter,
    );
    const filteredVerse = filteredChapter.verses[verse - 1];
    return filteredVerse;
  }
}
