function getOffset(currentPage = 1, itemsPerPage) {
  return (currentPage - 1) * itemsPerPage;
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getOffset,
  emptyOrRows,
};
