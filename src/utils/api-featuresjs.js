export class ApiFeatures {
  constructor(prismaQuery, queryString) {
    this.prismaQuery = prismaQuery;
    this.queryString = queryString;
  }

  async paginate(countDocuments = 20) {
    this.prismaQuery = await this.prismaQuery;

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 15;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    console.log(page, limit, skip, endIndex);

    // Pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);

    // // next page
    // if (endIndex < countDocuments) {
    //   pagination.next = page + 1;
    // }
    // if (skip > 0) {
    //   pagination.prev = page - 1;
    // }
    this.prismaQuery = this.prismaQuery.splice(skip, limit);

    return this;
  }
}
