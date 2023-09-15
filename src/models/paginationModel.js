class Pagination {
  constructor(page, limit, total, lastPage) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.lastPage = lastPage;
  }

  static fromJson(json) {
    console.log(json);
    const meta = json;
    const { page, limit, total, lastPage } = meta.pagination;
    return new Pagination(page, limit, total, lastPage);
  }
}
export default Pagination;
// const Pagination = require('./paginationModel');

/*const json = `{
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "lastPage": 1
    }
  }
}`;

const pagination = Pagination.fromJson(json);
console.log(pagination);
*/